import React from 'react';
import Image from 'next/image';

import LongIcon from '@/components/LongIcon.tsx';
import WithTypeColorBg from '@/components/WithTypeColorBg.tsx';
import Gauge from '@/app/components/Gauge.tsx';

// used for perspective effect
import './style.css';

async function Details({ params }: { params: { id: string } }) {
  // request pokémon + species data by ID
  const pokemon = await prismadb.pokemon.findUnique({
    where: { id: Number(params.id) },
    include: {
      forms: true, stats: true,
    },
  });

  if (pokemon === null) {
    return <div>Missing pokémon data</div>;
  }

  const species = await prismadb.species.findUnique({
    where: { id: pokemon.id },
    include: { genera: true },
  });

  if (species === null) {
    return <div>Missing species data</div>;
  }

  const maxStat = Math.max(...pokemon.stats.map(({ baseStat }) => baseStat));

  return (
    <div className='bg-white text-black w-[95vw]'>
      {/* name, genus (top side) */}
      <div className='text-center flex flex-col justify-between'>
        <h1 className='uppercase text-[#6d6d6d] text-5xl'>{pokemon.name}</h1>
        <WithTypeColorBg type={pokemon.type1}>{species.genera.find(({ language }) => language.startsWith('en'))?.genus}</WithTypeColorBg>
      </div>
      <div className='h-[80vh] grid grid-cols-3 items-center'>
        {/* various details (left side) */}
        <div className='perspective'>
          <div className='grid grid-cols-2 h-[250px] rotateY-counterclockwise hover:rotate-0 transition'>
            <div className='grid grid-rows-6 items-end text-right mr-[1rem] font-medium '>
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
                    className={`
                    ${pokemon.type1}
                    h-[30px]
                    mr-[10px]
                    p-1
                    items-start
                    rounded-md
                    text-white
                    font-medium
                    uppercase
                    `}
                  >
                    {ability}
                  </div>
                ))}
              </div>
              <div className='flex'>
                <LongIcon type={pokemon.type1} />
                {pokemon.type2 && <LongIcon type={pokemon.type2} />}
              </div>
              <div className='flex'>
                {pokemon.forms.map(({ name }) => (
                  <div key={name} className='font-medium uppercase'>
                    <WithTypeColorBg type={pokemon.type1}>{name}</WithTypeColorBg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Image
          src={`/imagesHQ/${pokemon.id.toString().padStart(3, '0')}.png`}
          alt={pokemon.name}
          width={250}
          height={250}
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
                <Gauge key={id} max={maxStat} stat={baseStat} />
              ))}
              {/* base stats total */}
              <div>
                {pokemon.stats.reduce((acc, { baseStat }) => acc + baseStat, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
