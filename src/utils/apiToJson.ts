import fs from 'fs';

import fetcher from '@/libs/fetcher.ts';

export const fetchAllFromTable = async (table: string) => {
  const ALL_ENTRIES = 100000;

  const urls = await fetcher(`https://pokeapi.co/api/v2/${table}?limit=${ALL_ENTRIES}`)
    .then(({ results }) => results.map(({ url }: { url: string }) => url));

  if (!Array.isArray(urls)) {
    return;
  }

  const entries = [];

  for (let i = 0; i < urls.length; i += 50) {
    entries.push(...(await Promise.all(urls.slice(i, i + 50).map(fetcher))));
  }

  fs.writeFileSync(`${table}.json`, JSON.stringify(entries));
};
