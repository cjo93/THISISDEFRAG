import { VercelRequest, VercelResponse } from '@vercel/node';
import library from '../../src/lib/Inversion_Library.json';

// Simple heuristic mapping (in production use embeddings/LLM)
function findShadow(text: string) {
  const normalized = text.toLowerCase();

  let bestMatch = null;
  let maxScore = 0;

  library.inversion_dictionary.forEach(entry => {
    let score = 0;
    if (normalized.includes(entry.shadow.toLowerCase())) score += 3;
    entry.aliases.forEach(alias => {
        if (normalized.includes(alias.toLowerCase())) score += 2;
    });

    if (score > maxScore) {
        maxScore = score;
        bestMatch = entry;
    }
  });

  // Default fallback if no clear match (for prototype)
  if (!bestMatch) bestMatch = library.inversion_dictionary[0];

  return { entry: bestMatch, confidence: maxScore > 0 ? 0.8 : 0.3 };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, isPaid } = req.body;

  if (!text) {
      return res.status(400).json({ error: 'Text input required' });
  }

  const { entry, confidence } = findShadow(text);

  const response: any = {
      shadow: {
          gate: entry.gate,
          label: entry.shadow,
          confidence
      },
      systemicVoltage: 'medium',
      phase: isPaid ? 'full_inversion_unlocked' : 'frequency_audit'
  };

  if (isPaid) {
      response.gift = {
          gate: entry.gate,
          label: entry.gift
      };
      response.siddhi = {
          label: entry.siddhi
      };
  }

  res.status(200).json(response);
}
