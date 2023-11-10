// prisma.d.ts

// Import the PrismaClient type from the Prisma package.
import { PrismaClient } from '@prisma/client';

// Augment the global object to include the PrismaClient type.
declare global {
  var prisma: PrismaClient;
}
