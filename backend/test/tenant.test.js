import { describe, expect, it } from 'bun:test';
import pactum from 'pactum';

export default function TenantTestSuite() {
    describe('TenantController', () => {
          const validProfilePayload = {
            email: 'test@gmail.com',
            firstName: 'Test',
            lastName: 'User',
            phoneNumber: '62811223344',
          };

        const validEditProfilePayload = {
            firstName: 'Test2',
            lastName: 'User2',
        };

        const randomAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5'

        describe('GET /tenants/profile', () => {
            it('should return 403 if get tenant profile is forbidden', async () => {
                const res = await pactum
                    .spec()
                    .get('/tenants/profile')
                    .withBearerToken(randomAccessToken)
                    .expectStatus(403);
            });

            it('should return 200 if get profile is successfull', async () => {
                const res = await pactum
                    .spec()
                    .get('/tenants/profile')
                    .withBearerToken(`$S{accessToken}`)
                    .expectStatus(200);

                expect(res.body).toStrictEqual({
                    tenant: {
                        tenant_id: expect.any(Number),
                        user_id: expect.any(Number),
                        avatar_url: expect.any(String),
                        user: {
                            email: validProfilePayload.email,
                            first_name: validProfilePayload.firstName,
                            last_name: validProfilePayload.lastName,
                            phone_number: validProfilePayload.phoneNumber,
                        }
                    }
                });
            });
        });

        describe('PUT /tenants/profile', () => {
            it('should return 403 if edit tenant profile is forbidden', async () => {
                const res = await pactum
                    .spec()
                    .put('/tenants/profile')
                    .withBearerToken(randomAccessToken)
                    
                    .withJson({...validEditProfilePayload})
                    .expectStatus(403);
            });

            it('should return 200 if edit profile is successful', async () => {
                const res = await pactum
                    .spec()
                    .put('/tenants/profile')
                    .withBearerToken(`$S{accessToken}`)
                    .withJson({...validEditProfilePayload})
                    .expectStatus(200);

                    expect(res.body).toStrictEqual({
                        tenant: {
                            tenant_id: expect.any(Number),
                            user_id: expect.any(Number),
                            avatar_url: expect.any(String),
                            user: {
                                email: validProfilePayload.email,
                                first_name: validEditProfilePayload.firstName,
                                last_name: validEditProfilePayload.lastName,
                                phone_number: validProfilePayload.phoneNumber,
                            }
                        }
                    });
            });

        });
    });
}
