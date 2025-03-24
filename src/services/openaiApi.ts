
// OpenAI API service
import { toast } from "sonner";

const API_KEY = "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";

type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type ChatCompletionResponse = {
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
};

export const openaiApi = {
  /**
   * Generates a chat completion with GPT-4o-mini
   */
  generateCompletion: async (messages: OpenAIMessage[], temperature: number = 0.7): Promise<string | null> => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          temperature,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API error:', errorData);
        toast.error('Failed to generate text with OpenAI');
        return null;
      }

      const data: ChatCompletionResponse = await response.json();
      return data.choices[0]?.message?.content || null;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      toast.error('Error connecting to OpenAI');
      return null;
    }
  },

  /**
   * Analyzes a stock ticker using GPT model
   */
  analyzeStockTicker: async (ticker: string, stockData: any): Promise<string | null> => {
    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: 'You are a financial analyst specialized in stock market predictions. Provide a concise analysis based on the given stock data.'
      },
      {
        role: 'user',
        content: `Analyze the following stock data for ${ticker}:\n${JSON.stringify(stockData, null, 2)}\n\nProvide a brief analysis about the potential performance of this stock.`
      }
    ];

    return openaiApi.generateCompletion(messages, 0.5);
  },
  
  /**
   * Generates a market overview analysis based on market barometer data
   */
  generateMarketOverview: async (marketData: any): Promise<string | null> => {
    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: 'You are a market analyst providing insights on overall market trends. Keep your analysis concise and focused on key indicators.'
      },
      {
        role: 'user',
        content: `Based on the following market data, provide a brief market overview and outlook:\n${JSON.stringify(marketData, null, 2)}`
      }
    ];

    return openaiApi.generateCompletion(messages, 0.5);
  }
};

export default openaiApi;
