import useSwr from 'swr';

import fetcher from '@/libs/fetcher.ts';
import { MinimalPokemon } from '@/types/pokemon.ts';

export const usePokemon =
  (name: string): { data: MinimalPokemon, error: unknown, isLoading: boolean } => {
    const { data, error, isLoading } = useSwr(`/api/pokemon/${name}`, fetcher, {
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