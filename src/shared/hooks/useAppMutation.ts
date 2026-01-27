import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { ApiError } from '@/shared/types'

/**
 * Custom hook wrapping TanStack Query's useMutation with app-specific defaults
 * Provides consistent error handling and type safety for data mutations
 * 
 * @param mutationFn - Async function that performs the mutation
 * @param options - Additional TanStack Query mutation options
 * @returns UseMutationResult with mutate, mutateAsync, isLoading, error, etc.
 */
export function useAppMutation<
  TData = unknown,
  TError = ApiError,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn'
  >
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options,
  })
}
