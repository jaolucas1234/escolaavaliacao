const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function create(req, res) {
    const { nome, email, senha} = req.body

    try {
        const professor= await prisma.professor.create({
            data: {
                nome,
                email,
                senha
            }
        })
        res.status(201).json(professor)
    } catch (error) {
        console.error('Error creating meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    const { id } = req.params

    try {
        const professor = await prisma.professor.findMany({

        })

        if (!professor) {
            return res.status(404).json({ error: 'Meditation data not found' })
        }

        res.status(200).json(professor)
    } catch (error) {
        console.error('Error reading meditation data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}



module.exports = {
    create,
    read
}