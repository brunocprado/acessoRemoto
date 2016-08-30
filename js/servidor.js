"use strict"

//var http       = require('http');
//var requisicao = require('httpdispatcher');
//
//http.createServer(function(req,res) {
//    
//    requisicao.dispatch(req,res);
//}).listen(3000);
//
//requisicao.onPost("/",function(req,res){
////    console.log(req.params);
//    res.header("Access-Control-Allow-Origin", "*");
//    //req.params.codigo = 'res.write(10*10);';
//    //eval('res.write("aaaa");');
//});
//
//requisicao.onGet("/",function(req,res){
//   console.log(req.params); 
//});
//
//console.log('Servidor iniciado em localhost:3000. Ctrl+C para encerrar…');

const KEY = 'secao';
const SECRET = 'senha';

var express = require('express');
var app = express();
//  , cookieParser = require('cookie-parser')
//  , expressSession = require('express-session')
//  , server = require('http').createServer(app)
//  , io = require('socket.io').listen(server)
//  , cookie = cookieParser(SECRET)
//  , store = new expressSession.MemoryStore()
//;
var bodyParser = require('body-parser')
require('shelljs/global');


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
//
//app.use(cookie);
//app.use(expressSession({
//  secret: SECRET,
//  name: KEY,
//  resave: true,
//  saveUninitialized: true,
//  store: store
//}));

app.post('/cmd', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var resposta = "";
    eval(req.body.cmd);
    res.writeContinue(resposta);
});

app.post('/shell', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    exec(req.body.cmd, function(status, saida) {
        console.log(saida);
        res.write(saida);
    });
    res.end();
});

app.listen(3000, function () {
  console.log('Servidor iniciado!');
});