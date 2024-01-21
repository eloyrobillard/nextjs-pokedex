import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Type as T } from '@sinclair/typebox';
import { NameAndUrl } from '@/type-builders/common.ts';

export const ChainT = T.Recursive(This => T.Object({
  evolution_details: T.Array(T.Object({
    gender: T.Union([T.Number(), T.Null()]),
    held_item: T.Union([NameAndUrl, T.Null()]),
    item: T.Union([NameAndUrl, T.Null()]),
    known_move: T.Union([NameAndUrl, T.Null()]),
    known_move_type: T.Union([NameAndUrl, T.Null()]),
    location: T.Union([NameAndUrl, T.Null()]),
    min_affection: T.Union([T.Number(), T.Null()]),
    min_beauty: T.Union([T.Number(), T.Null()]),
    min_happiness: T.Union([T.Number(), T.Null()]),
    min_level: T.Union([T.Number(), T.Null()]),
    needs_overworld_rain: T.Boolean(),
    party_species: T.Union([NameAndUrl, T.Null()]),
    party_type: T.Union([NameAndUrl, T.Null()]),
    relative_physical_stats: T.Union([T.Number(), T.Null()]),
    time_of_day: T.String(),
    trade_species: T.Union([NameAndUrl, T.Null()]),
    trigger: T.Union([NameAndUrl, T.Null()]),
    turn_upside_down: T.Boolean(),
  })),
  evolves_to: T.Array(This),
  is_baby: T.Boolean(),
  species: NameAndUrl,
}));

export const EvolutionChainParser = TypeCompiler.Compile(T.Object({
  baby_trigger_item: T.Union([NameAndUrl, T.Null()]),
  chain: ChainT,
  id: T.Number(),
}));
