/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `CargaIncendio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CargaIncendio_codigo_key" ON "CargaIncendio"("codigo");
