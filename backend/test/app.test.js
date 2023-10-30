import { beforeAll, describe, expect, it, test, toEqual } from 'bun:test';
import { setupTestEnivironment } from './setup-teardown';
import pactum from 'pactum';
import { AuthTestSuite } from './auth.test';

describe('AppController', () => {
  beforeAll(async () => {
    await setupTestEnivironment();
  })

  describe('GET /', () => {
    test('should return index message', async () => {
      const res = await pactum.spec().get('/').expectStatus(200);

      expect(res.body).toStrictEqual({
        message: 'Welcome to Spots API'
      })
    })
  })

  AuthTestSuite();
})