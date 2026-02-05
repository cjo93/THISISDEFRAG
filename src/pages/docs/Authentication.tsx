import React from 'react';
import DocLayout from '../../components/layout/DocLayout';

const DocsAuthentication: React.FC = () => {
  return (
    <DocLayout>
      <h1 className="text-3xl font-bold mb-6">Authentication</h1>
      <p className="mb-4">
        Authenticate your requests using the <code className="bg-gray-100 px-1 rounded">Authorization</code> header.
      </p>

      <div className="bg-gray-100 p-4 rounded-md font-mono text-sm mb-6">
        Authorization: Bearer sk_live_...
      </div>

      <h2 className="text-xl font-bold mb-4">Rate Limiting</h2>
      <p className="mb-4">
        API usage is limited based on your plan tier. Headers are returned with every request indicating your current status:
      </p>
      <ul className="list-disc pl-6 space-y-2 font-mono text-sm text-gray-700">
        <li>X-RateLimit-Limit: 1000</li>
        <li>X-RateLimit-Remaining: 998</li>
        <li>X-RateLimit-Reset: 1698712345</li>
      </ul>
    </DocLayout>
  );
};
export default DocsAuthentication;
