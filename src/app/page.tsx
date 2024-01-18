import React, { Suspense } from 'react';

import Search from '@/app/components/Search.tsx';
import Grid from '@/app/components/Grid.tsx';

export default function Home({ searchParams }: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <>
      <Search />
      <Suspense key={query} fallback={<div>Loading...</div>}>
        <Grid query={query} />
      </Suspense>
    </>
  );
}

Home.defaultProps = { searchParams: {} };
