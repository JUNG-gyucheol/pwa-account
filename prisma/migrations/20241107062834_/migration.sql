/*
  Warnings:

  - You are about to drop the column `date` on the `Account` table. All the data in the column will be lost.
  - Added the required column `dateId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "date",
ADD COLUMN     "dateId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AccountDate" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "AccountDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountDate_date_key" ON "AccountDate"("date");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "AccountDate"("date") ON DELETE RESTRICT ON UPDATE CASCADE;
