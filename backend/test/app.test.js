import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import {
  setupTestEnivironment,
  teardownTestEnvironment,
} from './setup-teardown';
import pactum from 'pactum';
import AuthTestSuite from './auth.test';
import TenantTestSuite from './tenant.test';
import OwnerTestSuite from './owner.test';
import CoworkingTestSuite from './coworking-space.test';
import BookingTestSuite from './booking.test';

describe('AppController', () => {
  beforeAll(async () => {
    await setupTestEnivironment();
  });

  afterAll(async () => {
    await teardownTestEnvironment();
  });

  describe('GET /', () => {
    it('should return index message', async () => {
      const res = await pactum.spec().get('/').expectStatus(200);

      expect(res.body).toStrictEqual({
        message: 'Spots REST API',
        version: '1.0.1',
      });
    });
  });

  AuthTestSuite();
  TenantTestSuite();
  OwnerTestSuite();
  CoworkingTestSuite();
  BookingTestSuite();
});