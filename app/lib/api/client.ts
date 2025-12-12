// API Client for backend Golang integration

import { APIError, createAPIError } from '../utils/errors';

// For server-side rendering in Docker, use service name
// For client-side, use NEXT_PUBLIC_API_BASE
// API_BASE_URL is for server-side (Docker internal network)
// NEXT_PUBLIC_API_BASE is for client-side (browser)
const getAPIBaseURL = (): string => {
  if (typeof window === 'undefined') {
    // Server-side: prefer API_BASE_URL (Docker internal), fallback to NEXT_PUBLIC_API_BASE
    const url = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE;
    if (!url) {
      throw new Error('API_BASE_URL or NEXT_PUBLIC_API_BASE environment variable is required for server-side');
    }
    return url;
  } else {
    // Client-side: use NEXT_PUBLIC_API_BASE
    const url = process.env.NEXT_PUBLIC_API_BASE;
    if (!url) {
      throw new Error('NEXT_PUBLIC_API_BASE environment variable is required for client-side');
    }
    return url;
  }
};

class APIClient {
  private baseURL: string | null = null;

  private getBaseURL(): string {
    if (this.baseURL === null) {
      this.baseURL = getAPIBaseURL();
    }
    return this.baseURL;
  }

  constructor() {
    // Lazy initialization - don't throw error at module load time
    // Will throw when first request is made if env var is missing
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.getBaseURL()}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different HTTP status codes
      if (!response.ok) {
        let errorData: any = {};
        let errorMessage = `API Error: ${response.statusText}`;
        
        try {
          errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = response.statusText || `HTTP ${response.status}`;
        }

        // Create specific error based on status code
        throw createAPIError(
          errorMessage,
          response.status,
          response.statusText,
          errorData
        );
      }

      const data = await response.json();
      
      // Handle API response wrapper
      if (data.success !== undefined) {
        if (!data.success) {
          throw createAPIError(
            data.error || data.message || 'API request failed',
            400, // Treat as bad request if success is false
            'Bad Request',
            data
          );
        }
        return data.data as T;
      }
      
      return data as T;
    } catch (error) {
      // Re-throw APIError as-is
      if (error instanceof APIError) {
        throw error;
      }
      
      // Handle network errors (fetch failed, CORS, etc.)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw createAPIError(
          'Network error: Unable to connect to the server. Please check if the backend is running.',
          0,
          'Network Error'
        );
      }
      
      // Handle other errors
      if (error instanceof Error) {
        throw createAPIError(
          error.message,
          0,
          'Unknown Error'
        );
      }
      
      throw createAPIError(
        'Unknown error occurred',
        0,
        'Unknown Error'
      );
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }
}

// Lazy initialization - create instance only when needed
let _apiClient: APIClient | null = null;

export const apiClient = {
  get: <T>(endpoint: string): Promise<T> => {
    if (!_apiClient) {
      _apiClient = new APIClient();
    }
    return _apiClient.get<T>(endpoint);
  },
};

