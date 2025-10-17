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
        console.error('Error creating professor data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function read(req, res) {
    const { id } = req.params

    try {
        const professor = await prisma.professor.findMany({

        })

        if (!professor) {
            return res.status(404).json({ error: 'professor data not found' })
        }

        res.status(200).json(professor)
    } catch (error) {
        console.error('Error reading professor data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function login(req, res) {
    const { email, senha } = req.body;
    try {
        const professor = await prisma.professor.findFirst({
            where: {
                email,
                senha
            }

        })
        res.status(201).json(professor)    
    } catch (error) {
        console.error('Error login data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
        



module.exports = {
    create,
    read,
    login
}