/*
  Warnings:

  - You are about to drop the column `eomji` on the `OkrTerm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OkrTerm" DROP COLUMN "eomji",
ADD COLUMN     "emoji" TEXT;
