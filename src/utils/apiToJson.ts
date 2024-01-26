import fs from 'fs';

import fetcher from '@/libs/fetcher.ts';

export const fetchAllFromTable = async (table: string) => {
  const ALL_ENTRIES = 100000;

  const urls = await fetcher(`https://pokeapi.co/api/v2/${table}?limit=${ALL_ENTRIES}`)
    .then(({
      results,
    }) => results.map(({
      url,
    }: { url: string }) => url));

  if (!Array.isArray(urls)) {
    return;
  }

  const entries = [];

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < urls.length; i += 50) {
    entries.push(...(await Promise.all(urls.slice(i, i + 50).map(fetcher))));
  }

  fs.writeFileSync(`./src/api-data/${table}.json`, JSON.stringify(entries));
};

export const fetchAll = async () => {
  const tables = await fetcher('https://pokeapi.co/api/v2');

  /* eslint-disable no-restricted-syntax */
  for (const table of Object.keys(tables)) {
    if (!fs.existsSync(`./src/api-data/${table}.json`)) {
      await fetchAllFromTable(table);
    }
  }
};
