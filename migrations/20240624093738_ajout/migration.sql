-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "offerId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;