/*
  Warnings:

  - You are about to drop the column `Gender` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `gender` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "Gender",
ADD COLUMN     "gender" "Gender" NOT NULL;
