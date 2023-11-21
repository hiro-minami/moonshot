/*
  Warnings:

  - The primary key for the `Objective` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Objective` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `okrNodeId` on the `Objective` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `okrTermId` on the `Objective` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `OkrNode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `OkrNode` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `okrTermId` on the `OkrNode` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `OkrTerm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `OkrTerm` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `KeyResult` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `KeyResult` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `objectiveId` on the `KeyResult` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `okrNodeId` on the `KeyResult` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `okrTermId` on the `KeyResult` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Objective" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "okrTermId" INTEGER NOT NULL,
    "okrNodeId" INTEGER NOT NULL,
    CONSTRAINT "Objective_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Objective_okrTermId_fkey" FOREIGN KEY ("okrTermId") REFERENCES "OkrTerm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Objective_okrNodeId_fkey" FOREIGN KEY ("okrNodeId") REFERENCES "OkrNode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Objective" ("createdById", "id", "name", "okrNodeId", "okrTermId") SELECT "createdById", "id", "name", "okrNodeId", "okrTermId" FROM "Objective";
DROP TABLE "Objective";
ALTER TABLE "new_Objective" RENAME TO "Objective";
CREATE UNIQUE INDEX "Objective_okrNodeId_key" ON "Objective"("okrNodeId");
CREATE TABLE "new_OkrNode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "okrTermId" INTEGER NOT NULL,
    "objectiveId" TEXT NOT NULL,
    "keyResultId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    CONSTRAINT "OkrNode_okrTermId_fkey" FOREIGN KEY ("okrTermId") REFERENCES "OkrTerm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OkrNode_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OkrNode" ("createdById", "id", "keyResultId", "objectiveId", "okrTermId") SELECT "createdById", "id", "keyResultId", "objectiveId", "okrTermId" FROM "OkrNode";
DROP TABLE "OkrNode";
ALTER TABLE "new_OkrNode" RENAME TO "OkrNode";
CREATE TABLE "new_OkrTerm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    CONSTRAINT "OkrTerm_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OkrTerm" ("createdById", "endDate", "id", "name", "startDate") SELECT "createdById", "endDate", "id", "name", "startDate" FROM "OkrTerm";
DROP TABLE "OkrTerm";
ALTER TABLE "new_OkrTerm" RENAME TO "OkrTerm";
CREATE TABLE "new_KeyResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "okrTermId" INTEGER NOT NULL,
    "objectiveId" INTEGER NOT NULL,
    "createdById" TEXT NOT NULL,
    "targetValue" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "currentValue" INTEGER NOT NULL,
    "confidence" INTEGER NOT NULL,
    "okrNodeId" INTEGER NOT NULL,
    CONSTRAINT "KeyResult_okrTermId_fkey" FOREIGN KEY ("okrTermId") REFERENCES "OkrTerm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "KeyResult_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "Objective" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "KeyResult_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "KeyResult_okrNodeId_fkey" FOREIGN KEY ("okrNodeId") REFERENCES "OkrNode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_KeyResult" ("confidence", "createdById", "currentValue", "id", "name", "objectiveId", "okrNodeId", "okrTermId", "targetValue", "unit") SELECT "confidence", "createdById", "currentValue", "id", "name", "objectiveId", "okrNodeId", "okrTermId", "targetValue", "unit" FROM "KeyResult";
DROP TABLE "KeyResult";
ALTER TABLE "new_KeyResult" RENAME TO "KeyResult";
CREATE UNIQUE INDEX "KeyResult_objectiveId_key" ON "KeyResult"("objectiveId");
CREATE UNIQUE INDEX "KeyResult_okrNodeId_key" ON "KeyResult"("okrNodeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
