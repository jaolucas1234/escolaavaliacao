const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function create(req, res) {
    const { descricao, turmaId } = req.body;

    if (!descricao || !turmaId) {
        return res.status(400).json({ error: 'Descrição e turmaId são obrigatórios' });
    }

    try {
        const atividade = await prisma.atividade.create({
            data: {
                descricao,
                turmaId: parseInt(turmaId)
            }
        });
        res.status(201).json(atividade);
    } catch (error) {
        console.error('Error creating atividade data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function read(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID da turma não fornecido' });
    }

    try {
        const atividades = await prisma.atividade.findMany({
            where: {
                turmaId: parseInt(id)
            }
        });

        if (atividades.length === 0) {
            return res.status(404).json({ error: 'Nenhuma atividade encontrada para esta turma' });
        }

        res.status(200).json(atividades);
    } catch (error) {
        console.error('Error reading atividade data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    create,
    read
};
