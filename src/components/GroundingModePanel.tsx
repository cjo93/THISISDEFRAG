import React from 'react';
import { AlertTriangle, Shield, Activity } from 'lucide-react';
import { GROUNDING_PROTOCOL } from '../lib/humanOsSchema';

interface GroundingModePanelProps {
  band: string;
  score: number;
}

export const GroundingModePanel: React.FC<GroundingModePanelProps> = ({ band, score }) => {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg max-w-2xl mx-auto my-8 font-sans">
      <div className="flex items-start gap-4">
        <div className="bg-amber-100 p-2 rounded-full">
          <Shield className="text-amber-600" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
            {GROUNDING_PROTOCOL.title}
            <span className="text-xs font-mono bg-amber-200 text-amber-800 px-2 py-0.5 rounded uppercase">
              SEDA: {score} ({band})
            </span>
          </h3>
          <p className="text-amber-800 mt-2 mb-4">
            {GROUNDING_PROTOCOL.message}
          </p>

          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-bold text-amber-900 mb-2 text-sm uppercase tracking-wide">Grounding Protocol Active</h4>
            <ul className="space-y-2">
              {GROUNDING_PROTOCOL.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 text-amber-900 text-sm">
                  <Activity size={16} className="mt-0.5 shrink-0 opacity-50" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-xs text-amber-700/60 font-mono">
            Safety Interlock Engaged • Standard Output Suppressed
          </div>
        </div>
      </div>
    </div>
  );
};
