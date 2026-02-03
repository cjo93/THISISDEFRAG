import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Zap, Shield, ArrowRight } from 'lucide-react';

export default function DeveloperGuides() {
    const guides = [
        {
            icon: <Zap size={24} />,
            title: "Quick Start: Your First Manual",
            description: "Generate a User Manual in under 5 minutes. Learn the basics of DEFRAG API integration.",
            time: "5 min read",
            link: "/docs/getting-started"
        },
        {
            icon: <Shield size={24} />,
            title: "SEDA Safety Gating",
            description: "Implement the clinical firewall to protect users. Understand graceful degradation protocols.",
            time: "10 min read",
            link: "/docs/authentication"
        },
        {
            icon: <Code size={24} />,
            title: "Relational Geometry (ORBIT)",
            description: "Map multi-person systems. Identify friction patterns and triangulation dynamics in teams.",
            time: "15 min read",
            link: "/docs/api-reference"
        },
        {
            icon: <BookOpen size={24} />,
            title: "NASA JPL Telemetry Integration",
            description: "Leverage topocentric planetary precision for accurate Design Specification calculations.",
            time: "12 min read",
            link: "/docs/sdks"
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-light text-white mb-2">Integration Guides</h1>
                <p className="text-white/50">Detailed walkthroughs for common integration patterns.</p>
            </div>

            <div className="grid gap-4">
                {guides.map((guide, index) => (
                    <Link
                        key={index}
                        to={guide.link}
                        className="group p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all flex items-start gap-4"
                    >
                        <div className="p-3 bg-white/10 text-white rounded-lg">
                            {guide.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-white group-hover:text-white transition mb-1">
                                {guide.title}
                            </h3>
                            <p className="text-white/50 text-sm mb-2">{guide.description}</p>
                            <span className="text-xs text-white/30 font-mono">{guide.time}</span>
                        </div>
                        <ArrowRight size={20} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all mt-2" />
                    </Link>
                ))}
            </div>

            <div className="p-6 bg-white/5 border border-white/20 rounded-xl">
                <h3 className="text-white font-medium mb-2">Need a custom integration?</h3>
                <p className="text-white/50 text-sm mb-4">
                    Enterprise customers get dedicated integration support and custom guide development.
                </p>
                <a href="mailto:hello@defrag.app" className="text-white text-sm font-medium hover:underline">
                    Contact Enterprise Sales →
                </a>
            </div>
        </div>
    );
}
