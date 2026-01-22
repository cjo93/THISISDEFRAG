import { UnitData, ManualPreview } from "../types";

/**
 * DEFRAG SERVICE LAYER
 * Calls serverless API endpoints (Vercel) for secure Gemini access
 */

const getApiBase = () => {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return null;
  }
  return '';
};

export const generateManualPreview = async (unitA: UnitData, unitB: UnitData): Promise<ManualPreview> => {
  const apiBase = getApiBase();

  // Production: call serverless endpoint
  if (apiBase !== null) {
    const response = await fetch(`${apiBase}/api/generate-manual`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unitA, unitB })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'UPLINK_FAILURE');
    }

    return response.json();
  }

  // Local dev fallback
  const { GoogleGenAI, Type } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Compile a "Relationship Operating Manual" by analyzing the underlying behavioral architecture of these two units.
    
UNIT A (OPERATOR): Name: ${unitA.name}, OS_TYPE: ${unitA.model}, Core: ${unitA.sun_sign}, Drive: ${unitA.mars_sign}
UNIT B (SUBJECT): Name: ${unitB.name}, OS_TYPE: ${unitB.model}, Core: ${unitB.sun_sign}, Drive: ${unitB.mars_sign}

You are a System Architect writing a practical relationship guide based on technical behavioral mapping. 
IMPORTANT: Direct all guidance toward communication protocols and behavioral dynamics. Avoid clinical medical diagnosis or therapeutic claims.

TONE: Clear, technical, slightly industrial but insightful. Use terms like "optimization", "logic conflict", "resonance", "latency", and "protocol".

STRUCTURE REQUIRED (JSON):
1. specifications: A technical summary of how these two specific behavioral architectures interact (e.g. "Low latency communication with high reactive feedback").
2. operatingProcedures: Array of {title, description} - 3 specific communication protocols for Unit A when engaging Unit B's specific OS.
3. troubleshooting: Array of {symptom, resolution} - 3 common logic conflicts and the technical reset steps to resolve them.
4. maintenanceSchedule: Array of {frequency, task} - 3 preventative maintenance tasks to ensure system stability.

Response must be valid JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          specifications: { type: Type.STRING },
          operatingProcedures: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["title", "description"]
            }
          },
          troubleshooting: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                symptom: { type: Type.STRING },
                resolution: { type: Type.STRING }
              },
              required: ["symptom", "resolution"]
            }
          },
          maintenanceSchedule: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                frequency: { type: Type.STRING },
                task: { type: Type.STRING }
              },
              required: ["frequency", "task"]
            }
          }
        },
        required: ["specifications", "operatingProcedures", "troubleshooting", "maintenanceSchedule"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const playProxyVoice = async (text: string) => {
  const apiBase = getApiBase();

  let base64Audio: string | undefined;

  if (apiBase !== null) {
    const response = await fetch(`${apiBase}/api/proxy-voice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'TTS_FAILURE');
    }

    const data = await response.json();
    base64Audio = data.audio;
  } else {
    const { GoogleGenAI, Modality } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say this in a neutral, calm voice: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Charon' },
          },
        },
      },
    });

    base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  }

  if (base64Audio) {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const audioData = atob(base64Audio);
    const arrayBuffer = new ArrayBuffer(audioData.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < audioData.length; i++) {
      view[i] = audioData.charCodeAt(i);
    }

    const dataInt16 = new Int16Array(view.buffer);
    const buffer = audioContext.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
  }
};
