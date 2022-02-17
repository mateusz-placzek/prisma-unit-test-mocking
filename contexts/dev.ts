import { PrismaClient } from '@prisma/client';

// export type Context = {
//   prisma: PrismaClient;
// };

// export const createContext = (): Context => {
//   return {
    // prisma: new PrismaClient(),
//   };
// };
const prisma = new PrismaClient();
export default prisma; //: new PrismaClient(),
