import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

// Initialize Gemini with server-side environment variable
const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!apiKey) {
    console.error('SERVER ERROR: Missing GEMINI_API_KEY');
    return res.status(500).json({ error: 'System configuration error: API Key missing' });
  }

  try {
    const { unitA, unitB } = req.body || {};

    if (!unitA || !unitB) {
      return res.status(400).json({ error: 'Missing unit data' });
    }

    const genAI = new GoogleGenAI({ apiKey });

    const prompt = `You're creating a relationship guide based on Bowen Family Systems Theory. Write in simple, conversational language—like you're talking to a friend who wants to understand their relationship better.

PERSON A: ${unitA.name} (${unitA.model}, Sun in ${unitA.sun_sign}, Mars in ${unitA.mars_sign})
PERSON B: ${unitB.name} (${unitB.model}, Sun in ${unitB.sun_sign}, Mars in ${unitB.mars_sign})

Use Bowen Family Systems Theory to understand their patterns:
- How they each handle anxiety and stress
- Their level of self-differentiation
- Patterns of distance and pursuit
- Triangulation risks

IMPORTANT:
- Use everyday language. No jargon.
- Don't diagnose.
- Focus on observable patterns.
- Be warm, insightful, and practical.

Give me a JSON response with:
1. "specifications": A simple summary (2-3 sentences)
2. "operatingProcedures": 3 practical advice items ({title, description})
3. "troubleshooting": 3 common stress symptoms and resolutions ({symptom, resolution})
4. "maintenanceSchedule": 3 simple practices ({frequency, task})

Keep it warm and practical.`;

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash", // Using 2.0-flash as per @google/genai support
      contents: prompt,
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

    const text = result.response.text();
    const json = JSON.parse(text);

    res.status(200).json(json);

  } catch (error: any) {
    console.error('Gemini Generation Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate manual' });
  }
}
