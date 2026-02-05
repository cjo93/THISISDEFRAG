import React from 'react';
import DocLayout from '../../components/layout/DocLayout';

const DocsAPIReference: React.FC = () => {
  return (
    <DocLayout>
      <h1 className="text-3xl font-bold mb-6">API Reference</h1>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-mono px-2 py-1 rounded">POST</span>
            /v1/engine/analyze
          </h2>
          <p className="mb-4 text-gray-600">
            Full spectrum analysis of a single entity. Generates SEDA scores, Orbital Geometry, and NASA telemetry vectors.
          </p>

          <h3 className="font-bold mb-2 text-sm uppercase text-gray-500">Request Body</h3>
          <div className="bg-gray-50 p-4 rounded border border-gray-200 font-mono text-xs mb-4">
{`{
  "birthDate": "YYYY-MM-DD", // Required
  "birthTime": "HH:mm",       // Required (24h)
  "location": "City, Country" // Required
}`}
          </div>

          <h3 className="font-bold mb-2 text-sm uppercase text-gray-500">Response</h3>
          <div className="bg-gray-50 p-4 rounded border border-gray-200 font-mono text-xs">
{`{
  "humanOs": {
    "seda": {
      "score": 85,
      "band": "optimal"
    },
    "orbit": { ... },
    "telemetry": { ... }
  }
}`}
          </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-mono px-2 py-1 rounded">POST</span>
            /v1/seda/audit
          </h2>
          <p className="mb-4 text-gray-600">
            Standalone safety audit. checks input text for high-entropy markers and returns a safety score.
          </p>
        </section>
      </div>
    </DocLayout>
  );
};
export default DocsAPIReference;
