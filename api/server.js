const express = require('express')
const cors = require('cors')

const app = express()
const routes = require('./src/routes')


app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(routes)




app.listen(3001, (req,res) => {
    console.log(`Servidor rodando em http://localhost:3001`);
});