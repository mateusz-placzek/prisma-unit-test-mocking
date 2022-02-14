import { Context } from './contexts/test';

interface CreateUser {
  name: string;
  email: string;
  acceptTermsAndConditions: boolean;
}

export async function createUser(user: CreateUser, ctx: Context) {
  if (!user.acceptTermsAndConditions) {
    throw new Error('User must accept terms!');
  }
  return await ctx.prisma.user.create({
    data: user,
  });
}

interface UpdateUser {
  id: number;
  name: string;
  email: string;
}

export async function updateUsername(user: UpdateUser, ctx: Context) {
  return await ctx.prisma.user.update({
    where: { id: user.id },
    data: user,
  });
}
