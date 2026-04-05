/*
  Warnings:

  - You are about to drop the column `consultantId` on the `ConsultingBooking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title,sourceUrl]` on the table `TaxUpdate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `topic` to the `ConsultingBooking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deadline" DROP CONSTRAINT "Deadline_userId_fkey";

-- DropIndex
DROP INDEX "ConsultingBooking_consultantId_idx";

-- AlterTable
ALTER TABLE "ConsultingBooking" DROP COLUMN "consultantId",
ADD COLUMN     "topic" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Deadline" ADD COLUMN     "description" TEXT,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" TEXT;

-- CreateIndex
CREATE INDEX "Deadline_userId_idx" ON "Deadline"("userId");

-- CreateIndex
CREATE INDEX "Deadline_dueDate_idx" ON "Deadline"("dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "TaxUpdate_title_sourceUrl_key" ON "TaxUpdate"("title", "sourceUrl");

-- AddForeignKey
ALTER TABLE "Deadline" ADD CONSTRAINT "Deadline_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
