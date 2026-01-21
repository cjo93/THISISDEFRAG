import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Modality } from '@google/genai';

/**
 * DEFRAG API // PROXY VOICE MODULE
 * Serverless endpoint for TTS emergency override system
 * API key secured on Vercel environment
 */

interface RequestBody {
  text: string;
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
    const { text } = req.body as RequestBody;

    if (!text) {
      return res.status(400).json({ error: 'INVALID_PAYLOAD: Text required' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [{ 
        parts: [{ 
          text: `Say this in a neutral, calm, cold, mechanical robotic British voice: ${text}` 
        }] 
      }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Charon' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      return res.status(500).json({ error: 'TTS_GENERATION_FAILED' });
    }

    return res.status(200).json({ audio: base64Audio });

  } catch (error: any) {
    console.error('[DEFRAG] TTS generation error:', error);
    return res.status(500).json({ 
      error: 'VOICE_SYNTHESIS_FAILURE',
      message: error.message || 'Unknown error'
    });
  }
}
