import useSwr from 'swr';

import fetcher from '@/libs/fetcher.ts';
import { Pokemon } from '@/types/pokemon.ts';

export const usePokemonList = (): { data: Pokemon[], error: unknown, isLoading: boolean } => {
  const { data, error, isLoading } = useSwr('/api/pokemon', fetcher, {
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
