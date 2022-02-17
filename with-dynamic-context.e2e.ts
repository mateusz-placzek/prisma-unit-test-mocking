import prisma from './contexts/dynamic-context';
import { createUser, updateUsername } from './with-dynamic-context';
import { CreateUser } from './with-dynamic-context';

const e2eTest = async () => {
  const user: CreateUser = {
    name: 'Tomas Anderson',
    email: 'neo@nebuchadnezzar.sion',
    acceptTermsAndConditions: true,
  }

  const { id } = await createUser(user);
  const editedUser = await updateUsername({ id, ...user, name: 'Neo' });

  const updatedUser = await prisma.user.findFirst({ where: { name: 'Neo' } });

  
  if (updatedUser && editedUser.id !== updatedUser.id && editedUser.email !== updatedUser.email){
    throw new Error ('Wrong id or email');
  }
  prisma.user.delete({ where: { id } });
  
  console.log('Prisma working ok.');
}