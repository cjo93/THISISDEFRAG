import { UnitData, ManualPreview } from "../types";

/**
 * DEFRAG SERVICE LAYER
 * Securely calls serverless API endpoints.
 * NO CLIENT-SIDE KEYS.
 */

export const generateManualPreview = async (unitA: UnitData, unitB: UnitData): Promise<ManualPreview> => {
  console.log('Requesting manual generation via secure uplink...');

  const response = await fetch('/api/generate-manual', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ unitA, unitB })
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Generation Failed:', error);
    throw new Error(error.error || 'UPLINK_FAILURE');
  }

  return response.json();
};

export const playProxyVoice = async (text: string) => {
  try {
    const response = await fetch('/api/proxy-voice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'TTS_FAILURE');
    }

    const data = await response.json();
    const base64Audio = data.audio;

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
  } catch (err) {
    console.error('Voice Playback Error:', err);
  }
};
