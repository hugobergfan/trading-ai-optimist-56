
// ElevenLabs API service
import { toast } from "sonner";

const API_KEY = "sk_c9d872ce60d4218a5b7cd6beaddcd0e5ccaec24ac28d082e";

type VoiceSettings = {
  stability: number;
  similarity_boost: number;
  style?: number;
  use_speaker_boost?: boolean;
};

type TextToSpeechOptions = {
  model_id?: string;
  voice_settings?: VoiceSettings;
};

// Default voice settings
const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  stability: 0.5,
  similarity_boost: 0.75,
  use_speaker_boost: true
};

// Available voice IDs
export const VOICE_IDS = {
  ROGER: "CwhRBWXzGAHq8TQ4Fs17",
  SARAH: "EXAVITQu4vr4xnSDxMaL",
  CHARLIE: "IKne3meq5aSn9XLyUdCD",
  JESSICA: "cgSgspJ2msm6clMCkdW9",
  BRIAN: "nPczCjzI2devNBz1zQrb"
};

// Available models
export const MODELS = {
  MULTILINGUAL_V2: "eleven_multilingual_v2",
  TURBO_V2: "eleven_turbo_v2"
};

export const elevenlabsApi = {
  /**
   * Converts text to speech using ElevenLabs API
   */
  textToSpeech: async (
    text: string,
    voiceId: string = VOICE_IDS.BRIAN,
    options: TextToSpeechOptions = {}
  ): Promise<ArrayBuffer | null> => {
    try {
      const modelId = options.model_id || MODELS.MULTILINGUAL_V2;
      const voiceSettings = options.voice_settings || DEFAULT_VOICE_SETTINGS;

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': API_KEY
        },
        body: JSON.stringify({
          text,
          model_id: modelId,
          voice_settings: voiceSettings
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('ElevenLabs API error:', errorData);
        toast.error('Failed to convert text to speech');
        return null;
      }

      return await response.arrayBuffer();
    } catch (error) {
      console.error('Error calling ElevenLabs API:', error);
      toast.error('Error connecting to ElevenLabs');
      return null;
    }
  },

  /**
   * Plays audio from ArrayBuffer
   */
  playAudio: (audioData: ArrayBuffer): HTMLAudioElement => {
    const blob = new Blob([audioData], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    
    audio.onended = () => {
      URL.revokeObjectURL(url);
    };
    
    audio.play();
    return audio;
  },

  /**
   * Converts text to speech and plays it immediately
   */
  speakText: async (
    text: string,
    voiceId: string = VOICE_IDS.BRIAN,
    options: TextToSpeechOptions = {}
  ): Promise<HTMLAudioElement | null> => {
    const audioData = await elevenlabsApi.textToSpeech(text, voiceId, options);
    
    if (!audioData) {
      return null;
    }
    
    return elevenlabsApi.playAudio(audioData);
  }
};

export default elevenlabsApi;
