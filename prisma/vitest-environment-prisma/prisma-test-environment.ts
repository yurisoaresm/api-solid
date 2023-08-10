import 'dotenv/config';

import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { randomUUID } from 'node:crypto';
import { Environment } from 'vitest';

import { prisma } from '@/lib/prisma';

const primsa = new PrismaClient();

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL is not set. Provide it as an environment variable.',
    );
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schema);

  return url.toString();
}

export default {
  name: 'prisma',
  async setup() {
    const schema = randomUUID();
    const databaseUrl = generateDatabaseUrl(schema);

    process.env.DATABASE_URL = databaseUrl;

    execSync(`npx prisma migrate deploy`);

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE;`,
        );
        await prisma.$disconnect();
      },
    };
  },
} as Environment;
