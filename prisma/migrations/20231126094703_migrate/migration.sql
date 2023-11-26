/*
  Warnings:

  - You are about to drop the `OkrNode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `okrNodeId` on the `KeyResult` table. All the data in the column will be lost.
  - You are about to drop the column `okrNodeId` on the `Objective` table. All the data in the column will be lost.
  - Added the required column `description` to the `Objective` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OkrNode";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "KeyResult_okrTermId_fkey" FOREIGN KEY ("okrTermId") REFERENCES "OkrTerm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "KeyResult_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "Objective" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "KeyResult_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_KeyResult" ("confidence", "createdById", "currentValue", "id", "name", "objectiveId", "okrTermId", "targetValue", "unit") SELECT "confidence", "createdById", "currentValue", "id", "name", "objectiveId", "okrTermId", "targetValue", "unit" FROM "KeyResult";
DROP TABLE "KeyResult";
ALTER TABLE "new_KeyResult" RENAME TO "KeyResult";
CREATE UNIQUE INDEX "KeyResult_objectiveId_key" ON "KeyResult"("objectiveId");
CREATE TABLE "new_Objective" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "okrTermId" INTEGER NOT NULL,
    CONSTRAINT "Objective_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Objective_okrTermId_fkey" FOREIGN KEY ("okrTermId") REFERENCES "OkrTerm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Objective" ("createdById", "id", "name", "okrTermId") SELECT "createdById", "id", "name", "okrTermId" FROM "Objective";
DROP TABLE "Objective";
ALTER TABLE "new_Objective" RENAME TO "Objective";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
