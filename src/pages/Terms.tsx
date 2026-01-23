import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Terms() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-black">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute -top-80 -left-80 h-[800px] w-[800px] rounded-full blur-[200px] opacity-[0.08] bg-orange-500" />
            </div>

            <Header />

            <main className="relative z-10 px-6 py-20">
                <div className="mx-auto max-w-4xl">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <span className="h-px w-8 bg-orange-500/50" />
                        <span className="text-xs tracking-[0.4em] text-orange-400 font-medium">TERMS OF SERVICE</span>
                        <span className="h-px w-8 bg-orange-500/50" />
                    </div>

                    <h1 className="text-5xl sm:text-6xl font-light tracking-tight leading-tight mb-6 text-white">
                        Terms of Service
                    </h1>

                    <p className="text-sm text-white/40 mb-12">Last Updated: January 23, 2026</p>

                    <div className="space-y-12 text-white/70 leading-relaxed">

                        {/* Agreement to Terms */}
                        <section>
                            <h2 className="text-2xl font-medium text-white mb-4">1. Agreement to Terms</h2>
                            <p className="mb-4">
                                By accessing or using DEFRAG ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
                            </p>
                            <p>
                                DEFRAG is operated by DEFRAG ("we," "us," or "our"). These Terms apply to all users of the Service.
                            </p>
                        </section>

                        {/* Description of Service */}
                        <section>
                            <h2 className="text-2xl font-medium text-white mb-4">2. Description of Service</h2>
                            <p className="mb-4">
                                DEFRAG provides personalized relationship analysis tools based on:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                                <li>Astronomical data from NASA JPL HORIZONS system</li>
                                <li>Astrological frameworks (Western astrology, Human Design)</li>
                                <li>Psychological theories (Bowen Family Systems, Attachment Theory)</li>
                                <li>AI-powered analysis and content generation</li>
                            </ul>
                            <p className="font-medium text-white">
                                DEFRAG is an informational tool, NOT a substitute for professional therapy, medical advice, or clinical diagnosis.
                            </p>
                        </section>

                        {/* User Accounts */}
                        <section>
                            <h2 className="text-2xl font-medium text-white mb-4">3. User Accounts</h2>
                            <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">3.1 Account Creation</h3>
                            <p className="mb-4">
                                To use certain features, you must create an account by providing:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                                <li>Valid email address</li>
                                <li>Accurate birth information (date, time, place)</li>
                                <li>Name for personalization</li>
                            </ul>

                            <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">3.2 Account Security</h3>
                            <p className="mb-4">
                                You are responsible for:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Maintaining the confidentiality of your account</li>
                                <li>All activities that occur under your account</li>
                                <li>Notifying us immediately of any unauthorized use</li>
                            </ul>

                            <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">3.3 Age Requirement</h3>
                            <p>
                                You must be at least 18 years old to use DEFRAG. By using the Service, you represent that you are 18 or older.
                            </p>
                        </section>

                        {/* Purchases and Payments */}
                        <section>
                            <h2 className="text-2xl font-medium text-white mb-4">4. Purchases and Payments</h2>
                            <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">4.1 Pricing</h3>
                            <p className="mb-4">
                                DEFRAG offers both free and paid tiers:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                                <li><strong>Free Tier</strong> - Basic personality snapshot</li>
                                <li><strong>Full Manual ($19)</strong> - Complete relationship analysis</li>
                                <li><strong>Team Manual ($29)</strong> - Multiple relationship analysis</li>
                            </ul>
                            <p className="text-sm text-white/50">
                                Prices are subject to change with notice. Current users will be grandfathered at their original price.
                            </p>

                            <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">4.2 Payment Processing</h3>
                            <p className="mb-4">
                                All payments are processed securely through Stripe. We do not store your credit card information. By making a purchase, you agree to Stripe's Terms of Service.
                            </p>

                            <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">4.3 Digital Products</h3>
                            <p className="mb-4">
                                The "Relationship Manual" is a digital product delivered instantly upon payment. Because it is:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                                <li>Personalized to your specific birth data</li>
                                <li>Generated and delivered immediately</li>
                                <li>Accessible in your account indefinitely</li>
                            </ul>
                            <p className="font-medium text-white">
                                We generally do not offer refunds once the manual has been generated and delivered.
                            </p>

                            <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">4.4 Refund Policy</h3>
                            <p className="mb-4">
                                Refunds may be granted in the following circumstances:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                                <li>Technical error preventing manual delivery</li>
                                <li>Duplicate charge due to system error</li>
                                <li>Service failure to generate manual</li>
                            </ul>
                            <p>
                                Refund requests must be submitted within 7 days of purchase to <a href="mailto:support@defrag.app" className="text-orange-400 hover:text-orange-300 underline">support@defrag.app</a>.
                            </p>
                        </section>

                        {/* Acceptable Use */}
                        <section>
                            <h2 className="text-2xl font-medium text-white mb-4">5. Acceptable Use</h2>
                            <p className="mb-4">You agree NOT to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Use the Service for any illegal purpose</li>
                                <li>Violate any laws in your jurisdiction</li>
                                <li>Infringe on intellectual property rights</li>
                                <li>Transmit viruses or malicious code</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Scrape, copy, or redistribute our content without permission</li>
                                <li>Create fake accounts or impersonate others</li>
                                <li>Use automated systems to access the Service</li>
                                <li>Resell or commercialize the Service without authorization</li>
                            </ul>
                        </section>

                        {/* Intellectual Property */}
                        <section>
                            <h2 className="text-2xl font-medium text-white mb-4">6. Intellectual Property</h2>
                            <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">6.1 Our Content</h3>
                            <p className="mb-4">
                                The Service and its original content, features, and functionality are owned by DEFRAG and are protected by international copyright, trademark, and other intellectual property laws.
                            </p>

                            <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">6.2 Your Content</h3>
                            <p className="mb-4">
                                You retain all rights to the birth data and personal information you provide. By using the Service, you grant us a limited license to use this data solely to generate your manual.
                            </p>

                            <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">6.3 Generated Manuals</h3>
                            <p>
                                You own the personalized manual generated for you. You may share it privately, but you may not:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                                <li>Resell or commercialize the manual</li>
                                <li>Remove DEFRAG branding or attribution</li>
                                <li>Claim the manual as your own original work</li>
                            </ul>
                        </section>

                        {/* Disclaimers */}
                        <section>
                            <h2 className="text-2xl font-medium text-white mb-4">7. Disclaimers and Limitations</h2>
                            <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">7.1 Not Professional Advice</h3>
                            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mb-4">
                                <p className="font-medium text-white mb-2">IMPORTANT DISCLAIMER:</p>
                                <p>
                                    DEFRAG is NOT a substitute for professional therapy, counseling, medical advice, or clinical diagnosis. Our analysis is based on pattern recognition frameworks and should be used as a tool for self-reflection, not as definitive truth about yourself or others.
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">7.2 Accuracy of Information</h3>
                            <p className="mb-4">
                                While we use precise astronomical data from NASA JPL HORIZONS, the interpretation of this data through astrological and psychological frameworks is qualitative and subjective. We make no guarantees about:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>The accuracy of personality assessments</li>
                                <li>The predictive value of any insights</li>
                                <li>The applicability to your specific situation</li>
                            </ul>

                            <h3 className="text-xl font-medium text-white/90 mb-3 mt-6">7.3 "As Is" Service</h3>
                            <p>
                                The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                            </p>
                        </section>

                        {/* Limitation of Liability */}
                        <section>
                            <h2 className="text-2xl font-medium text-white mb-4">8. Limitation of Liability</h2>
                            <p className="mb-4">
                                To the maximum extent permitted by law, DEFRAG shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Your use or inability to use the Service</li>
                                <li>Any unauthorized access to or use of our servers</li>
                                <li>Any interruption or cessation of transmission to or from the Service</li>
                                <li>Any bugs, viruses, or other harmful code</li>
                                <li>Any errors or omissions in any content</li>
                                <li>Any decisions or actions taken based on the Service</li>
                            </ul>
                        </section>

                        {/* Indemnification */}
                        <section>
                            <h2 className="text-2xl font-medium text-white mb-4">9. Indemnification</h2>
                            <p>
                                You agree to indemnify and hold harmless DEFRAG and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                                <li>Your use of the Service</li>
                                <li>Your violation of these Terms</li>
                                <li>Your violation of any rights of another party</li>
                            </ul>
                        </section>

                        {/* Termination */}
                        <section>
                            <h2 className="text-2xl font-medium text-white mb-4">10. Termination</h2>
                            <p className="mb-4">
                                We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
                            </p>
                            <p className="mb-4">
                                Upon termination:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Your right to use the Service will immediately cease</li>
                                <li>We may delete your account and data</li>
                                <li>You may request a data export within 30 days</li>
                            </ul>
                        </section>

                        {/* Governing Law */}
                        <section>
                            <h2 className="text-2xl font-medium text-white mb-4">11. Governing Law</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        {/* Dispute Resolution */}
                        <section>
                            <h2 className="text-2xl font-medium text-white mb-4">12. Dispute Resolution</h2>
                            <p className="mb-4">
                                Any disputes arising from these Terms or the Service shall be resolved through:
                            </p>
                            <ol className="list-decimal list-inside space-y-2 ml-4">
                                <li><strong>Informal Negotiation</strong> - Contact us at <a href="mailto:legal@defrag.app" className="text-orange-400 hover:text-orange-300 underline">legal@defrag.app</a></li>
                                <li><strong>Mediation</strong> - If negotiation fails, binding mediation</li>
                                <li><strong>Arbitration</strong> - Final binding arbitration if mediation fails</li>
                            </ol>
                        </section>

                        {/* Changes to Terms */}
                        <section>
                            <h2 className="text-2xl font-medium text-white mb-4">13. Changes to Terms</h2>
                            <p className="mb-4">
                                We reserve the right to modify these Terms at any time. We will notify you of changes by:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                                <li>Posting the new Terms on this page</li>
                                <li>Updating the "Last Updated" date</li>
                                <li>Sending an email notification for material changes</li>
                            </ul>
                            <p>
                                Your continued use of the Service after changes constitutes acceptance of the new Terms.
                            </p>
                        </section>

                        {/* Contact */}
                        <section>
                            <h2 className="text-2xl font-medium text-white mb-4">14. Contact Information</h2>
                            <p className="mb-4">
                                For questions about these Terms, please contact us:
                            </p>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <p className="mb-2"><strong className="text-white">Legal:</strong> <a href="mailto:legal@defrag.app" className="text-orange-400 hover:text-orange-300">legal@defrag.app</a></p>
                                <p className="mb-2"><strong className="text-white">Support:</strong> <a href="mailto:support@defrag.app" className="text-orange-400 hover:text-orange-300">support@defrag.app</a></p>
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
