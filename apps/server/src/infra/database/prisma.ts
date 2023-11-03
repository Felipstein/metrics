import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({ log: ['query'] });

export async function testConnection() {
  try {
    await prisma.$connect();
    console.info('Database connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
