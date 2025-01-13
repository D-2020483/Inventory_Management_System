/*
  Warnings:

  - The primary key for the `Expenses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `expenseId` on the `Expenses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_pkey",
DROP COLUMN "expenseId",
ADD COLUMN     "expenseId" UUID NOT NULL,
ADD CONSTRAINT "Expenses_pkey" PRIMARY KEY ("expenseId");
