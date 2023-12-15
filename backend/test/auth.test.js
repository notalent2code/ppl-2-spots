import { describe, expect, it } from 'bun:test';
import pactum from 'pactum';

export default function AuthTestSuite() {
  describe('AuthController', () => {
    const validRegisterPayload = {
      email: 'test@gmail.com',
      password: 'VeryStrongPassword123!',
      confirmPassword: 'VeryStrongPassword123!',
      firstName: 'Test',
      lastName: 'User',
      phoneNumber: '62811223344',
      userType: 'TENANT',
    };

    const validLoginPayload = {
      email: 'test@gmail.com',
      password: 'VeryStrongPassword123!',
    };

    const randomAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5'

    describe('POST /auth/register', () => {
      it('should return 400 if payload is empty', async () => {
        await pactum
          .spec()
          .post('/auth/register')
          .withJson({})
          .expectStatus(400);
      });

      it('should return 400 if payload is invalid', async () => {
        const res = await pactum
          .spec()
          .post('/auth/register')
          .withJson({
            ...validLoginPayload,
            password: 'weakpassword',
          })
          .expectStatus(400);

        expect(res.body).toStrictEqual({
          message: expect.any(String),
        });
      });

      it('should return 201 if user with role tenant is created', async () => {
        const res = await pactum
          .spec()
          .post('/auth/register')
          .withJson(validRegisterPayload)
          .expectStatus(201);

        expect(res.body).toStrictEqual({
          message: 'User created successfully',
          user: {
            user_id: expect.any(Number),
            email: validRegisterPayload.email,
            first_name: validRegisterPayload.firstName,
            last_name: validRegisterPayload.lastName,
            phone_number: validRegisterPayload.phoneNumber,
            refresh_token: null,
            user_type: validRegisterPayload.userType,
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

      it('should return 201 if user with role owner is created', async () => {
        const res = await pactum
          .spec()
          .post('/auth/register')
          .withJson({
            ...validRegisterPayload,
            email: 'test2@gmail.com',
            phoneNumber: '62811223355',
            userType: 'OWNER',
          })
          .expectStatus(201);

        expect(res.body).toStrictEqual({
          message: 'User created successfully',
          user: {
            user_id: expect.any(Number),
            email: 'test2@gmail.com',
            first_name: validRegisterPayload.firstName,
            last_name: validRegisterPayload.lastName,
            phone_number: '62811223355',
            refresh_token: null,
            user_type: 'OWNER',
            created_at: expect.any(String),
            updated_at: expect.any(String),
            owner: {
              owner_id: expect.any(Number),
              user_id: expect.any(Number),
              nik: null,
              ktp_picture: null,
              balance: "0",
              bank_name: null,
              card_number: null,
              status: 'PENDING',
            },
          },
        });
      });

      it('should return 409 if user already exists', async () => {
        const res = await pactum
          .spec()
          .post('/auth/register')
          .withJson(validRegisterPayload)
          .expectStatus(409);

        expect(res.body).toStrictEqual({
          message: 'User already exists',
        });
      });
    });

    describe('POST /auth/login', () => {
      it('should return 400 if payload is empty', async () => {
        await pactum
          .spec()
          .post('/auth/login')
          .withJson({})
          .expectStatus(400);
      });

      it('should return 401 if payload is invalid', async () => {
        const res = await pactum
          .spec()
          .post('/auth/login')
          .withJson({
            ...validLoginPayload,
            password: 'weakpassword',
          })
          .expectStatus(401);

        expect(res.body).toStrictEqual({
          message: expect.any(String),
        });
      });

      it('should return 200 if login tenant is successfull', async () => {
        const res = await pactum
          .spec()
          .post('/auth/login')
          .withJson(validLoginPayload)
          .expectStatus(200)
          .stores('accessToken', 'res.body.accessToken')

        expect(res.body).toStrictEqual({
          firstName: validRegisterPayload.firstName,
          userId: expect.any(Number),
          userType: validRegisterPayload.userType,
          message: 'Login success',
          accessToken: expect.any(String),
        });
      });

      it('should return 200 if login owner is successfull', async () => {
        const res = await pactum
          .spec()
          .post('/auth/login')
          .withJson({ ...validLoginPayload, email: 'test2@gmail.com' })
          .expectStatus(200)
          .stores('accessTokenOwner', 'res.body.accessToken')

        expect(res.body).toStrictEqual({
          firstName: validRegisterPayload.firstName,
          userId: expect.any(Number),
          userType: 'OWNER',
          message: 'Login success',
          accessToken: expect.any(String),
        });
      });
    });

    describe('GET /auth/refresh-token', () => {
      it('should return 401 if access is denied', async () => {
        const res = await pactum
          .spec()
          .get('/auth/refresh-token')
          .withBearerToken(randomAccessToken)
          .expectStatus(401);

        expect(res.body).toStrictEqual("Access denied");
      });

      // it('should return 200 if refresh-token is successfull', async () => {
      //   const res = await pactum
      //     .spec()
      //     .get('/auth/refresh-token')
      //     .withBearerToken(`$S{accessToken}`)
      //     .expectStatus(200);

      //   expect(res.body).toStrictEqual({
      //     message: "Refresh token success",
      //     accessToken: expect.any(String),
      //   });
      // });
    });

    describe('DELETE /auth/logout', () => {
      it('should return 204 if logout is successfull', async () => {
        const res = await pactum
          .spec()
          .delete('/auth/logout')
          .withBearerToken(`$S{accessToken}`)
          .expectStatus(204);
      });
    });
  });
}
