import prisma from './contexts/dynamic-context';
import secondPrisma from './contexts/dev';
import { createUser, updateUsername } from './with-dynamic-context';
import { CreateUser } from './with-dynamic-context';
import { PrismaClient } from '@prisma/client';

const e2eTest = async () => {
  try {
    const user: CreateUser = {
      name: 'Tomas Anderson',
      email: 'neo@nebuchadnezzar.sion',
      acceptTermsAndConditions: true,
    };

    console.log('Creating user 😎');
    const { id } = await createUser(user);

    console.log('Editing user 💊');
    const editedUser = await updateUsername({ id, ...user, name: 'Neo' });
    const updatedUser = await prisma.user.findFirst({ where: { name: 'Neo' } });

    if (
      updatedUser &&
      editedUser.id !== updatedUser.id &&
      editedUser.email !== updatedUser.email
    ) {
      throw new Error('Wrong id or email');
    }

    console.log(`Removing user 📞`);
    const deleted = await prisma.user.delete({ where: { id } });

    if (!deleted) {
      throw new Error('Unable to delete user.');
    }

    console.log(`User deleted 🐈‍⬛`);

    console.log('Check if prisma is singleton');
    prisma === secondPrisma && prisma !== new PrismaClient()
      ? console.log('🚀 YES')
      : console.log('🚫 NO');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

e2eTest().then(() => console.log('Prisma working 👍'));
