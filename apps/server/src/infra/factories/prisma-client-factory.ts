import { prisma } from '../database/prisma';

export function createPrismaClient() {
  return prisma;
}
