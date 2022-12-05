const path = require('path');
const dotenv = require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const alunoRoute = require('./route/alunoRoute');
const grupoRoute = require('./route/grupoRoute');

//conecção com o mongoDB
try{
    mongoose.connect(process.env.DB_CONCT);
    console.log('Conexão com o mongoDB estabelecida com sucesso!')
}catch(erro){
    console.log('Erro na conexão com o banco :(');
    console.log(erro);
}

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(express.json())
app.use(cors({origin:"*"}))

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

//Rota de aluno
app.use(alunoRoute);
app.use(grupoRoute)

//Página raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
});

//conectando servidor
app.listen(process.env.PORT || 3000, () => {
    console.log('Up :)))')
})
