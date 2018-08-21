const express = require('express');
let app = express();
let CORS = require('cors')();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {Nuxt, Builder} = require('nuxt');
let config = require('../nuxt.config.js');
const routes = require('./routes');
const fs = require('fs');

const session = require('express-session');
const passport = require('./utils/passport');

process.env.PORT = 80

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 80

app.set('port', port)

app.use(session({
    secret : '#123#123#asd#qwe#zxc#qwer#128*(*&asdjkwhereareyoufrom', 
    resave: false,
    saveUninitialized: false,
    cookie:{ maxAge: 1000*60*60*24*7 }
}));

let allowCORS = function(req, res, next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    (req.method === 'OPTIONS') ?
    res.send(200) :
    next();
}

app.use(allowCORS)

config.dev = !(process.env.NODE_ENV === 'production');

app.use(passport.initialize());
app.use(passport.session());
app.use(CORS);

//const {good, order, purchase, user} = require('./models')


let nuxt = new Nuxt(config);

const http = require('http');
let server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/uploads/:filename',(req,res)=>{
    let file = __dirname + '/uploads/'+ req.params.filename;
    fs.readFile(file,(err,data)=>{
        res.end(data);
    });
});

if(config.dev){
    let builder = new Builder(nuxt);
    builder.build();
}

app.use('/api', routes);
app.use(nuxt.render);

server.listen(port, host, () =>{
    console.log("server is now on 80 port")
});

let db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost:27017/shopdemoDB');
