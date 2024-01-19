/*
  Warnings:

  - You are about to drop the `KeyResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Objective` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OkrTerm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "KeyResult" DROP CONSTRAINT "KeyResult_createdById_fkey";

-- DropForeignKey
ALTER TABLE "KeyResult" DROP CONSTRAINT "KeyResult_objectiveId_fkey";

-- DropForeignKey
ALTER TABLE "KeyResult" DROP CONSTRAINT "KeyResult_okrTermId_fkey";

-- DropForeignKey
ALTER TABLE "Objective" DROP CONSTRAINT "Objective_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Objective" DROP CONSTRAINT "Objective_okrTermId_fkey";

-- DropForeignKey
ALTER TABLE "OkrTerm" DROP CONSTRAINT "OkrTerm_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_keyResultId_fkey";

-- DropTable
DROP TABLE "KeyResult";

-- DropTable
DROP TABLE "Objective";

-- DropTable
DROP TABLE "OkrTerm";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "dreams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT,
    "createdById" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dreams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "numerical_goals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "okrTermId" INTEGER NOT NULL,
    "dreamId" INTEGER NOT NULL,
    "createdById" TEXT NOT NULL,
    "targetValue" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "currentValue" INTEGER NOT NULL,

    CONSTRAINT "numerical_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "numericalGoalId" INTEGER NOT NULL,
    "isDone" BOOLEAN NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dreams" ADD CONSTRAINT "dreams_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "numerical_goals" ADD CONSTRAINT "numerical_goals_dreamId_fkey" FOREIGN KEY ("dreamId") REFERENCES "dreams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "numerical_goals" ADD CONSTRAINT "numerical_goals_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_numericalGoalId_fkey" FOREIGN KEY ("numericalGoalId") REFERENCES "numerical_goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
