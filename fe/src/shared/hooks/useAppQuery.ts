import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { ApiError } from '@/shared/types'

/**
 * Custom hook wrapping TanStack Query's useQuery with app-specific defaults
 * Provides consistent error handling and type safety across the app
 * 
 * @param queryKey - Unique key for this query (e.g., ['users', 'list'] or ['products', id])
 * @param queryFn - Async function that fetches data
 * @param options - Additional TanStack Query options
 * @returns UseQueryResult with data, error, isLoading, etc.
 */
export function useAppQuery<TData = unknown, TError = ApiError>(
  queryKey: unknown[],
  queryFn: () => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, unknown[]>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<TData, TError> {
  return useQuery<TData, TError, TData, unknown[]>({
    queryKey,
    queryFn,
    ...options,
  })
}
