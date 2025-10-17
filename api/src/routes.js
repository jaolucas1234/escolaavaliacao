const express = require('express')
const routes = express.Router()

const professorController = require('./controllers/professor')
const turmaController = require('./controllers/turma')
const atividadeController = require('./controllers/atividade')

routes.post('/professores', professorController.create)
routes.get('/professores', professorController.read)

routes.post('/login', professorController.login)

routes.post('/turmas', turmaController.create)
routes.get('/turmas/:id', turmaController.read)
routes.get('turmas/:id', turmaController.remove)

routes.post('/atividades', atividadeController.create)
routes.get('/atividades/:id', atividadeController.read)

module.exports = routes