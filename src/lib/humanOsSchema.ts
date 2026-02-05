export interface HumanOsJson {
  input: {
    birthData: {
      date: string;
      time: string;
      location: string;
    };
    people?: any[];
    journal?: string;
  };
  telemetry: {
    vectors: Record<string, any>;
    // Add specific NASA vector types as needed
  };
  seda: {
    score: number;
    band: 'optimal' | 'strain' | 'friction' | 'clinical_crisis';
    safetyAction: {
      mode: 'standard' | 'grounding';
      reason?: string;
    };
  };
  orbit: {
    geometry: any;
    frictionMatrix: any;
    pressurePoints: any;
  };
  meta: {
    version: string;
    generatedAt: string;
    engine: string;
  };
}

export const GROUNDING_PROTOCOL = {
  title: "System Overload Detected",
  message: "Your current telemetry indicates high systemic pressure. Interpretive analysis is paused to prioritize stability.",
  steps: [
    "Hydrate immediately.",
    "Disconnect from digital inputs for 15 minutes.",
    "Focus on physical sensation (gravity, breath, temperature).",
    "If in acute distress, contact emergency services."
  ]
};
