import React from 'react';
import DocLayout from '../../components/docs/DocLayout';
import APIEndpoint from '../../components/docs/APIEndpoint';

const APIReference: React.FC = () => {
    return (
        <DocLayout>
            <h1>API Reference</h1>
            <p className="text-xl text-white/60 mb-8">Complete reference for all DEFRAG API endpoints.</p>

            <section className="mb-12">
                <h2 className="mb-6">Dashboard Endpoints</h2>
                <APIEndpoint
                    method="GET"
                    path="/api-v2/dashboard/keys"
                    description="Retrieve a list of all active and revoked API keys for the authenticated user."
                    auth="Bearer Token"
                />
                <APIEndpoint
                    method="POST"
                    path="/api-v2/dashboard/keys/create"
                    description="Generate a new API key. Returns the raw key only once."
                    auth="Bearer Token"
                />
                <APIEndpoint
                    method="POST"
                    path="/api-v2/dashboard/keys/revoke"
                    description="Immediately invalidate an API key. This action is irreversible."
                    auth="Bearer Token"
                />
                <APIEndpoint
                    method="GET"
                    path="/api-v2/dashboard/stats"
                    description="Get aggregated usage statistics for the user's account."
                    auth="Bearer Token"
                />
            </section>

            <section className="mb-12">
                <h2 className="mb-6">SEDA Engine</h2>
                <APIEndpoint
                    method="POST"
                    path="/api/v1/seda/audit"
                    description="Submit journal text and birth data for Environmental Pressure analysis."
                    auth="API Key"
                />
            </section>

            <section className="mb-12">
                <h2>Rate Limiting</h2>
                <p className="text-white/80">API requests are limited to 1,000 requests per hour per API key on the Pro plan.</p>
            </section>
        </DocLayout>
    );
};

export default APIReference;
