import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { termo } = req.query;

  if (!termo) {
    return res.status(400).json({ erro: 'Termo não informado' });
  }

  try {
    const resultados = await prisma.cargaIncendio.findMany({
      where: {
        AND: [
          {
            descricao: {
              contains: termo,
              mode: 'insensitive',
            },
          },
          {
            codigo: {
              endsWith: '0',
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar dados.' });
  }
}
