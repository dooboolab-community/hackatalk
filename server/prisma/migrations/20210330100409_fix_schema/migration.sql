/*
  Warnings:

  - The migration will change the primary key for the `Report` table. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Report` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Report" DROP CONSTRAINT "Report_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD PRIMARY KEY ("id");
