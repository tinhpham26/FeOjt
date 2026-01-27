import { AxiosError } from 'axios'
import { ApiError } from '@/shared/types'

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const { response, message } = error

    if (response) {
      return {
        status: response.status,
        message: response.data?.message || message || 'An error occurred',
        code: response.data?.code || `HTTP_${response.status}`,
        details: response.data?.details,
      }
    }

    return {
      status: 0,
      message: message || 'Network error',
      code: error.code || 'NETWORK_ERROR',
    }
  }

  if (error instanceof Error) {
    return {
      status: 0,
      message: error.message,
      code: 'UNKNOWN_ERROR',
    }
  }

  return {
    status: 0,
    message: 'An unknown error occurred',
    code: 'UNKNOWN_ERROR',
  }
}

export function getErrorMessage(error: unknown): string {
  const normalized = normalizeApiError(error)
  return normalized.message
}

export class ApiErrorWithCode extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'ApiErrorWithCode'
  }
}
