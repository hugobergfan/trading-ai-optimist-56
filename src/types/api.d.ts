
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

// Alpaca API types
declare namespace Alpaca {
  interface Account {
    id: string;
    account_number: string;
    status: string;
    currency: string;
    buying_power: string;
    cash: string;
    portfolio_value: string;
    pattern_day_trader: boolean;
    trading_blocked: boolean;
    transfers_blocked: boolean;
    account_blocked: boolean;
    created_at: string;
    trade_suspended_by_user: boolean;
    multiplier: string;
    equity: string;
    last_equity: string;
    long_market_value: string;
    short_market_value: string;
    initial_margin: string;
    maintenance_margin: string;
    daytrade_count: number;
    last_maintenance_margin: string;
    daytrading_buying_power: string;
    regt_buying_power: string;
  }

  interface Bar {
    t: string; // timestamp
    o: number; // open
    h: number; // high
    l: number; // low
    c: number; // close
    v: number; // volume
  }

  interface HistoricalBarsRequest {
    symbols: string | string[];
    timeframe: string; // e.g., "1D", "1H", "5Min"
    start?: string;
    end?: string;
    limit?: number;
    adjustment?: 'raw' | 'split' | 'dividend' | 'all';
    feed?: 'iex' | 'sip' | 'delayed_sip';
  }

  interface HistoricalBarsResponse {
    bars: { [symbol: string]: Bar[] };
    next_page_token?: string;
  }

  interface NewsItem {
    id: number;
    headline: string;
    summary: string;
    author: string;
    created_at: string;
    updated_at: string;
    url: string;
    content: string;
    symbols: string[];
    source: string;
  }

  interface NewsRequest {
    symbols?: string[];
    start?: string;
    end?: string;
    limit?: number;
    sort?: 'asc' | 'desc';
  }
}
