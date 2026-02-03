import React from 'react';
import DocLayout from '../../components/docs/DocLayout';
import CodeSnippet from '../../components/docs/CodeSnippet';

const CodeExamples: React.FC = () => {
    return (
        <DocLayout>
            <h1>Code Examples</h1>
            <p className="text-xl text-white/60 mb-8">Common patterns and recipes.</p>

            <section className="mb-12">
                <h2>Calculating Coherence</h2>
                <p className="mb-4 text-white/80">Submit relational geometry data to analyze coherence scores.</p>
                <CodeSnippet language="typescript">
                    {`import { Defrag } from '@defrag/sdk';

const client = new Defrag(process.env.DEFRAG_API_KEY);

const analysis = await client.orbit.map({
  primary: { lat: 34.05, lon: -118.24, dob: '1990-01-01' },
  target: { lat: 40.71, lon: -74.00, dob: '1992-05-15' }
});

console.log('Coherence Score:', analysis.coherence); // 0.89`}
                </CodeSnippet>
            </section>

            <section className="mb-12">
                <h2>Stream SEDA Audits</h2>
                <p className="mb-4 text-white/80">Process journal entries in real-time for safety scoring.</p>
                <CodeSnippet language="python">
                    {`from defrag import Client

client = Client('sk_live_...')

# Analyzes text for markers of high environmental pressure
audit = client.seda.audit(
    journal_text="I feel overwhelmed by the noise...",
    context="clinical_intake"
)

if audit.risk_score > 0.8:
    print("Alert: High Pressure Detected")`}
                </CodeSnippet>
            </section>
        </DocLayout>
    );
};

export default CodeExamples;
