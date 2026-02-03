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

export interface RelationshipManual {
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
    manualData: any;
    isPaid: boolean;
    stripeSessionId?: string;
    createdAt: any;
    updatedAt: any;
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
    const manualsRef = collection(db, 'manuals');
    const newManualRef = doc(manualsRef);

    await setDoc(newManualRef, {
        id: newManualRef.id,
        userId,
        ...manualData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return newManualRef.id;
}

export async function getUserManuals(userId: string): Promise<RelationshipManual[]> {
    const manualsRef = collection(db, 'manuals');
    const q = query(manualsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => doc.data() as RelationshipManual);
}

export async function getManualById(manualId: string): Promise<RelationshipManual | null> {
    const manualRef = doc(db, 'manuals', manualId);
    const manualSnap = await getDoc(manualRef);

    if (manualSnap.exists()) {
        return manualSnap.data() as RelationshipManual;
    }
    return null;
}

export async function updateManualPaymentStatus(
    manualId: string,
    stripeSessionId: string,
    isPaid: boolean
) {
    const manualRef = doc(db, 'manuals', manualId);
    await updateDoc(manualRef, {
        isPaid,
        stripeSessionId,
        updatedAt: serverTimestamp(),
    });
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
