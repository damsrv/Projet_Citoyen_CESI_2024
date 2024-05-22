/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `com_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `evaluations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offer_student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `request_mentor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `saved_offer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `saved_request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skill_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_com_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_category_type_id_fkey";

-- DropForeignKey
ALTER TABLE "evaluations" DROP CONSTRAINT "evaluations_id_mentor_fkey";

-- DropForeignKey
ALTER TABLE "evaluations" DROP CONSTRAINT "evaluations_id_student_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_room_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "offer_student" DROP CONSTRAINT "offer_student_offer_id_fkey";

-- DropForeignKey
ALTER TABLE "offer_student" DROP CONSTRAINT "offer_student_student_id_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_category_id_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_mentor_id_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_reporter_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_target_fkey";

-- DropForeignKey
ALTER TABLE "request_mentor" DROP CONSTRAINT "mentor_request_mentor_id_fkey";

-- DropForeignKey
ALTER TABLE "request_mentor" DROP CONSTRAINT "mentor_request_request_id_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_student_id_fkey";

-- DropForeignKey
ALTER TABLE "saved_offer" DROP CONSTRAINT "saved_offer_offer_id_fkey";

-- DropForeignKey
ALTER TABLE "saved_offer" DROP CONSTRAINT "saved_offer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "saved_request" DROP CONSTRAINT "saved_request_request_id_fkey";

-- DropForeignKey
ALTER TABLE "saved_request" DROP CONSTRAINT "saved_request_user_id_fkey";

-- DropForeignKey
ALTER TABLE "skill_category" DROP CONSTRAINT "skill_category_category_id_fk";

-- DropForeignKey
ALTER TABLE "skill_category" DROP CONSTRAINT "skill_category_skill_id_fk";

-- DropForeignKey
ALTER TABLE "user_com_type" DROP CONSTRAINT "user_com_type_com_type_id_fkey";

-- DropForeignKey
ALTER TABLE "user_com_type" DROP CONSTRAINT "user_com_type_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_room" DROP CONSTRAINT "user_room_room_id_fkey";

-- DropForeignKey
ALTER TABLE "user_room" DROP CONSTRAINT "user_room_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_skill" DROP CONSTRAINT "user_skill_skill_id_fk";

-- DropForeignKey
ALTER TABLE "user_skill" DROP CONSTRAINT "user_skill_user_id_fk";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roles_fk";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "category_type";

-- DropTable
DROP TABLE "com_type";

-- DropTable
DROP TABLE "evaluations";

-- DropTable
DROP TABLE "messages";

-- DropTable
DROP TABLE "offer_student";

-- DropTable
DROP TABLE "offers";

-- DropTable
DROP TABLE "reports";

-- DropTable
DROP TABLE "request_mentor";

-- DropTable
DROP TABLE "requests";

-- DropTable
DROP TABLE "roles";

-- DropTable
DROP TABLE "rooms";

-- DropTable
DROP TABLE "saved_offer";

-- DropTable
DROP TABLE "saved_request";

-- DropTable
DROP TABLE "skill_category";

-- DropTable
DROP TABLE "skills";

-- DropTable
DROP TABLE "user_com_type";

-- DropTable
DROP TABLE "user_room";

-- DropTable
DROP TABLE "user_skill";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Category" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "category_type_id" BIGINT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryType" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "CategoryType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluations" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "student_id" UUID NOT NULL,
    "mentor_id" UUID NOT NULL,
    "value" SMALLINT,
    "comment" TEXT,

    CONSTRAINT "Evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" BIGSERIAL NOT NULL,
    "sent_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "room_id" BIGINT NOT NULL,
    "sender_id" UUID NOT NULL,
    "content" TEXT,
    "status" BIGINT,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferStudent" (
    "student_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "offer_id" BIGINT NOT NULL,
    "message" TEXT,
    "status" BIGINT,

    CONSTRAINT "OfferStudent_pkey" PRIMARY KEY ("offer_id","student_id")
);

-- CreateTable
CREATE TABLE "Offers" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT,
    "location" VARCHAR,
    "type" SMALLINT,
    "is_visible" BOOLEAN,
    "mentor_id" UUID,
    "title" VARCHAR,
    "category_id" BIGINT,

    CONSTRAINT "Offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" BIGSERIAL NOT NULL,
    "reporter" UUID,
    "target" UUID,
    "created_at" TIMESTAMPTZ(6),
    "message" TEXT,
    "reason" VARCHAR,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestMentor" (
    "mentor_id" UUID NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "request_id" BIGINT NOT NULL,
    "message" TEXT,
    "status" SMALLINT,

    CONSTRAINT "mentor_request_pkey" PRIMARY KEY ("mentor_id","request_id")
);

-- CreateTable
CREATE TABLE "Requests" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" VARCHAR,
    "title" VARCHAR,
    "location" VARCHAR,
    "type" BIGINT,
    "student_id" UUID,
    "status" BIGINT,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rooms" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedOffer" (
    "user_id" UUID NOT NULL,
    "offer_id" BIGINT NOT NULL,

    CONSTRAINT "SavedOffer_pkey" PRIMARY KEY ("user_id","offer_id")
);

-- CreateTable
CREATE TABLE "SavedRequest" (
    "user_id" UUID NOT NULL,
    "request_id" BIGINT NOT NULL,

    CONSTRAINT "SavedRequest_pkey" PRIMARY KEY ("user_id","request_id")
);

-- CreateTable
CREATE TABLE "UserRoom" (
    "user_id" UUID NOT NULL,
    "room_id" BIGINT NOT NULL,

    CONSTRAINT "UserRoom_pkey" PRIMARY KEY ("user_id","room_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "firstname" VARCHAR,
    "lastname" VARCHAR,
    "email" VARCHAR,
    "password" VARCHAR,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "avatar" VARCHAR,
    "is_active" BOOLEAN,
    "description" TEXT,
    "birthdate" TIMESTAMPTZ(6),
    "skills" VARCHAR,
    "experiences" TEXT,
    "role" BIGINT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComType" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "ComType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillCategory" (
    "skill_id" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL,

    CONSTRAINT "SkillCategory_pkey" PRIMARY KEY ("category_id","skill_id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserComType" (
    "user_id" UUID NOT NULL,
    "com_type_id" BIGINT NOT NULL,

    CONSTRAINT "UserComType_pkey" PRIMARY KEY ("user_id","com_type_id")
);

-- CreateTable
CREATE TABLE "UserSkill" (
    "skill_id" BIGINT NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "UserSkill_pkey" PRIMARY KEY ("user_id","skill_id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_category_type_id_fkey" FOREIGN KEY ("category_type_id") REFERENCES "CategoryType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluations" ADD CONSTRAINT "evaluations_id_mentor_fkey" FOREIGN KEY ("mentor_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluations" ADD CONSTRAINT "evaluations_id_student_fkey" FOREIGN KEY ("student_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferStudent" ADD CONSTRAINT "OfferStudent_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "Offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferStudent" ADD CONSTRAINT "OfferStudent_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offers" ADD CONSTRAINT "Offers_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offers" ADD CONSTRAINT "Offers_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_reporter_fkey" FOREIGN KEY ("reporter") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_target_fkey" FOREIGN KEY ("target") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestMentor" ADD CONSTRAINT "mentor_request_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestMentor" ADD CONSTRAINT "mentor_request_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedOffer" ADD CONSTRAINT "SavedOffer_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "Offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedOffer" ADD CONSTRAINT "SavedOffer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedRequest" ADD CONSTRAINT "SavedRequest_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedRequest" ADD CONSTRAINT "SavedRequest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoom" ADD CONSTRAINT "UserRoom_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoom" ADD CONSTRAINT "UserRoom_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "users_roles_fk" FOREIGN KEY ("role") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SkillCategory" ADD CONSTRAINT "skill_category_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SkillCategory" ADD CONSTRAINT "skill_category_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "Skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserComType" ADD CONSTRAINT "UserComType_com_type_id_fkey" FOREIGN KEY ("com_type_id") REFERENCES "ComType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserComType" ADD CONSTRAINT "UserComType_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserSkill" ADD CONSTRAINT "user_skill_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "Skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserSkill" ADD CONSTRAINT "user_skill_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
