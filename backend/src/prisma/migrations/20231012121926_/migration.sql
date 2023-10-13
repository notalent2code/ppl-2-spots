-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('TENANT', 'OWNER', 'ADMIN');

-- CreateEnum
CREATE TYPE "OwnerCoworkingSpaceStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" VARCHAR(256) NOT NULL,
    "first_name" VARCHAR(64) NOT NULL,
    "last_name" VARCHAR(64) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "refresh_token" TEXT,
    "user_type" "UserType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "tenant" (
    "tenant_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "avatar_url" VARCHAR(256),

    CONSTRAINT "tenant_pkey" PRIMARY KEY ("tenant_id")
);

-- CreateTable
CREATE TABLE "owner" (
    "owner_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "nik" VARCHAR(16),
    "ktp_picture" VARCHAR(256),
    "balance" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "bank_name" VARCHAR(36),
    "card_number" VARCHAR(20),
    "status" "OwnerCoworkingSpaceStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "owner_pkey" PRIMARY KEY ("owner_id")
);

-- CreateTable
CREATE TABLE "coworking_space" (
    "space_id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "status" "OwnerCoworkingSpaceStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coworking_space_pkey" PRIMARY KEY ("space_id")
);

-- CreateTable
CREATE TABLE "coworking_space_image" (
    "image_id" SERIAL NOT NULL,
    "space_id" INTEGER NOT NULL,
    "image_url" VARCHAR(256) NOT NULL,

    CONSTRAINT "coworking_space_image_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "location" (
    "location_id" SERIAL NOT NULL,
    "space_id" INTEGER NOT NULL,
    "address" VARCHAR(256),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "location_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "facility" (
    "facility_id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "facility_pkey" PRIMARY KEY ("facility_id")
);

-- CreateTable
CREATE TABLE "coworking_space_facility" (
    "space_id" INTEGER NOT NULL,
    "facility_id" INTEGER NOT NULL,

    CONSTRAINT "coworking_space_facility_pkey" PRIMARY KEY ("space_id","facility_id")
);

-- CreateTable
CREATE TABLE "availability" (
    "availability_id" SERIAL NOT NULL,
    "space_id" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "start_hour" INTEGER NOT NULL,
    "end_hour" INTEGER NOT NULL,
    "is_booked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "availability_pkey" PRIMARY KEY ("availability_id")
);

-- CreateTable
CREATE TABLE "booking" (
    "booking_id" TEXT NOT NULL,
    "space_id" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "start_hour" INTEGER NOT NULL,
    "end_hour" INTEGER NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "payment_id" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "method" VARCHAR(16) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_key" ON "user"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_user_id_key" ON "tenant"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "owner_user_id_key" ON "owner"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "owner_nik_key" ON "owner"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "owner_card_number_key" ON "owner"("card_number");

-- CreateIndex
CREATE UNIQUE INDEX "coworking_space_name_key" ON "coworking_space"("name");

-- CreateIndex
CREATE INDEX "name" ON "coworking_space"("name");

-- CreateIndex
CREATE UNIQUE INDEX "location_space_id_key" ON "location"("space_id");

-- CreateIndex
CREATE UNIQUE INDEX "facility_name_key" ON "facility"("name");

-- CreateIndex
CREATE UNIQUE INDEX "payment_booking_id_key" ON "payment"("booking_id");

-- AddForeignKey
ALTER TABLE "tenant" ADD CONSTRAINT "tenant_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owner" ADD CONSTRAINT "owner_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coworking_space" ADD CONSTRAINT "coworking_space_ibfk_1" FOREIGN KEY ("owner_id") REFERENCES "owner"("owner_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coworking_space_image" ADD CONSTRAINT "coworking_space_image_ibfk_1" FOREIGN KEY ("space_id") REFERENCES "coworking_space"("space_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_ibfk_1" FOREIGN KEY ("space_id") REFERENCES "coworking_space"("space_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coworking_space_facility" ADD CONSTRAINT "coworking_space_facility_ibfk_2" FOREIGN KEY ("facility_id") REFERENCES "facility"("facility_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coworking_space_facility" ADD CONSTRAINT "coworking_space_facility_ibfk_1" FOREIGN KEY ("space_id") REFERENCES "coworking_space"("space_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availability" ADD CONSTRAINT "availability_ibfk_1" FOREIGN KEY ("space_id") REFERENCES "coworking_space"("space_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_ibfk_1" FOREIGN KEY ("space_id") REFERENCES "coworking_space"("space_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_ibfk_2" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("tenant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_ibfk_1" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE CASCADE ON UPDATE CASCADE;
