import { describe, expect, it } from 'bun:test';
import pactum from 'pactum';

export default function BookingTestSuite() {
  describe('BookingController', () => {
    const validBookPayload = {
        date: "2023-12-18",
        startHour: "11",
        endHour: "13",
        totalPrice: "275000"
    };

    describe('POST /bookings/{spaceId}/book', () => {
        it('should return 404 if coworking space is not found', async () => {
            const res = await pactum
              .spec()
              .post('/bookings/{spaceId}/book')          
              .withBearerToken(`$S{accessToken}`)
              .withPathParams({
                spaceId: 9999,
              })
              .withJson({ ...validBookPayload})
              .expectStatus(404);
          });
          
          it('should return 200 if booking is successfull', async () => {
            const res = await pactum
                .spec()
                .post('/bookings/{spaceId}/book')          
                .withBearerToken(`$S{accessToken}`)
                .withPathParams({
                    spaceId: 2,
                })
                .withJson({ ...validBookPayload})
                .expectStatus(200);
                console.log(res.body)
        });
    });
  });
}