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
    contents: `You're creating a relationship guide based on Bowen Family Systems Theory. Write in simple, conversational language—like you're talking to a friend who wants to understand their relationship better.

PERSON A: ${unitA.name} (${unitA.model}, Sun in ${unitA.sun_sign}, Mars in ${unitA.mars_sign})
PERSON B: ${unitB.name} (${unitB.model}, Sun in ${unitB.sun_sign}, Mars in ${unitB.mars_sign})

Use Bowen Family Systems Theory to understand their patterns:
- How they each handle anxiety and stress
- Their level of self-differentiation (staying calm and clear while staying connected)
- Patterns of distance and pursuit when things get tense
- How they might triangle in others when conflict arises

IMPORTANT:
- Use everyday language. No jargon, no "protocols," no technical terms.
- Don't diagnose or prescribe therapy.
- Focus on observable patterns in how people relate to each other.
- Be warm, insightful, and practical.

Give me a JSON response with:

1. "specifications": A simple summary of how these two people tend to interact (2-3 sentences in plain English)

2. "operatingProcedures": An array of 3 objects, each with:
   - "title": A simple, clear title
   - "description": Practical advice for ${unitA.name} on how to stay grounded and connected with ${unitB.name}. Keep it conversational.

3. "troubleshooting": An array of 3 objects, each with:
   - "symptom": A common thing that happens when they're stressed
   - "resolution": What ${unitA.name} can do to stay calm and help things settle down. Use everyday language.

4. "maintenanceSchedule": An array of 3 objects, each with:
   - "frequency": How often (like "Daily" or "Weekly")
   - "task": A simple practice to keep their relationship healthy and reduce chronic stress.

Keep everything warm, practical, and in plain English.`,
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
