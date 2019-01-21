const express = require('express');
let app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {Nuxt, Builder} = require('nuxt');
let config = require('../nuxt.config.js');
const routes = require('./routes');
const fs = require('fs');

const session = require('express-session');
const passport = require('./utils/passport');
const mongoStore = require('connect-mongo')(session);
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret : '#DNCRAFT$NUMBER@SECRET!GIRLSFRONTLINE^AZURLANE&', 
    resave: false,
    saveUninitialized: false,
    cookie:{ maxAge: 1000*60*60*24*7 },
    store:new mongoStore({
        url:'mongodb://localhost:27017/shopdemoDB',
        collection:'sessions'
    })
}));

config.dev = !(process.env.NODE_ENV === 'production');

app.use(passport.initialize());
app.use(passport.session());

let nuxt = new Nuxt(config);

const http = require('http');
let server = http.createServer(app);


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

server.listen(port, () =>{
    //console.log("server is now on " + port +" port")
});

let db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
    //console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost:27017/shopdemoDB');
