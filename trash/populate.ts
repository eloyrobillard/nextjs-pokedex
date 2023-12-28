import { PrismaClient } from '@prisma/client'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { Type } from '@sinclair/typebox'

// ===================
// POKEMON
// ===================

const PokemonBatch = TypeCompiler.Compile(Type.Object({
  count: Type.Number(),
  results: Type.Array(Type.Object({
    name: Type.String(),
    url: Type.String()
  }))
}))

const parsePokemonBatch = (input: unknown) => PokemonBatch.Check(input) ? input : null

const getPokemons = async (count: number): Promise<{ name: string, url: string }[]> => {
  const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}`)
    .then(res => res.json())
    .then(data => parsePokemonBatch(data))

  return pokemons?.results ?? []
}

// ===================
// PRISMA
// ===================

const prisma = new PrismaClient()

async function main() {
  const count = await prisma.pokemon.count()

  // populate DB if first time or empty
  if (count === 0) {
    // 27/12/23: current number of pokemon entries is 1302, so it should take a few more decades to reach 2000
    const MAX_COUNT_WITH_LEEWAY = 2000

    const allPokemon = await getPokemons(MAX_COUNT_WITH_LEEWAY)

    await prisma.pokemon.createMany({ data: allPokemon })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })