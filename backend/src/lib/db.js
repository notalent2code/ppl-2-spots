import { PrismaClient } from '@prisma/client';
import pagination from 'prisma-extension-pagination';

if (!global.prisma) {
  global.prisma = new PrismaClient().$extends(pagination());
}

export default global.prisma;