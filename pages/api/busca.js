import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { termo } = req.query
  if (!termo) {
    return res.status(400).json({ erro: 'Termo não informado' })
  }
 const resultados = await prisma.cargaIncendio.findMany({
  where: {
    OR: [
      { descricao: { contains: termo } },
      { codigo: { contains: termo } }
    ]
  }
})
  res.json(resultados)
}
