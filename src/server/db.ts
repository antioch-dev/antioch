import { PrismaClient } from '@prisma/client';
import { env } from '@/env';

declare global {
  // eslint-disable-next-line no-var -- `var` is required for global declarations in this context
  var prisma: PrismaClient | undefined;
}

const prismaClient = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Use global object caching in development (HMR safe)
export const db = global.prisma ?? prismaClient;

if (env.NODE_ENV !== 'production') {
  global.prisma = db;
}


