import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import {
  setupTestEnivironment,
  teardownTestEnvironment,
} from './setup-teardown';
import pactum from 'pactum';
import AuthTestSuite from './auth.test';

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
});
