import { PrismaClient } from '@prisma/client';
import pagination from 'prisma-extension-pagination';

if (!global.prisma) {
  global.prisma = new PrismaClient().$extends(pagination({
    pages: {
      limit: 10,
      includePageCount: true,
    }
  }));
}

export default global.prisma;