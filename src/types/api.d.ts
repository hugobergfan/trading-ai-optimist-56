
// OpenAI API types
declare namespace OpenAI {
  interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }

  interface ChatCompletionRequest {
    model: string;
    messages: Message[];
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
  }

  interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
      index: number;
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
    }[];
  }
}

// ElevenLabs API types
declare namespace ElevenLabs {
  interface VoiceSettings {
    stability: number;
    similarity_boost: number;
    style?: number;
    use_speaker_boost?: boolean;
  }

  interface TextToSpeechRequest {
    text: string;
    model_id: string;
    voice_settings: VoiceSettings;
  }

  interface Voice {
    voice_id: string;
    name: string;
    category?: string;
  }

  interface VoicesResponse {
    voices: Voice[];
  }
}
