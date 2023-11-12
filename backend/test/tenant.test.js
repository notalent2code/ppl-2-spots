import { describe, expect, it } from 'bun:test';
import pactum from 'pactum';

export default function TenantTestSuite() {
  describe('TenantController', () => {
    const validEditProfilePayload = {
      email: 'test@gmail.com',
      firstName: 'Test',
      lastName: 'User',
      phoneNumber: '62811223344',
    };

    describe('PUT /tenants/profile', () => {
      it('should return 400 if payload is empty', async () => {
        const res = await pactum
          .spec()
          .post('/auth/register')
          .withJson({})
          .expectStatus(400);

        console.log(res.body);
      });
    });
  });
}
