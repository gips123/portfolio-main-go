// Error handling utilities

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public statusText: string,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }

  getErrorMessage(): string {
    switch (this.statusCode) {
      case 400:
        return 'Bad Request: Invalid data provided';
      case 401:
        return 'Unauthorized: Please check your authentication';
      case 403:
        return 'Forbidden: You do not have permission to access this resource';
      case 404:
        return 'Not Found: The requested resource was not found';
      case 500:
        return 'Internal Server Error: Something went wrong on the server';
      case 502:
        return 'Bad Gateway: The server received an invalid response';
      case 503:
        return 'Service Unavailable: The server is temporarily unavailable';
      case 504:
        return 'Gateway Timeout: The server did not respond in time';
      default:
        return this.message || 'An unexpected error occurred';
    }
  }

  getErrorTitle(): string {
    switch (this.statusCode) {
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not Found';
      case 500:
        return 'Server Error';
      case 502:
        return 'Bad Gateway';
      case 503:
        return 'Service Unavailable';
      case 504:
        return 'Gateway Timeout';
      default:
        return 'Error';
    }
  }

  isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  isServerError(): boolean {
    return this.statusCode >= 500;
  }

  isNetworkError(): boolean {
    return this.statusCode === 0 || !this.statusCode;
  }
}

export function createAPIError(
  message: string,
  statusCode: number,
  statusText: string,
  data?: any
): APIError {
  return new APIError(message, statusCode, statusText, data);
}

