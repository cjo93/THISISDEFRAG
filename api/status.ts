import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: 'nominal',
    timestamp: new Date().toISOString(),
    version: 'v2.0.0',
    systems: {
      auth: 'online',
      database: 'online',
      engine: 'online'
    }
  });
}
