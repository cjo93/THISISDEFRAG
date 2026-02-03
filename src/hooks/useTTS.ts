import { useState, useRef, useCallback } from 'react';

interface UseTTSReturn {
    speak: (text: string) => Promise<void>;
    stop: () => void;
    isPlaying: boolean;
    isLoading: boolean;
    error: string | null;
    audioContext: AudioContext | null;
    analyser: AnalyserNode | null;
}

/**
 * DEFRAG // TTS Hook
 * Integrates with Gemini TTS via /api/proxy-voice
 * Provides audio context and analyser for visualization
 */
export function useTTS(): UseTTSReturn {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<AudioBufferSourceNode | null>(null);
    const currentAudioRef = useRef<HTMLAudioElement | null>(null);

    const initAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 256;
            analyserRef.current.connect(audioContextRef.current.destination);
        }
        return { audioContext: audioContextRef.current, analyser: analyserRef.current };
    }, []);

    const stop = useCallback(() => {
        if (sourceRef.current) {
            try {
                sourceRef.current.stop();
            } catch (e) {
                // Already stopped
            }
            sourceRef.current = null;
        }
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }
        setIsPlaying(false);
    }, []);

    const speak = useCallback(async (text: string) => {
        if (!text.trim()) return;

        stop(); // Stop any current playback
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/proxy-voice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error('TTS generation failed');
            }

            const data = await response.json();

            if (!data.audio) {
                throw new Error('No audio data received');
            }

            // Decode base64 audio
            const { audioContext, analyser } = initAudioContext();

            // Convert base64 to ArrayBuffer
            const binaryString = atob(data.audio);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // Try to decode as audio buffer
            try {
                const audioBuffer = await audioContext.decodeAudioData(bytes.buffer);

                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(analyser!);

                sourceRef.current = source;

                source.onended = () => {
                    setIsPlaying(false);
                    sourceRef.current = null;
                };

                setIsPlaying(true);
                setIsLoading(false);
                source.start(0);
            } catch (decodeError) {
                // Fallback: try as raw WAV/MP3 via Audio element
                const blob = new Blob([bytes], { type: 'audio/wav' });
                const url = URL.createObjectURL(blob);
                const audio = new Audio(url);

                currentAudioRef.current = audio;

                audio.onended = () => {
                    setIsPlaying(false);
                    URL.revokeObjectURL(url);
                    currentAudioRef.current = null;
                };

                audio.onerror = () => {
                    setError('Audio playback failed');
                    setIsPlaying(false);
                    URL.revokeObjectURL(url);
                };

                setIsPlaying(true);
                setIsLoading(false);
                await audio.play();
            }

        } catch (err: any) {
            console.error('[DEFRAG TTS]', err);
            setError(err.message || 'TTS failed');
            setIsLoading(false);
            setIsPlaying(false);
        }
    }, [stop, initAudioContext]);

    return {
        speak,
        stop,
        isPlaying,
        isLoading,
        error,
        audioContext: audioContextRef.current,
        analyser: analyserRef.current,
    };
}
