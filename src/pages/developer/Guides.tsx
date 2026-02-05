import React from 'react';
import DocLayout from '../../components/layout/DocLayout';

const DeveloperGuides: React.FC = () => {
  const codeSnippet = `async function handleUserMessage(userText) {
  // 1. Audit user input first
  const safetyCheck = await fetch('https://api.defrag.app/v1/seda/audit', {
    method: 'POST',
    headers: { 'Authorization': \`Bearer \${API_KEY}\` },
    body: JSON.stringify({ text: userText })
  }).then(r => r.json());

  // 2. Check Safety Band
  if (safetyCheck.band === 'clinical_crisis' || safetyCheck.score < 30) {
    return {
      type: 'system_override',
      content: "I'm detecting high systemic load. Let's pause interpretation and focus on stability.",
      action: 'grounding_protocol' // Trigger UI Grounding Panel
    };
  }

  // 3. If safe, proceed to LLM
  const response = await callLLM({
    systemPrompt: "You are a Defrag Agent. Use mechanical, non-mystical language.",
    userPrompt: userText
  });

  return { type: 'chat', content: response };
}`;

  return (
    <DocLayout>
      <h1 className="text-3xl font-bold mb-6">Guides</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Building Safe AI Agents</h2>
        <p className="mb-4">
          When integrating Large Language Models (LLMs) with Defrag, you must follow the <strong>SEDA First</strong> protocol.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="font-bold text-yellow-800">Safety Rule #1</p>
          <p className="text-sm text-yellow-800">
            Never allow an LLM to interpret a user's state without checking their SEDA Band first.
            If the band is <code className="font-mono">clinical_crisis</code>, the agent must switch to Grounding Mode immediately.
          </p>
        </div>

        <h3 className="font-bold mb-2">Integration Pattern</h3>
        <ol className="list-decimal pl-6 space-y-4 text-gray-700 mb-8">
            <li><strong>Receive Input:</strong> User sends text/query to your agent.</li>
            <li><strong>Audit:</strong> Send input to <code className="bg-gray-100 px-1 font-mono">/v1/seda/audit</code>.</li>
            <li><strong>Check Band:</strong>
                <ul className="list-disc pl-6 mt-2 text-sm">
                    <li>If <code className="font-mono">optimal / strain</code>: Proceed with standard agent logic.</li>
                    <li>If <code className="font-mono">friction / crisis</code>: Override prompt with Grounding Protocol.</li>
                </ul>
            </li>
        </ol>

        <h3 className="font-bold mb-4">Example: Safe Chatbot Wrapper (Node.js)</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{codeSnippet}</pre>
        </div>
      </section>
    </DocLayout>
  );
};
export default DeveloperGuides;
