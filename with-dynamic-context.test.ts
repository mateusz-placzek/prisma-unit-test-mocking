import { createUser, updateUsername } from './with-dynamic-context';
import prisma from './contexts/dynamic-context';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';

let mockedPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prisma);
  mockedPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;
});

const user = {
  id: 1,
  name: 'Rich',
  email: 'hello@prisma.io',
  acceptTermsAndConditions: true,
};

describe('Test users with dependency injection', () => {
  test('should mock prisma response to user', async () => {
    mockedPrisma.user.create.mockResolvedValue(user);
    const agentSmith = {
      data: {
        id: Math.floor(Math.random() * 100000),
        name: 'Smith',
        email: 'mr@anderson.shout',
        acceptTermsAndConditions: true,
      },
    };
    const x = async () => mockedPrisma.user.create(agentSmith);
    await expect(x()).resolves.toEqual(user);
  });

  test('should create new user ', async () => {
    mockedPrisma.user.create.mockResolvedValue(user);

    await expect(createUser(user)).resolves.toEqual(user);
  });

  test('should update a users name ', async () => {
    const updatedUser = {
      ...user,
      name: 'John Rich',
    };

    mockedPrisma.user.update.mockResolvedValue(updatedUser);
    await expect(updateUsername(updatedUser)).resolves.toEqual(updatedUser);
  });

  test('should fail if user does not accept terms', async () => {
    const falseUser = {
      ...user,
      acceptTermsAndConditions: false,
    };
    const mockedError = new Error('User must accept terms!');

    mockedPrisma.user.create.mockRejectedValue(mockedError);
    await expect(createUser(falseUser)).rejects.toEqual(mockedError);
  });
});
