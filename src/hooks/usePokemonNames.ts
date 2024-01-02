import useSwr from 'swr';

import fetcher from '@/libs/fetcher.ts';

export const usePokemonNames = (): { data: string[], error: unknown, isLoading: boolean } => {
  const { data, error, isLoading } = useSwr('/api/pokemon/names', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
  };
};
