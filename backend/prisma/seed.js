import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import argon2 from 'argon2';

const prisma = new PrismaClient();

const fakeFacility = async () => ({
  name: faker.lorem.word(),
  description: faker.lorem.paragraph(),
});

const fakeOwner = async () => ({
  email: faker.internet.email(),
  password_hash: await argon2.hash('secret123'),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  phone_number: faker.helpers.fromRegExp('[1-9]{11,12}'),
  user_type: 'OWNER',
});

const fakeCoworkingSpace = async () => ({
  name: faker.company.name(),
  description: faker.lorem.paragraph(),
  price: faker.number.int({ min: 50000, max: 2000000 }),
  capacity: faker.number.int({ min: 1, max: 250 }),
  status: 'APPROVED',
});

const fakeLocation = async () => ({
  address: faker.location.streetAddress(),
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
});

const fakeCoworkingSpaceImage = async () => ({
  image_url: faker.image.url(),
});

const seed = async () => {
  const DATA_COUNT = 25;

  for (let i = 0; i < DATA_COUNT; i++) {
    const facility = await fakeFacility();
    const facilityResult = await prisma.facility.create({
      data: facility,
    });

    const owner = await fakeOwner();
    const ownerResult = await prisma.user.create({
      data: {
        ...owner,
        owner: {
          create: {
            nik: faker.helpers.fromRegExp('[1-9]{16}'),
            ktp_picture: faker.image.url(),
            bank_name: faker.finance.accountName(),
            card_number: faker.finance.accountNumber(),
            balance: 0,
            status: 'APPROVED',
          },
        },
      },
      include: {
        owner: true,
      },
    });

    const coworkingSpace = await fakeCoworkingSpace();
    const coworkingSpaceResult = await prisma.coworkingSpace.create({
      data: {
        ...coworkingSpace,
        owner_id: ownerResult.owner.owner_id,
      },
    });

    const location = await fakeLocation();
    await prisma.location.create({
      data: {
        ...location,
        space_id: coworkingSpaceResult.space_id,
      },
    });

    const coworkingSpaceImage = await fakeCoworkingSpaceImage();
    await prisma.coworkingSpaceImage.create({
      data: {
        ...coworkingSpaceImage,
        space_id: coworkingSpaceResult.space_id,
      },
    });

    await prisma.coworkingSpaceFacility.create({
      data: {
        facility_id: facilityResult.facility_id,
        space_id: coworkingSpaceResult.space_id,
      },
    });
  }
};

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
