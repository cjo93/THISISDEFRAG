// src/pages/PlatformHub.tsx - PRODUCTION READY

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, Shield, Code, TrendingUp, Users, BookOpen, ArrowRight } from 'lucide-react';
import '../styles/PlatformHub.css';
import Footer from '../components/Footer';

const PlatformHub: React.FC = () => {
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="platform-container">
            {/* ========== HEADER ========== */}
            <header className="platform-header" style={{
                backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
                borderBottom: scrollY > 50 ? '1px solid #f0f0f0' : 'none'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/" className="platform-brand">
                        <span className="brand-icon">◎</span>
                        DEFRAG
                    </Link>
                </div>

                <nav className="platform-nav">
                    <Link to="/products/manuals" className="nav-link">Products</Link>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/docs" className="nav-link">Docs</Link>
                    <Link to="/developer" className="nav-link">Developer</Link>
                    <Link to="/signin" className="nav-signin">Sign In</Link>
                    <Link to="/start" className="nav-cta">Get Started</Link>
                </nav>
            </header>

            {/* ========== HERO SECTION - EMOTIONALLY RESONANT ========== */}
            <section className="hero-section" style={{ background: 'linear-gradient(180deg, #000 0%, #0a0a0a 100%)' }}>
                <div className="hero-glow-top" style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249,115,22,0.15) 0%, transparent 70%)'
                }}></div>

                <div className="hero-content" style={{ textAlign: 'center', maxWidth: '900px' }}>
                    {/* Methodology Badge */}
                    <div className="hero-badge" style={{
                        background: 'rgba(249,115,22,0.1)',
                        border: '1px solid rgba(249,115,22,0.3)',
                        color: '#f97316'
                    }}>
                        <span className="badge-dot" style={{ background: '#f97316' }}></span>
                        No Astrology, Astrology × No Psychology, Psychology
                    </div>

                    <h1 className="hero-title" style={{
                        fontWeight: 300,
                        lineHeight: 1.1,
                        marginBottom: '1.5rem'
                    }}>
                        Cognitive Middleware<br />
                        <span className="gradient-text" style={{
                            background: 'linear-gradient(135deg, #fff 0%, #fed7aa 50%, #f97316 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>for Human Systems</span>
                    </h1>

                    <p className="hero-subtitle" style={{
                        maxWidth: '700px',
                        margin: '0 auto 1rem',
                        fontSize: '1.5rem',
                        color: 'rgba(255,255,255,0.8)',
                        fontWeight: 300
                    }}>
                        Why they do what they do.<br />
                        <span style={{ color: '#fff' }}>How to stay connected when it's hard.</span>
                    </p>

                    <p style={{
                        fontSize: '1.1rem',
                        color: 'rgba(255,255,255,0.5)',
                        maxWidth: '600px',
                        margin: '0 auto 2.5rem',
                        fontWeight: 300
                    }}>
                        No more guessing. No more feeling lost.<br />
                        Just clarity when you need it most.
                    </p>

                    <div className="hero-actions">
                        <Link to="/start" className="btn btn-primary btn-lg" style={{
                            background: '#f97316',
                            color: '#000',
                            fontWeight: 600,
                            boxShadow: '0 0 30px rgba(249,115,22,0.3)'
                        }}>
                            Generate My Manual
                            <ArrowRight size={18} />
                        </Link>
                        <Link to="/products/manuals" className="btn btn-secondary btn-lg" style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'rgba(255,255,255,0.7)'
                        }}>
                            How It Works
                        </Link>
                    </div>

                    <div className="hero-stats" style={{ marginTop: '3rem' }}>
                        <div className="stat">
                            <div className="stat-number" style={{ color: '#f97316' }}>NASA JPL</div>
                            <div className="stat-label">Topocentric Precision</div>
                        </div>
                        <div className="stat">
                            <div className="stat-number" style={{ color: '#f97316' }}>SEDA</div>
                            <div className="stat-label">Clinical Firewall</div>
                        </div>
                        <div className="stat">
                            <div className="stat-number" style={{ color: '#f97316' }}>No Diagnosis</div>
                            <div className="stat-label">Mechanical Transparency</div>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    {/* Scroll indicator */}
                    <div style={{
                        position: 'absolute',
                        bottom: '2rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: 0.4,
                        animation: 'bounce 2s infinite'
                    }}>
                        <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
                        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, white, transparent)' }} />
                    </div>
                </div>
            </section>

            {/* ========== PRODUCTS SHOWCASE ========== */}
            <section className="products-section">
                <div className="section-header">
                    <h2>Our Platform</h2>
                    <p>Everything you need in one integrated ecosystem</p>
                </div>

                <div className="products-grid">
                    {/* Product 1: Manuals */}
                    <div className="product-card" onMouseEnter={() => setActiveFeature(0)}>
                        <div className="product-icon manuals-icon">
                            <BookOpen size={32} />
                        </div>
                        <h3>Manuals</h3>
                        <p>Personalized relationship guides powered by psychology and astrology. Understand why people do what they do.</p>

                        <div className="product-features">
                            <div className="feature-item">
                                <span className="feature-check">✓</span>
                                Individual insights
                            </div>
                            <div className="feature-item">
                                <span className="feature-check">✓</span>
                                Relationship dynamics
                            </div>
                            <div className="feature-item">
                                <span className="feature-check">✓</span>
                                Team compatibility
                            </div>
                            <div className="feature-item">
                                <span className="feature-check">✓</span>
                                Stress patterns
                            </div>
                        </div>

                        <Link to="/products/manuals" className="product-link">
                            Explore Manuals
                            <ChevronRight size={18} />
                        </Link>
                    </div>

                    {/* Product 2: Developer Dashboard */}
                    <div className="product-card featured" onMouseEnter={() => setActiveFeature(1)}>
                        <div className="badge-featured">Most Powerful</div>
                        <div className="product-icon dashboard-icon">
                            <Zap size={32} />
                        </div>
                        <h3>Developer Dashboard</h3>
                        <p>Manage API keys, monitor usage, and control your integration—all from a powerful, intuitive interface.</p>

                        <div className="product-features">
                            <div className="feature-item">
                                <span className="feature-check">✓</span>
                                API key management
                            </div>
                            <div className="feature-item">
                                <span className="feature-check">✓</span>
                                Real-time analytics
                            </div>
                            <div className="feature-item">
                                <span className="feature-check">✓</span>
                                Usage tracking
                            </div>
                            <div className="feature-item">
                                <span className="feature-check">✓</span>
                                Secure auth
                            </div>
                        </div>

                        <Link to="/dashboard" className="product-link">
                            Access Dashboard
                            <ChevronRight size={18} />
                        </Link>
                    </div>

                    {/* Product 3: APIs */}
                    <div className="product-card" onMouseEnter={() => setActiveFeature(2)}>
                        <div className="product-icon api-icon">
                            <Code size={32} />
                        </div>
                        <h3>APIs & Resources</h3>
                        <p>RESTful APIs, SDKs, and comprehensive documentation for seamless integration into your stack.</p>

                        <div className="product-features">
                            <div className="feature-item">
                                <span className="feature-check">✓</span>
                                REST API endpoints
                            </div>
                            <div className="feature-item">
                                <span className="feature-check">✓</span>
                                Multi-language SDKs
                            </div>
                            <div className="feature-item">
                                <span className="feature-check">✓</span>
                                Code examples
                            </div>
                            <div className="feature-item">
                                <span className="feature-check">✓</span>
                                Technical support
                            </div>
                        </div>

                        <Link to="/docs" className="product-link">
                            View Documentation
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ========== WHY DEFRAG SECTION ========== */}
            <section className="why-section">
                <div className="section-header">
                    <h2>Why Build on DEFRAG?</h2>
                    <p>Enterprise-grade platform built for scale, security, and simplicity</p>
                </div>

                <div className="why-grid">
                    <div className="why-card">
                        <div className="why-icon">
                            <Shield size={28} />
                        </div>
                        <h4>Enterprise Security</h4>
                        <p>Bank-grade encryption, SOC 2 compliance, and privacy-first architecture.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">
                            <Zap size={28} />
                        </div>
                        <h4>Lightning Fast</h4>
                        <p>Global CDN, optimized APIs, and sub-100ms response times.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">
                            <Code size={28} />
                        </div>
                        <h4>Developer Friendly</h4>
                        <p>Clear documentation, generous free tier, and world-class support.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">
                            <TrendingUp size={28} />
                        </div>
                        <h4>Scale Without Limits</h4>
                        <p>From startup to enterprise—flexible pricing and infrastructure.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">
                            <Users size={28} />
                        </div>
                        <h4>Purpose-Built</h4>
                        <p>Designed specifically for understanding human behavior and relationships.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">
                            <BookOpen size={28} />
                        </div>
                        <h4>Constantly Evolving</h4>
                        <p>Regular updates, new features, and community-driven roadmap.</p>
                    </div>
                </div>
            </section>

            {/* ========== PRICING SECTION ========== */}
            <section className="pricing-section">
                <div className="section-header">
                    <h2>Simple, Transparent Pricing</h2>
                    <p>Choose the plan that works for you. Upgrade or downgrade anytime.</p>
                </div>

                <div className="pricing-grid">
                    {/* Pricing Tier 1 */}
                    <div className="pricing-card">
                        <h4>Explorer</h4>
                        <div className="price">
                            <span className="currency">Free</span>
                        </div>
                        <p className="price-desc">Get started with the essentials</p>
                        <Link to="/products/manuals" className="pricing-btn">Start Free</Link>
                        <ul className="pricing-features">
                            <li><span>✓</span> 1 manual per month</li>
                            <li><span>✓</span> Basic insights</li>
                            <li><span>✓</span> Community access</li>
                            <li><span>✗</span> API access</li>
                            <li><span>✗</span> Priority support</li>
                        </ul>
                    </div>

                    {/* Pricing Tier 2 */}
                    <div className="pricing-card featured">
                        <div className="tier-badge">Most Popular</div>
                        <h4>Professional</h4>
                        <div className="price">
                            <span className="amount">$19</span>
                            <span className="period">/month</span>
                        </div>
                        <p className="price-desc">For individuals and small teams</p>
                        <Link to="/start" className="pricing-btn primary">Get Started</Link>
                        <ul className="pricing-features">
                            <li><span>✓</span> Unlimited manuals</li>
                            <li><span>✓</span> Advanced analytics</li>
                            <li><span>✓</span> Team collaboration</li>
                            <li><span>✓</span> API access</li>
                            <li><span>✓</span> Email support</li>
                        </ul>
                    </div>

                    {/* Pricing Tier 3 */}
                    <div className="pricing-card">
                        <h4>Enterprise</h4>
                        <div className="price">
                            <span className="currency">Custom</span>
                        </div>
                        <p className="price-desc">For large organizations</p>
                        <Link to="mailto:hello@defrag.app" className="pricing-btn">Contact Sales</Link>
                        <ul className="pricing-features">
                            <li><span>✓</span> Everything in Pro</li>
                            <li><span>✓</span> Dedicated support</li>
                            <li><span>✓</span> Custom integrations</li>
                            <li><span>✓</span> SLA guarantee</li>
                            <li><span>✓</span> Advanced security</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ========== FEATURE COMPARISON ========== */}
            <section className="features-section" style={{ padding: "4rem 2rem", background: "white" }}>
                <div className="section-header">
                    <h2>Feature Comparison</h2>
                    <p>See what's included in each plan</p>
                </div>

                <div className="comparison-table" style={{ maxWidth: "1000px", margin: "0 auto", overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                        <thead>
                            <tr style={{ borderBottom: "2px solid #eee" }}>
                                <th style={{ padding: "1rem" }}>Feature</th>
                                <th style={{ padding: "1rem" }}>Explorer</th>
                                <th style={{ padding: "1rem" }}>Professional</th>
                                <th style={{ padding: "1rem" }}>Enterprise</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "1rem" }}>Monthly Manuals</td>
                                <td style={{ padding: "1rem" }}>1</td>
                                <td style={{ padding: "1rem" }}>Unlimited</td>
                                <td style={{ padding: "1rem" }}>Unlimited</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "1rem" }}>API Requests/Month</td>
                                <td style={{ padding: "1rem" }}>0</td>
                                <td style={{ padding: "1rem" }}>100K</td>
                                <td style={{ padding: "1rem" }}>Custom</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "1rem" }}>Team Members</td>
                                <td style={{ padding: "1rem" }}>1</td>
                                <td style={{ padding: "1rem" }}>5</td>
                                <td style={{ padding: "1rem" }}>Unlimited</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "1rem" }}>Support</td>
                                <td style={{ padding: "1rem" }}>Community</td>
                                <td style={{ padding: "1rem" }}>Email</td>
                                <td style={{ padding: "1rem" }}>24/7 Phone</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "1rem" }}>SLA</td>
                                <td style={{ padding: "1rem" }}>Best effort</td>
                                <td style={{ padding: "1rem" }}>99.5%</td>
                                <td style={{ padding: "1rem" }}>99.9%</td>
                            </tr>
                            <tr>
                                <td style={{ padding: "1rem" }}>Custom Integrations</td>
                                <td style={{ padding: "1rem" }}>—</td>
                                <td style={{ padding: "1rem" }}>—</td>
                                <td style={{ padding: "1rem" }}>✓</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ========== CTA SECTION ========== */}
            <section className="final-cta">
                <div className="cta-content">
                    <h2>Ready to Bring Clarity?</h2>
                    <p>Join early adopters and developers building clarity into their systems with DEFRAG.</p>
                    <div className="cta-actions">
                        <Link to="/products/manuals" className="btn btn-primary btn-lg" style={{ background: "white", color: "black" }}>
                            Create Your First Manual
                        </Link>
                        <Link to="/docs" className="btn btn-secondary btn-lg" style={{ background: "transparent", color: "white", borderColor: "white" }}>
                            Read Documentation
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PlatformHub;
