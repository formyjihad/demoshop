const express = require('express');     //익스프레스.js == node.js 프레임 워크
let app = express();                    // app 로드. express사용

const bodyParser = require('body-parser');      //라우터 확인
const mongoose = require('mongoose');           //DB

const {Nuxt, Builder} = require('nuxt');        //NUXT
let config = require('../nuxt.config.js');      //NUXT config
const routes = require('./routes');             //라우터 파일
const fs = require('fs');                       //File system. == file upload
const SESSION_SECRET_KEY = require('../config/constants.js')

const session = require('express-session');     //세션
const passport = require('./utils/passport');                   //로그인 인증 passport.js
const mongoStore = require('connect-mongo')(session);           //몽고 DB 연결
const host = process.env.HOST || '127.0.0.1'                    //환경
const port = process.env.PORT || 3000                           //포트설정

app.set('port', port)                                           //app 포트 설정


app.use(bodyParser.json());                                     //라우터 확인용 바디파서 사용
app.use(bodyParser.urlencoded({extended:false}));               //url 인코딩 기능
app.use(session({
    secret : SESSION_SECRET_KEY, 
    resave: false,
    saveUninitialized: false,
    cookie:{ maxAge: 1000*60*60*24*7 },
    store:new mongoStore({
        url:'mongodb://localhost:27017/shopdemoDB',
        collection:'sessions'
    })
}));                                                            //세션 설정

config.dev = !(process.env.NODE_ENV === 'production');          //run dev 설정

app.use(passport.initialize());                                 //로그인 인증 passport 사용
app.use(passport.session());

let nuxt = new Nuxt(config);

const http = require('http');
let server = http.createServer(app);


app.get('/uploads/:filename',(req,res)=>{
    let file = __dirname + '/uploads/'+ req.params.filename;
    fs.readFile(file,(err,data)=>{
        res.send(data);
    });
});                                     //이미지 송출

if(config.dev){
    let builder = new Builder(nuxt);
    builder.build();
}
app.use('/api', routes);                    //라우트
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
