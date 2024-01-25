import React from 'react';
import Image from 'next/image';

import LongIcon from '@/components/LongIcon.tsx';
import Gauge from '@/app/components/Gauge.tsx';
import PokedexEntries from '@/app/components/PokedexEntries.tsx';
import Icon from '@/components/Icon.tsx';
import { Chain } from '@/types/evolutionChain.ts';
import { PokemonV2 } from '@/types/pokemon.ts';

// used for perspective effect
import './style.css';
import { Species } from '@/types/species.ts';

const getEvolutionTrigger = (ev: Chain) => {
  if (ev.minLevel) {
    return `Level ${ev.minLevel}+`;
  }

  return '<trigger not implemented yet>';
};

const getData = async (id: number) => {
  // request pokémon + species data by id
  const species = await prismadb.species.findUnique({
    where: { id },
    include: {
      evolutionChain: {
        include: {
          chain: {
            include: {
              species: {
                include: {
                  pokemon: true,
                },
              },
            },
          },
        },
      },
      flavorTextEntries: true,
      genera: true,
      pokemon: {
        include: {
          forms: true,
          stats: true,
        },
      },
    },
  });

  if (species === null) {
    return { error: 'Missing species data' } as const;
  }

  return { species } as const;
};

async function Details({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const { species, error } = await getData(id);

  if (error) {
    return <div>{error}</div>;
  }

  const { evolutionChain, pokemon } = species;

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
          <PokedexEntries species={species} />
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
        {evolutionChain.chain.length > 1 ? (
          <div className='font-medium m-auto flex flex-col'>
            <div
              style={{ backgroundColor: species.color }}
              className='h-[30px] m-auto p-1 flex justify-between rounded-md text-white capitalize'
            >
              Evolution Chain
            </div>
            <div className='mt-5 flex justify-around items-center'>
              {evolutionChain.chain.reduce((acc, ch) => {
                if (ch.trigger) {
                  return [...acc, { ...ch, species: species.name }, ch.species];
                }

                return [...acc, ch.species];
              }, [] as (Chain | (Species & { pokemon: PokemonV2}))[]).map(el => {
                const isChain = (el: Chain | Species): el is Chain => Object.prototype.hasOwnProperty.call(el, 'trigger');

                if (el && isChain(el)) {
                  // `el` is an object with evolution chain details
                  return (
                    <div key={el.id}>
                      <p>{getEvolutionTrigger(el)}</p>
                      <Image src='/right-arrow.png' alt='right arrow' width={50} height={50} />
                    </div>
                  );
                }

                const { pokemon: evolution } = el;

                return (
                  <div key={evolution.id} className='flex flex-col'>
                    <Image
                      src={`/imagesHQ/${evolution.id.toString().padStart(3, '0')}.png`}
                      alt={evolution.name}
                      width={100}
                      height={100}
                      className='m-auto'
                    />
                    <p className='text-center'>
                      #
                      {evolution.id}
                    </p>
                    <div
                      style={{ backgroundColor: species.color }}
                      className='p-[1px] rounded-[0.2rem] text-white text-center font-medium uppercase'
                    >
                      {evolution.name}
                    </div>
                    <div className='flex justify-around m-2'>
                      <Icon type={evolution.type1} />
                      {evolution.type2 && <Icon type={evolution.type2} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Details;
