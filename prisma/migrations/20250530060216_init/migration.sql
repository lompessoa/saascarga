-- CreateTable
CREATE TABLE "CargaIncendio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "divisao" TEXT NOT NULL,
    "carga" REAL NOT NULL,
    "referencia" TEXT NOT NULL
);
