const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function importarCSV() {
  const resultados = [];
  const filePath = path.join(__dirname, 'Cópia de Divisao_A_Carga_Incendio_FORMATADO - Consolidado sem aenxo.csv');

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      resultados.push(row);
    })
    .on('end', async () => {
      for (const linha of resultados) {
        // Tenta converter a carga para número
        const cargaValor = Number(linha['Carga de Incêndio']);
        if (isNaN(cargaValor)) {
          console.warn(
            `⚠️  Carga inválida para código ${linha['Código']}: valor encontrado = '${linha['Carga de Incêndio']}'. Será importado como 0.`
          );
        }
        await prisma.cargaIncendio.upsert({
          where: { codigo: linha['Código'] },
          update: {},
          create: {
            codigo: linha['Código'],
            descricao: linha['Descrição'],
            divisao: linha['Divisão'],
            carga: isNaN(cargaValor) ? 0 : cargaValor,
            referencia: linha['Descrição original'] || "",
          },
        });
      }
      console.log('Importação concluída!');
      await prisma.$disconnect();
    });
}

importarCSV();
