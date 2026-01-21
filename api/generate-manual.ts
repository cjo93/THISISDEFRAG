import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

/**
 * DEFRAG API // MANUAL COMPILER
 * Serverless endpoint for generating relationship operating manuals
 * API key secured on Vercel environment
 */

interface UnitPayload {
  name: string;
  model: string;
  location: string;
  fuel?: string;
  mars_sign?: string;
  sun_sign?: string;
}

interface RequestBody {
  unitA: UnitPayload;
  unitB: UnitPayload;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[DEFRAG] GEMINI_API_KEY not configured');
    return res.status(500).json({ error: 'API_KEY_MISSING' });
  }

  try {
    const { unitA, unitB } = req.body as RequestBody;

    if (!unitA?.name || !unitB?.name) {
      return res.status(400).json({ error: 'INVALID_PAYLOAD: Unit data required' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Compile a "Relationship Operating Manual" by analyzing the underlying source code of these two units.
    
UNIT A (OPERATOR): 
- Designation: ${unitA.name}
- Model: ${unitA.model || 'UNKNOWN'}
- Coordinates: ${unitA.location || 'UNSPECIFIED'}
- Fuel Type: ${unitA.fuel || 'UNDETERMINED'}
- Mars Position: ${unitA.mars_sign || 'N/A'}
- Sun Position: ${unitA.sun_sign || 'N/A'}

UNIT B (SUBJECT): 
- Designation: ${unitB.name}
- Model: ${unitB.model || 'UNKNOWN'}
- Coordinates: ${unitB.location || 'UNSPECIFIED'}
- Fuel Type: ${unitB.fuel || 'UNDETERMINED'}
- Mars Position: ${unitB.mars_sign || 'N/A'}
- Sun Position: ${unitB.sun_sign || 'N/A'}

THE MANIFESTO: Human behavior isn't random; it is coded. You are analyzing planetary geometry and natal positions to extract operational instructions. Strip away all mysticism and "magic." You are a System Architect writing an industrial tech manual.

TONE: Strictly industrial, mechanical, objective, and digital. Use terms like "Hardware", "Coordinates", "Instructions", "Mismatch", "Buffer", "Packet Loss", "Voltage", "Source Code", "Thermal Throttling", "Kernel Panic", "Firmware", "Protocol".

STRUCTURE REQUIRED:
1. Specifications (Hardware Overview): Detail the geometric friction between their planetary positions. Frame any conflict as a hardware limitation, not a personality flaw. Reference their Mars signs (drive mechanism) and Sun signs (core processor).
2. Procedures (Engagement Protocols): Step-by-step instructions for data transmission. How should Unit A initiate contact without causing Unit B's CPU to spike or thermal throttle? Be specific to their fuel types.
3. Troubleshooting (Patch Scripts): Specific mechanical "patches" for common errors (Silent Treatment, Yelling, Circular Logic) based on their unique coordinate data and planetary aspects.

Response must be valid JSON matching the schema. Each section should be 2-3 paragraphs of detailed technical analysis.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            specifications: { type: Type.STRING },
            procedures: { type: Type.STRING },
            troubleshooting: { type: Type.STRING }
          },
          required: ['specifications', 'procedures', 'troubleshooting']
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return res.status(200).json(result);

  } catch (error: any) {
    console.error('[DEFRAG] Manual generation error:', error);
    return res.status(500).json({ 
      error: 'COMPILATION_FAILURE',
      message: error.message || 'Unknown error'
    });
  }
}
