const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function create(req, res) {
    const { serie, professorId} = req.body

    try {
        const turma= await prisma.turma.create({
            data: {
                serie,
                professorId
            }
        })
        res.status(201).json(turma)
    } catch (error) {
        console.error('Error creating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    const { id } = req.params

    try {
        const turma = await prisma.turma.findMany({

        })

        if (!turma) {
            return res.status(404).json({ error: 'Meditation data not found' })
        }

        res.status(200).json(turma)
    } catch (error) {
        console.error('Error reading meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


async function remove(req, res) {
    const { id } = req.params

    try {
        const turma = await prisma.turma.delete({
            where: { id_turma: parseInt(id) }
        })

        res.status(204).json(turma)
    } catch (error) {
        console.error('Error deleting meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    create,
    read,
    remove
}