import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const usePokemonNames = () => {
  const { data, error, isLoading } = useSwr('/api/pokemon', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default usePokemonNames;