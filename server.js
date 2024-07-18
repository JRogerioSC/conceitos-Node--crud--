import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())

app.get('/usuarios', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' })
  }
})

app.post('/usuarios', async (req, res) => {
  const { email, age, name } = req.body

  
  if (isNaN(parseInt(age))) {
    return res.status(400).json({ error: 'Idade deve ser um número' })
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        age: parseInt(age),
        name,
      },
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' })
  }
})

app.put('/usuarios/:id', async (req, res) => {
  const { email, age, name } = req.body
  const { id } = req.params

  
  if (isNaN(parseInt(age))) {
    return res.status(400).json({ error: 'Idade deve ser um número' })
  }

  try {
    const users = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { email, age: parseInt(age), name },
    });
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' })
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Usuário deletado com sucesso!' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' })
  }
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
