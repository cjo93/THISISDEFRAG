import React, { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Link } from 'react-router-dom';

const CURRENT_TOS_VERSION = '2026-01';
const CURRENT_PRIVACY_VERSION = '2026-01';
const CURRENT_CLINICAL_VERSION = '2026-01';

export const LegalGatingModal: React.FC = () => {
  const { user, userData, refreshUserData } = useAuth();
  const [agreedTOS, setAgreedTOS] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedClinical, setAgreedClinical] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user || !userData) return null;

  const needsAcceptance =
    userData.tosAcceptedVersion !== CURRENT_TOS_VERSION ||
    userData.privacyAcceptedVersion !== CURRENT_PRIVACY_VERSION ||
    userData.clinicalDisclaimerAcceptedVersion !== CURRENT_CLINICAL_VERSION;

  if (!needsAcceptance) return null;

  const handleAccept = async () => {
    if (!agreedTOS || !agreedPrivacy || !agreedClinical) return;
    setIsSubmitting(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        tosAcceptedVersion: CURRENT_TOS_VERSION,
        privacyAcceptedVersion: CURRENT_PRIVACY_VERSION,
        clinicalDisclaimerAcceptedVersion: CURRENT_CLINICAL_VERSION,
        updatedAt: serverTimestamp()
      });
      await refreshUserData();
    } catch (error) {
      console.error("Error updating legal acceptance:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-xl font-sans">
        <h2 className="text-2xl font-bold mb-4">Platform Access Required</h2>
        <p className="mb-6 text-gray-600">
          Before accessing the developer dashboard, you must acknowledge the following safety and legal protocols.
        </p>

        <div className="space-y-4 mb-8">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedTOS}
              onChange={(e) => setAgreedTOS(e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm">
              I agree to the <Link to="/legal/terms" className="text-blue-600 hover:underline" target="_blank">Terms of Service</Link>.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedPrivacy}
              onChange={(e) => setAgreedPrivacy(e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm">
              I agree to the <Link to="/legal/privacy" className="text-blue-600 hover:underline" target="_blank">Privacy Policy</Link>.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedClinical}
              onChange={(e) => setAgreedClinical(e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm">
              I acknowledge the <Link to="/legal/clinical" className="text-blue-600 hover:underline" target="_blank">Clinical & Safety Disclaimer</Link>. DEFRAG is not a substitute for medical or psychological care.
            </span>
          </label>
        </div>

        <button
          onClick={handleAccept}
          disabled={!agreedTOS || !agreedPrivacy || !agreedClinical || isSubmitting}
          className="w-full bg-black text-white py-3 font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : 'Accept & Continue'}
        </button>
      </div>
    </div>
  );
};
