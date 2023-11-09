import { describe, expect, it } from 'bun:test';
import pactum from 'pactum';

export default function AuthTestSuite() {
  describe('AuthController', () => {
    describe('POST /auth/register', () => {
      it('should return 400 if payload is empty', async () => {
        const res = await pactum
          .spec()
          .post('/auth/register')
          .withJson({})
          .expectStatus(400);

        expect(res.body).toStrictEqual({
          message: 'Invalid body',
        });
      });

      it('should return 400 if payload is invalid', async () => {
        await pactum
          .spec()
          .post('/auth/register')
          .withJson({
            email: 'test@example.mail',
            password: 'password',
          })
          .expectStatus(400);
      });

      it('should return 201 if user with role tenant is created', async () => {
        const payload = {
          email: 'test@example.mail',
          password: 'password',
          confirmPassword: 'password',
          firstName: 'Test',
          lastName: 'User',
          phoneNumber: '123456789',
          userType: 'TENANT',
        };

        const res = await pactum
          .spec()
          .post('/auth/register')
          .withJson(payload)
          .expectStatus(201);

        expect(res.body).toStrictEqual({
          message: 'User created successfully',
          user: {
            user_id: expect.any(Number),
            email: payload.email,
            first_name: payload.firstName,
            last_name: payload.lastName,
            phone_number: payload.phoneNumber,
            refresh_token: null,
            user_type: payload.userType,
            created_at: expect.any(String),
            updated_at: expect.any(String),
            tenant: {
              tenant_id: expect.any(Number),
              user_id: expect.any(Number),
              avatar_url: expect.any(String),
            },
          },
        });
      });
    });
  });
}
