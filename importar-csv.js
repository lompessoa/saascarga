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
      if (resultados.length % 100 === 0) {
        console.log(`Lidos ${resultados.length} registros do CSV até agora...`);
      }
    })
    .on('end', async () => {
      console.log(`Total de registros lidos do CSV: ${resultados.length}`);
      const dados = resultados.map(linha => ({
        codigo: linha['Código'],
        descricao: linha['Descrição'],
        divisao: linha['Divisão'],
        carga: isNaN(Number(linha['Carga de Incêndio'])) ? 0 : Number(linha['Carga de Incêndio']),
        referencia: linha['Descrição original'] || "",
      }));

      try {
        await prisma.cargaIncendio.createMany({
          data: dados,
          skipDuplicates: true,
        });
        console.log(`Importação concluída! Total de linhas importadas: ${dados.length}`);
      } catch (error) {
        console.error("Erro ao importar:", error.message);
      } finally {
        await prisma.$disconnect();
      }
    });
}

importarCSV();
