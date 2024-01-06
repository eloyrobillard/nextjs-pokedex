import useSwr from 'swr';

import fetcher from '@/libs/fetcher.ts';
import { PokemonV2 } from '@/types/pokemon.ts';

export const usePokemon =
  (id: string): { pokemon: PokemonV2, error: unknown, isLoading: boolean } => {
    const { data, error, isLoading } = useSwr(`/api/pokemon/${id}`, fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });
    return {
      pokemon: data,
      error,
      isLoading,
    };
  };
