import React from 'react';

interface CodeSnippetProps {
    language: string;
    children: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ language, children }) => {
    return (
        <div className="my-4 rounded-lg overflow-hidden border border-white/10 bg-[#0d1117]">
            <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
                <span className="text-xs uppercase text-white/40 font-mono">{language}</span>
                <button
                    className="text-xs text-white/40 hover:text-white"
                    onClick={() => navigator.clipboard.writeText(children)}
                >
                    Copy
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-white/80 leading-relaxed">
                <code>{children}</code>
            </pre>
        </div>
    );
};

export default CodeSnippet;
