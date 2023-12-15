import { describe, expect, it } from 'bun:test';
import pactum from 'pactum';

export default function CoworkingTestSuite() {
  describe('CoworkingSpaceController', () => {
    const validProfilePayload = {
      email: 'test@gmail.com',
      firstName: 'Test2',
      lastName: 'User2',
      phoneNumber: '62811223344',
    };

    describe('GET /coworking-spaces', () => {
      it('should return 200 if get profile is successfull', async () => {
        const res = await pactum
          .spec()
          .get('/coworking-spaces')
          .withBearerToken(`$S{accessToken}`)
          .expectStatus(200);

        expect(res.body).toStrictEqual({
          coworkingSpaces: [
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

    describe('GET /coworking-spaces/{space_id}', () => {
      it('should return 404 if coworking space is not found', async () => {
        const res = await pactum
          .spec()
          .get('/coworking-spaces/{space_id}')
          .withBearerToken(`$S{accessToken}`)
          .withPathParams({
            space_id: 99999,
          })
          .expectStatus(404);
      })

      it('should return 200 if get coworking space by id is successfull', async () => {
        const res = await pactum
          .spec()
          .get(`/coworking-spaces/`)
          .withBearerToken(`$S{accessToken}`)
          .withPathParams({
            space_id: 1,
          })
          .expectStatus(200);
          console.log(res.body)
      });
    });
  });
}