import { PrismaClient } from '@prisma/client'

// ===================
// RESULT
// ===================

type Result<T> = Ok<T> | Error

type Ok<T> = { type: 'ok', data: T }
type Error = { type: 'error', error: string }

const ok = <T>(data: T): Ok<T> => ({ type: 'ok', data })
const error = (error: string): Error => ({ type: 'error', error })

const isOk = <T>(res: Result<T>): res is Ok<T> => res.type === 'ok'

/**
 * Returns data if `res` is Ok, or `def` otherwise
 *
 * @returns T
 */
const orDefault = <T>(res: Result<T>, def: T) => res.type === 'ok' ? res.data : def

/**
 * Collects data from any Ok value in an array of Results.
 * Also acts as a filter for Error values.
 *
 * @returns {T[]}
 */
const collectData = <T>(resAr: Result<T>[]) => resAr.filter(isOk).map(cur => cur.data)

// ===================
// POKEMON
// ===================

type Pokemon = { id: number, name: string }

type PokemonBatch = {
  count: number
  results: { name: string }[]
}

const isPokemonName = (input: unknown): input is Pokemon => input instanceof Object && 'name' in input && typeof input.name === 'string'

const parsePokemonName = (input: unknown): Result<{ name: string }> =>
  isPokemonName(input) ? ok(input) : error('Failed to parse pokemon name')

const isPokemonBatchLike = (input: unknown): input is PokemonBatch =>
  input instanceof Object && 'count' in input && typeof input.count === 'number' && 'results' in input && Array.isArray(input.results)

const parsePokemonBatch = (input: unknown): Result<PokemonBatch> => {
  if (isPokemonBatchLike(input)) {
    // filter out fields we couldn't parse
    const results = collectData(input.results.map(parsePokemonName))

    return ok({ count: input.count, results: results })
  }

  return error('Failed to parse pokemon batch.')
}

const getPokemonCount = () =>
  fetch(`https://pokeapi.co/api/v2/pokemon`)
    .then(res => res.json())
    .then(data => orDefault(parsePokemonBatch(data), { count: 0, results: [] }).count)

const getAllPokemon = async (): Promise<Pokemon[]> => {
  const count = await getPokemonCount()

  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}`)
    .then(res => res.json())
    .then(data => parsePokemonBatch(data))

  if (pokemon.type === 'ok')
    // using index for id field, for now doesn't matter if the order is correct
    return pokemon.data.results.map(({ name }, i) => ({ id: i, name }))
  else
    return []
}

// ===================
// PRISMA
// ===================

const prisma = new PrismaClient()

async function main() {
  const count = await prisma.pokemon.count()

  // populate DB if first time / empty
  if (count === 0) {
    const allPokemon = await getAllPokemon()

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