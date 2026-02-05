import React from 'react';
import DocLayout from '../../components/docs/DocLayout';
import CodeSnippet from '../../components/docs/CodeSnippet';

const Authentication: React.FC = () => {
    return (
        <DocLayout>
            <h1>Authentication</h1>
            <p className="text-xl text-white/60 mb-8">Secure your API requests with API Key authentication.</p>

            <section className="mb-12">
                <h2>Using API Keys</h2>
                <p className="mb-4 text-white/80">Pass your API key in the <code>Authorization</code> header:</p>
                <CodeSnippet language="bash">
                    {`curl https://api.defrag.app/api/v1/seda/audit \\
  -H "Authorization: Bearer sk_live_your_key_here" \\
  -d '{"data": "value"}'`}
                </CodeSnippet>
            </section>

            <section className="mb-12">
                <h2>Generating Keys</h2>
                <ol className="list-decimal pl-6 space-y-4 text-white/80">
                    <li>Log in to the <a href="/dashboard" className="text-slate-400">Dashboard</a>.</li>
                    <li>Navigate to the <strong>API Keys</strong> section.</li>
                    <li>Click <strong>Generate New Key</strong>.</li>
                    <li>Copy the key immediately. It will hash securely and never be shown again.</li>
                </ol>
            </section>

            <section className="mb-12 p-6 bg-slate-900/20 border border-slate-500/30 rounded-lg">
                <h3 className="text-slate-400 font-bold mb-2">Security Warning</h3>
                <p className="text-white/80 text-sm">Never expose your API keys in client-side code (browsers, mobile apps). Always proxy requests through your own backend server.</p>
            </section>
        </DocLayout>
    );
};

export default Authentication;
