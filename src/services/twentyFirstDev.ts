
const API_KEY = '09f988923ea7ce766b5d186cc294bd773cf733d0ea86658433c052d79fadf612';
const API_BASE_URL = 'https://api.21st.dev';

export interface ComponentSearchResult {
  name: string;
  preview_url: string;
  video_url: string;
  demo_id: number;
  component_data: {
    name: string;
    description: string;
    code: string;
    install_command: string;
  };
  component_user_data: {
    name: string;
    username: string;
    image_url: string;
  };
  usage_count: number;
}

export interface SearchResponse {
  results: ComponentSearchResult[];
  metadata: {
    plan: string;
    requests_remaining: number;
    pagination: {
      total: number;
      page: number;
      per_page: number;
      total_pages: number;
    };
  };
}

export interface PromptResponse {
  prompt: string;
}

export const twentyFirstDevApi = {
  searchComponents: async (
    query: string,
    page: number = 1,
    perPage: number = 20
  ): Promise<SearchResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          search: query,
          page,
          per_page: perPage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to search components');
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching components:', error);
      throw error;
    }
  },

  generatePrompt: async (
    demoId: number,
    promptType: 'lovable' | 'basic' | 'sitebrew' | 'v0' | 'bolt' | 'extended' | 'replit' | 'magic_patterns' = 'lovable'
  ): Promise<PromptResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/prompts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          prompt_type: promptType,
          demo_id: demoId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate prompt');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating prompt:', error);
      throw error;
    }
  },
};

export default twentyFirstDevApi;
