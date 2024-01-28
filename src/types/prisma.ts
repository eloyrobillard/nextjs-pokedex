import { PropUnion } from '@/types/utils.ts';
import { PrismaClient } from '@prisma/client';

export type PrismaClientGetters = { [K in keyof PrismaClient]: (PrismaClient[K] extends Function
  ? never : PrismaClient[K] extends { types: unknown }
    ? never : PrismaClient[K])
  };

export type PrismaClientGettersUnion = PropUnion<PrismaClientGetters>;
