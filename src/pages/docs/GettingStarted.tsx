import React from 'react';
import DocLayout from '../../components/layout/DocLayout';

const DocsGettingStarted: React.FC = () => {
  return (
    <DocLayout>
      <h1 className="text-3xl font-bold mb-6">Getting Started</h1>
      <p className="text-lg mb-4">
        Welcome to the DEFRAG API. This guide will help you generate your first API key and make a request to the SEDA Engine.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">1. Obtain an API Key</h2>
      <p className="mb-4">
        Navigate to the <a href="/dashboard/keys" className="text-blue-600 underline">Dashboard</a> and generate a new key.
        Store this key safely; it represents your identity in the system.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">2. Make your first request</h2>
      <div className="bg-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
        <pre>{`curl -X POST https://api.defrag.app/v1/engine/analyze \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": {
      "birthDate": "1990-05-15",
      "birthTime": "14:30",
      "location": "New York, NY"
    }
  }'`}</pre>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">3. Understand the Response</h2>
      <p className="mb-4">
        The API returns a standardized <code className="bg-gray-100 px-1 rounded">HumanOS</code> JSON object containing telemetry, SEDA scores, and orbital mechanics.
      </p>
    </DocLayout>
  );
};
export default DocsGettingStarted;
