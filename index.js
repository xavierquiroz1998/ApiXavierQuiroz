const express = require('express')
var app = express()
const usuarios = require('./routes/usuarios')
const departamentos = require('./routes/departamentos')
const empresas = require('./routes/empresas')
const motivos = require('./routes/motivos')
const persona = require('./routes/personas')
const tipopersona = require('./routes/tipoPersona')
const menu = require('./routes/menu')
const productos = require('./routes/productos')
const body_parser = require('body-parser');
const cors = require('cors');

app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }));

app.use(cors());

app.use('/usuarios', usuarios);
app.use('/departamentos', departamentos);
app.use('/empresas', empresas);
app.use('/motivos', motivos);
app.use('/personas', persona);
app.use('/tipoPersona', tipopersona);
app.use('/menu', menu);
app.use('/productos', productos);



app.listen(process.env.PORT || 8000)
console.log('servidor', process.env.PORT || 8000)



