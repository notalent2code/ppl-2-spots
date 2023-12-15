import { describe, expect, it } from 'bun:test';
import pactum from 'pactum';

export default function OwnerTestSuite() {
    describe('OwnerController', () => {
        const validOwnerPayload = {
            email: 'test2@gmail.com',
            firstName: 'Test',
            lastName: 'User',
            phoneNumber: '62811223355',
        };
        const validEditOwnerPayload = {
            bank_name: "Mandiri",
            card_number: "1815850071",
        };

        const formData = new FormData();
        formData.append('bank_name', validEditOwnerPayload.bank_name);
        formData.append('card_number', validEditOwnerPayload.card_number);

        describe('GET /owners/info', () => {
            it('should return 200 if get owner information is successfull', async () => {
                const res = await pactum
                    .spec()
                    .get('/owners/info')
                    .withBearerToken(`$S{accessTokenOwner}`)
                    .expectStatus(200);
                expect(res.body).toStrictEqual({
                    owner: {
                        owner_id: expect.any(Number),
                        user_id: expect.any(Number),
                        nik: null,
                        ktp_picture: null,
                        balance: expect.any(String),
                        bank_name: null,
                        card_number: null,
                        status: "PENDING",
                        user: {
                            email: validOwnerPayload.email,
                            first_name: validOwnerPayload.firstName,
                            last_name: validOwnerPayload.lastName,
                            phone_number: validOwnerPayload.phoneNumber,
                        }
                    }
                });
            });
        });

        describe('GET /owners/info', () => {
            it('should return 200 if get owner information is successfull', async () => {
                const res = await pactum
                    .spec()
                    .get('/owners/facilities')
                    .withBearerToken(`$S{accessTokenOwner}`)
                    .expectStatus(200);

                    expect(res.body).toStrictEqual({
                        facilities: [
                            [], {
                                isFirstPage: true,
                                isLastPage: true,
                                currentPage: 1,
                                previousPage: null,
                                nextPage: null,
                                pageCount: 0,
                                totalCount: 0
                            }
                        ]
                    });
            });
        });

        // describe('PUT /owners/info', () => {
        //     it('should return 200 if edit owner information is successfull', async () => {
        //         const res = await pactum
        //             .spec()
        //             .put('/owners/info')
        //             .withBearerToken(`$S{accessTokenOwner}`)
        //             .withMultiPartFormData(formData)
        //             .expectStatus(200);

        //         expect(res.body).toStrictEqual({
        //             owner: {
        //                 owner_id: expect.any(Number),
        //                 user_id: expect.any(Number),
        //                 nik: null,
        //                 ktp_picture: null,
        //                 balance: expect.any(String),
        //                 bank_name: validEditOwnerPayload.bank_name,
        //                 card_number: validEditOwnerPayload.card_number,
        //                 status: "PENDING",
        //                 user: {
        //                     email: validOwnerPayload.email,
        //                     first_name: validOwnerPayload.firstName,
        //                     last_name: validOwnerPayload.lastName,
        //                     phone_number: validOwnerPayload.phoneNumber,
        //                 }
        //             }
        //         });
        //     });
        // });
    });
}
