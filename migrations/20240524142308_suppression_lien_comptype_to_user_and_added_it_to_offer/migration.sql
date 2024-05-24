/*
  Warnings:

  - You are about to drop the `UserComType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserComType" DROP CONSTRAINT "UserComType_comTypeId_fkey";

-- DropForeignKey
ALTER TABLE "UserComType" DROP CONSTRAINT "UserComType_userId_fkey";

-- DropTable
DROP TABLE "UserComType";

-- CreateTable
CREATE TABLE "OfferComType" (
    "offerId" INTEGER NOT NULL,
    "comTypeId" INTEGER NOT NULL,

    CONSTRAINT "OfferComType_pkey" PRIMARY KEY ("offerId","comTypeId")
);

-- AddForeignKey
ALTER TABLE "OfferComType" ADD CONSTRAINT "OfferComType_comTypeId_fkey" FOREIGN KEY ("comTypeId") REFERENCES "ComType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferComType" ADD CONSTRAINT "OfferComType_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
