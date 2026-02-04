import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    serverTimestamp,
    writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface UserProfile {
    uid: string;
    email: string;
    name: string;
    birthDate: string;
    birthTime?: string;
    birthPlace?: string;
    sun_sign?: string;
    mars_sign?: string;
    rising_sign?: string;
    createdAt: any;
    updatedAt: any;
}

export interface ManualMetadata {
    id: string;
    userId: string;
    unitA: {
        name: string;
        birthDate: string;
        birthTime?: string;
        birthPlace?: string;
    };
    unitB: {
        name: string;
        birthDate: string;
        birthTime?: string;
        birthPlace?: string;
    };
    type?: string; // e.g. "relationship"
    status?: string; // e.g. "completed"
    isPaid: boolean;
    stripeSessionId?: string;
    previewText?: string;
    createdAt: any;
    updatedAt: any;
}

export interface RelationshipManual extends ManualMetadata {
    manualData: any;
}

// User Profile Operations
export async function createUserProfile(uid: string, data: Partial<UserProfile>) {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
        uid,
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data() as UserProfile;
    }
    return null;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

// Relationship Manual Operations
export async function createRelationshipManual(
    userId: string,
    manualData: Omit<RelationshipManual, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
) {
    const batch = writeBatch(db);

    const manualsRef = collection(db, 'manuals');
    const newManualRef = doc(manualsRef); // Auto-generated ID
    const metadataRef = doc(db, 'manual_metadata', newManualRef.id); // Same ID

    // 1. Metadata (Lightweight)
    const metadata: ManualMetadata = {
        id: newManualRef.id,
        userId,
        unitA: manualData.unitA,
        unitB: manualData.unitB,
        isPaid: manualData.isPaid,
        stripeSessionId: manualData.stripeSessionId,
        type: manualData.type || 'relationship',
        status: manualData.status || 'completed',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };

    // 2. Heavy Data (Deep Work)
    const heavyData = {
        manualData: manualData.manualData,
        metadataRef: metadataRef.id,
        userId, // Required for security rules check
        // We keep timestamps here too for audit, though source of truth is metadata
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    };

    batch.set(metadataRef, metadata);
    batch.set(newManualRef, heavyData);

    await batch.commit();

    return newManualRef.id;
}

export async function getUserManuals(userId: string): Promise<ManualMetadata[]> {
    // Optimization: Query the lightweight metadata collection
    const metaRef = collection(db, 'manual_metadata');
    const q = query(metaRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => doc.data() as ManualMetadata);
}

export async function getManualById(manualId: string): Promise<RelationshipManual | null> {
    const manualRef = doc(db, 'manuals', manualId);
    const metaRef = doc(db, 'manual_metadata', manualId);

    // Fetch both in parallel
    const [manualSnap, metaSnap] = await Promise.all([
        getDoc(manualRef),
        getDoc(metaRef)
    ]);

    if (manualSnap.exists() && metaSnap.exists()) {
        const manualData = manualSnap.data();
        const metaData = metaSnap.data() as ManualMetadata;

        // Merge to return full object
        return {
            ...metaData,
            manualData: manualData.manualData
        };
    }
    // Fallback for legacy manuals (pre-split)
    else if (manualSnap.exists()) {
         const data = manualSnap.data();
         // If it looks like a full manual, return it
         if (data.unitA && data.unitB) {
             return data as RelationshipManual;
         }
    }

    return null;
}

export async function updateManualPaymentStatus(
    manualId: string,
    stripeSessionId: string,
    isPaid: boolean
) {
    // Update metadata (source of truth for list views)
    const metaRef = doc(db, 'manual_metadata', manualId);
    await updateDoc(metaRef, {
        isPaid,
        stripeSessionId,
        updatedAt: serverTimestamp(),
    });

    // Note: If we wanted strict consistency, we could also update the 'manuals' doc,
    // but the requirement is that metadata drives the UI state.
}

// Migration helper - move localStorage data to Firestore
export async function migrateLocalStorageToFirestore(uid: string) {
    try {
        // Migrate user profile
        const unitA = localStorage.getItem('defrag_unitA');
        if (unitA) {
            const userData = JSON.parse(unitA);
            await createUserProfile(uid, {
                email: userData.email || '',
                name: userData.name || '',
                birthDate: userData.birthDate || '',
                birthTime: userData.birthTime,
                birthPlace: userData.birthPlace,
            });
        }

        // Migrate manual if exists
        const unitB = localStorage.getItem('defrag_unitB');
        const manualPreview = localStorage.getItem('defrag_manual_preview');
        const paymentVerified = localStorage.getItem('defrag_payment_verified') === 'true';

        if (unitA && unitB) {
            const unitAData = JSON.parse(unitA);
            const unitBData = JSON.parse(unitB);

            await createRelationshipManual(uid, {
                unitA: {
                    name: unitAData.name,
                    birthDate: unitAData.birthDate,
                    birthTime: unitAData.birthTime,
                    birthPlace: unitAData.birthPlace,
                },
                unitB: {
                    name: unitBData.name,
                    birthDate: unitBData.birthDate,
                    birthTime: unitBData.birthTime,
                    birthPlace: unitBData.birthPlace,
                },
                manualData: manualPreview ? JSON.parse(manualPreview) : null,
                isPaid: paymentVerified,
            });
        }

        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
        throw error;
    }
}

/**
 * Migration Script: Backfill manual_metadata from existing manuals
 */
export async function migrateManualsToMetadata() {
    console.log("Starting migration to manual_metadata...");
    const manualsRef = collection(db, 'manuals');
    // Warning: fetches all manuals! In production this should be paginated/scripted externally.
    const snapshot = await getDocs(manualsRef);

    let batch = writeBatch(db);
    let count = 0;
    let batchCount = 0;

    for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const metaRef = doc(db, 'manual_metadata', docSnap.id);

        // Extract metadata fields from the existing heavy doc
        const metadata: any = {
            id: docSnap.id,
            userId: data.userId,
            unitA: data.unitA,
            unitB: data.unitB,
            isPaid: data.isPaid,
            stripeSessionId: data.stripeSessionId,
            type: data.type || 'relationship',
            status: data.status || 'completed',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };

        // Skip if vital data missing
        if (!metadata.userId || !metadata.unitA) {
            console.warn(`Skipping doc ${docSnap.id}: Missing required fields`);
            continue;
        }

        batch.set(metaRef, metadata, { merge: true });
        count++;
        batchCount++;

        if (batchCount >= 400) {
            await batch.commit();
            console.log(`Committed batch of ${batchCount} records`);
            batch = writeBatch(db);
            batchCount = 0;
        }
    }

    if (batchCount > 0) {
        await batch.commit();
    }
    console.log(`Migration complete. Processed ${count} documents.`);
}
