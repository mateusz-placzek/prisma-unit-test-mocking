import { PrismaClient } from '@prisma/client';
import { createMockContext } from './test';
import prisma from './dev';

export const isTestMode = () =>
  process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'test';

const { prisma: mockedPrisma } = createMockContext();
const prismaClient = isTestMode() ? mockedPrisma as unknown as PrismaClient : prisma;

export default prismaClient;
