let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());



//Banco de Dados

const connection = require('./config/database.js')();

let loginRouter = require('./routes/login');
app.use('/', loginRouter);

let carrosRouter = require('./routes/carros');
app.use('/', carrosRouter);

let usuariosRouter = require('./routes/usuarios');
app.use('/', usuariosRouter);

app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err);
})



app.use((err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            msg: err.message,
            error: err
        })
})

module.exports = app;