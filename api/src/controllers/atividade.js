const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function create(req, res) {
    const { descricao, turmaId} = req.body

    try {
        const atividade= await prisma.atividade.create({
            data: {
                descricao,
                turmaId
            }
        })
        res.status(201).json(atividade)
    } catch (error) {
        console.error('Error creating atividade data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    const { id } = req.params

    try {
        const atividade = await prisma.atividade.findMany({
            where: { turmaId: parseInt(id) }
        })

        if (!atividade) {
            return res.status(404).json({ error: 'atividade data not found' })
        }

        res.status(200).json(atividade)
    } catch (error) {
        console.error('Error reading atividade data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}




module.exports = {
    create,
    read
}