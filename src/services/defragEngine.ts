
import { UnitData, BirthData, DefragUserProfile } from '../types';

// Initialize Web Worker
const worker = new Worker(new URL('../workers/engine.worker.ts', import.meta.url), { type: 'module' });

// Message Correlation Map
let messageId = 0;
const pendingCallbacks = new Map<number, { resolve: (val: any) => void, reject: (err: any) => void }>();

// Handle Worker Responses
worker.onmessage = (e) => {
  const { type, payload, id } = e.data;
  if (pendingCallbacks.has(id)) {
    const { resolve, reject } = pendingCallbacks.get(id)!;
    pendingCallbacks.delete(id);
    if (type === 'ERROR') {
      reject(new Error(payload));
    } else {
      resolve(payload);
    }
  }
};

worker.onerror = (e) => {
  console.error('Worker Error:', e);
};

// --- PUBLIC API ---

export const calculateMechanics = async (
  name: string,
  birthDate: string,
  birthTime: string,
  birthPlace: string
): Promise<UnitData> => {
  const id = ++messageId;
  return new Promise((resolve, reject) => {
    pendingCallbacks.set(id, { resolve, reject });
    worker.postMessage({
      type: 'CALCULATE_MECHANICS',
      id,
      payload: { name, birthDate, birthTime, birthPlace }
    });
  });
};

export class DefragEngine {
  /**
   * Generates a full profile.
   * NOTE: This is now ASYNCHRONOUS because it runs in a Web Worker.
   */
  public async generateProfile(birthData: BirthData): Promise<DefragUserProfile> {
    const id = ++messageId;
    return new Promise((resolve, reject) => {
      pendingCallbacks.set(id, { resolve, reject });
      worker.postMessage({
        type: 'GENERATE_PROFILE',
        id,
        payload: { birthData }
      });
    });
  }
}

export const defragEngineInstance = new DefragEngine();
