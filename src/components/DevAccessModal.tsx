import React from 'react';
import { X } from 'lucide-react';

interface DevAccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DevAccessModal({ isOpen, onClose }: DevAccessModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/40 hover:text-white transition"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center mb-6">
                    <span className="text-gray-300 text-2xl font-mono">{ }</span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-light text-white mb-4">
                    Developer Access
                </h3>

                <div className="space-y-4 mb-8">
                    <p className="text-white/70 leading-relaxed">
                        We're testing this privately.
                    </p>
                    <p className="text-white/50 leading-relaxed">
                        If you need access for a real project, please contact support and we'll discuss your use case.
                    </p>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/20 text-gray-300 text-xs font-mono tracking-widest uppercase mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Private Testing
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <a
                        href="mailto:help@defrag.app?subject=Developer%20API%20Access%20Request"
                        className="flex-1 h-12 flex items-center justify-center bg-white text-black font-bold text-sm tracking-widest rounded-lg hover:bg-gray-100 transition uppercase"
                    >
                        Contact Support
                    </a>
                    <button
                        onClick={onClose}
                        className="h-12 px-6 border border-white/10 text-white/60 text-sm tracking-widest rounded-lg hover:bg-white/5 transition uppercase"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
