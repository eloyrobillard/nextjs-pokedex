import useSwr from 'swr';

import fetcher from '@/libs/fetcher.ts';
import { Pokemon } from '@/types/pokemon.ts';

export const usePokemon =
  (id: string): { data: Pokemon, error: unknown, isLoading: boolean } => {
    const { data, error, isLoading } = useSwr(`/api/pokemon/${id}`, fetcher, {
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
