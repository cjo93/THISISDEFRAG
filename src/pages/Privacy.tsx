import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Privacy() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-80 -right-80 h-[800px] w-[800px] rounded-full blur-[200px] opacity-[0.08] bg-orange-500" />
      </div>

      <Header />

      {/* Content */}
      <main className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-orange-500/50" />
            <span className="text-xs tracking-[0.4em] text-orange-400 font-medium">PRIVACY POLICY</span>
            <span className="h-px w-8 bg-orange-500/50" />
          </div>

          <h1 className="text-5xl sm:text-6xl font-light tracking-tight leading-tight mb-6 text-white">
            Privacy Policy
          </h1>

          <p className="text-sm text-white/40 mb-12">Last Updated: January 23, 2026</p>

          <div className="space-y-12 text-white/70 leading-relaxed">

            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">1. Introduction</h2>
              <p className="mb-4">
                DEFRAG ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our relationship analysis service at defrag.app.
              </p>
              <p>
                By using DEFRAG, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">2.1 Personal Information</h3>
              <p className="mb-4">We collect the following personal information that you voluntarily provide:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Email address</strong> - For account creation and manual delivery</li>
                <li><strong>Name</strong> - For personalization of your manual</li>
                <li><strong>Birth data</strong> - Date, time, and place of birth for astrological calculations</li>
                <li><strong>Relationship data</strong> - Birth information for people you analyze</li>
              </ul>

              <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">2.2 Payment Information</h3>
              <p className="mb-4">
                Payment processing is handled by Stripe. We do not store your credit card information. Stripe's privacy policy governs the use of your payment information.
              </p>

              <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">2.3 Usage Data</h3>
              <p className="mb-4">We automatically collect certain information when you use our service:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Device information (type, operating system)</li>
                <li>IP address (anonymized)</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use your information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Delivery</strong> - Generate personalized relationship manuals</li>
                <li><strong>Account Management</strong> - Create and maintain your account</li>
                <li><strong>Communication</strong> - Send you your manual and important updates</li>
                <li><strong>Payment Processing</strong> - Process transactions via Stripe</li>
                <li><strong>Improvement</strong> - Analyze usage to improve our service</li>
                <li><strong>Legal Compliance</strong> - Comply with legal obligations</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Encryption</strong> - All data is encrypted in transit (SSL/TLS) and at rest</li>
                <li><strong>Firebase Security</strong> - Data stored in Google Cloud Firestore with strict access rules</li>
                <li><strong>Authentication</strong> - Secure email-based authentication (magic links)</li>
                <li><strong>Access Controls</strong> - Limited employee access to personal data</li>
                <li><strong>Regular Audits</strong> - Periodic security reviews and updates</li>
              </ul>
              <p className="mt-4 text-white/50 text-sm">
                However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">5. Data Sharing and Disclosure</h2>
              <p className="mb-4">We do NOT sell your personal information. We may share your data only in these circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers</strong> - Third-party services that help us operate (Firebase, Stripe, Resend)</li>
                <li><strong>Legal Requirements</strong> - When required by law or to protect our rights</li>
                <li><strong>Business Transfers</strong> - In the event of a merger or acquisition</li>
                <li><strong>With Your Consent</strong> - When you explicitly authorize sharing</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">6. Your Privacy Rights</h2>
              <p className="mb-4">You have the following rights regarding your personal data:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access</strong> - Request a copy of your personal data</li>
                <li><strong>Correction</strong> - Update or correct inaccurate information</li>
                <li><strong>Deletion</strong> - Request deletion of your account and data</li>
                <li><strong>Portability</strong> - Export your data in a machine-readable format</li>
                <li><strong>Opt-Out</strong> - Unsubscribe from marketing communications</li>
                <li><strong>Restriction</strong> - Limit how we process your data</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at <a href="mailto:privacy@defrag.app" className="text-orange-400 hover:text-orange-300 underline">privacy@defrag.app</a>
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">7. Data Retention</h2>
              <p className="mb-4">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Active Accounts</strong> - Data retained while your account is active</li>
                <li><strong>Deleted Accounts</strong> - Data deleted within 30 days of account deletion</li>
                <li><strong>Legal Requirements</strong> - Some data may be retained longer for legal compliance</li>
                <li><strong>Anonymized Data</strong> - Aggregated, anonymized data may be retained indefinitely</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">8. Cookies and Tracking</h2>
              <p className="mb-4">
                We use minimal cookies and tracking technologies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies</strong> - Required for authentication and core functionality</li>
                <li><strong>Analytics</strong> - Privacy-focused analytics (no personal data collected)</li>
                <li><strong>No Third-Party Ads</strong> - We do not use advertising cookies</li>
              </ul>
              <p className="mt-4">
                You can control cookies through your browser settings, but disabling essential cookies may affect functionality.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">9. Children's Privacy</h2>
              <p>
                DEFRAG is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately at <a href="mailto:privacy@defrag.app" className="text-orange-400 hover:text-orange-300 underline">privacy@defrag.app</a>.
              </p>
            </section>

            {/* International Users */}
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">10. International Data Transfers</h2>
              <p className="mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Data stored in Google Cloud (Firebase) with global infrastructure</li>
                <li>Compliance with GDPR for EU users</li>
                <li>Standard contractual clauses for international transfers</li>
              </ul>
            </section>

            {/* GDPR Compliance */}
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">11. GDPR Compliance (EU Users)</h2>
              <p className="mb-4">
                If you are in the European Economic Area (EEA), you have additional rights under GDPR:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Right to be informed about data processing</li>
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Rights related to automated decision-making</li>
              </ul>
              <p className="mt-4">
                Our legal basis for processing your data is your consent and contractual necessity.
              </p>
            </section>

            {/* CCPA Compliance */}
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">12. CCPA Compliance (California Users)</h2>
              <p className="mb-4">
                If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Right to know what personal information is collected</li>
                <li>Right to know if personal information is sold or disclosed</li>
                <li>Right to opt-out of the sale of personal information (we do not sell data)</li>
                <li>Right to deletion of personal information</li>
                <li>Right to non-discrimination for exercising CCPA rights</li>
              </ul>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">13. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Posting the new Privacy Policy on this page</li>
                <li>Updating the "Last Updated" date</li>
                <li>Sending an email notification for material changes</li>
              </ul>
              <p className="mt-4">
                Your continued use of DEFRAG after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">14. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="mb-2"><strong className="text-white">Email:</strong> <a href="mailto:privacy@defrag.app" className="text-orange-400 hover:text-orange-300">privacy@defrag.app</a></p>
                <p className="mb-2"><strong className="text-white">Support:</strong> <a href="mailto:info@defrag.app" className="text-orange-400 hover:text-orange-300">info@defrag.app</a></p>
                <p><strong className="text-white">Website:</strong> <a href="https://defrag.app" className="text-orange-400 hover:text-orange-300">https://defrag.app</a></p>
              </div>
            </section>

          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              to="/"
              className="inline-flex h-14 px-10 items-center justify-center bg-white text-black text-sm tracking-[0.12em] font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition shadow-lg shadow-white/10"
            >
              BACK TO HOME
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-white/30">© 2026 DEFRAG</span>
          <div className="flex gap-6 text-sm text-white/30">
            <Link to="/about" className="hover:text-white/60 transition">About</Link>
            <Link to="/terms" className="hover:text-white/60 transition">Terms</Link>
            <Link to="/privacy" className="hover:text-white/60 transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
