import prisma from './contexts/dynamic-context';

export interface CreateUser {
  name: string;
  email: string;
  acceptTermsAndConditions: boolean;
}

export async function createUser(user: CreateUser) {
  console.log('creating user');
  console.log(user);
  if (!user.acceptTermsAndConditions) {
    throw new Error('User must accept terms!');
  }
  return await prisma.user.create({
    data: user,
  });
}

interface UpdateUser {
  id: number;
  name: string;
  email: string;
}

export async function updateUsername(user: UpdateUser) {
  console.log('editing user');
  console.log(user);
  return await prisma.user.update({
    where: { id: user.id },
    data: user,
  });
}
