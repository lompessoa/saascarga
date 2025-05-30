-- CreateTable
CREATE TABLE "CargaIncendio" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "divisao" TEXT NOT NULL,
    "carga" DOUBLE PRECISION NOT NULL,
    "referencia" TEXT NOT NULL,

    CONSTRAINT "CargaIncendio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CargaIncendio_codigo_key" ON "CargaIncendio"("codigo");
