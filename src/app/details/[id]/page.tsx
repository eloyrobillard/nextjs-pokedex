import React from 'react';
import Image from 'next/image';

import LongIcon from '@/components/LongIcon.tsx';
import Gauge from '@/app/components/Gauge.tsx';
import PokedexEntries from '@/app/components/PokedexEntries.tsx';

// used for perspective effect
import './style.css';

const getData = async (id: number) => {
  // request pokémon + species data by id
  const pokemon = await prismadb.pokemon.findUnique({
    where: { id },
    include: {
      forms: true, stats: true,
    },
  });

  if (pokemon === null) {
    return { error: 'Missing pokémon data' } as const;
  }

  const species = await prismadb.species.findUnique({
    where: { id },
    include: {
      flavorTextEntries: true, genera: true,
    },
  });

  if (species === null) {
    return { error: 'Missing species data' } as const;
  }

  const evolutionChain = await prismadb.evolutionChain.findUnique({
    where: { id: species.evolutionChainId },
  });

  if (species === null) {
    return { error: 'Missing species data' } as const;
  }

  return {
    data: {
      pokemon,
      species,
    },
  } as const;
};

async function Details({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const { data, error } = await getData(id);

  if (error) {
    return <div>{error}</div>;
  }

  const { pokemon, species } = data;

  const maxStat = Math.max(...pokemon.stats.map(({ baseStat }) => baseStat));

  return (
    <>
      <div
        style={{ backgroundColor: species.color }}
        className='w-[100%] h-[5vh] sticky top-0 flex justify-center drop-shadow-md mb-[1rem]'
      />
      <div className='bg-white text-black w-[90vw] m-auto'>
        {/* name, genus (top side) */}
        <div className='text-center flex flex-col justify-between items-center'>
          <p className='uppercase text-[#6d6d6d] text-5xl'>{pokemon.name}</p>
          <PokedexEntries pokemon={pokemon} species={species} />
        </div>
        <div className='h-[80vh] grid grid-cols-3 items-center'>
          {/* various details (left side) */}
          <div className='perspective'>
            <div className='grid grid-cols-2 h-[250px] rotateY-counterclockwise hover:rotate-0 transition'>
              <div className='grid grid-rows-6 items-end text-right mr-[1rem] font-medium'>
                <div>ID</div>
                <div>Height</div>
                <div>Weight</div>
                <div>Abilities</div>
                <div>Type</div>
                <div>Forms</div>
              </div>
              <div className='grid grid-rows-6 items-end font-extralight'>
                <div>
                  #
                  {pokemon.id}
                </div>
                <div>
                  {pokemon.height / 10}
                  m
                </div>
                <div>
                  {pokemon.weight / 10}
                  kg
                </div>
                <div className='flex'>
                  {pokemon.abilities.map(ability => (
                    <div
                      key={ability}
                      style={{ backgroundColor: species.color }}
                      className='h-[30px] mr-[10px] p-1 rounded-md text-white font-medium uppercase'
                    >
                      {/*
                       * hyphens get automatically carriage returned
                       * replacing with non-breaking hyphen
                       * LINK https://stackoverflow.com/a/48980952
                       */}
                      {ability.replace(/-/, '−')}
                    </div>
                  ))}
                </div>
                <div className='flex'>
                  <LongIcon type={pokemon.type1} />
                  {pokemon.type2 && <LongIcon type={pokemon.type2} />}
                </div>
                <div className='flex'>
                  {pokemon.forms.map(({ name }) => (
                    <div
                      key={name}
                      style={{ backgroundColor: species.color }}
                      className='h-[30px] mr-[10px] p-1 items-start rounded-md text-white font-medium uppercase'
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Image
            src={`/imagesHQ/${pokemon.id.toString().padStart(3, '0')}.png`}
            alt={pokemon.name}
            width={500}
            height={500}
            className='m-auto'
          />
          {/* pokemon stats (right side) */}
          <div className='perspective'>
            <div className='grid grid-cols-2 h-[250px] rotateY-clockwise hover:rotate-0 transition'>
              <div className='grid grid-rows-7 items-end text-right mr-[1rem] font-medium'>
                <div>HP</div>
                <div>Attack</div>
                <div>Defence</div>
                <div>Sp. Attack</div>
                <div>Sp. Defence</div>
                <div>Speed</div>
                <div>Total</div>
              </div>
              <div className='grid grid-rows-7 items-end font-extralight'>
                {pokemon.stats.map(({ id, baseStat }) => (
                  <Gauge key={id} color={species.color} max={maxStat} stat={baseStat} />
                ))}
                {/* base stats total */}
                <div>
                  {pokemon.stats.reduce((acc, { baseStat }) => acc + baseStat, 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Evolution chain */}
        <div className='font-medium m-auto flex'>
          <div
            style={{ backgroundColor: species.color }}
            className='h-[30px] m-auto p-1 flex justify-between rounded-md text-white capitalize'
          >
            Evolution Chain
          </div>
          <div>
            {species.evolutionChainId}
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
