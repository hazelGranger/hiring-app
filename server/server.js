import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import React from 'react'

import userRoute from './user'
import model from './model'
const Chat = model.getModel('chat')

const app = express()

const server = require('http').Server(app)

const io = require('socket.io')(server)


app.get('/removemsg', function(req, res){
  Chat.remove({}, function(err,doc){
    res.json(doc)
  })
})

app.get('/msgs', function(req, res){
  Chat.find({}, function(err,doc){
    res.json(doc)
  })
})

io.on('connection',function(socket){
  socket.on('sendMsg', function (data) {
    const { from, to, msg } = data
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid, from, to, content: msg}, function(err, doc){
      if (!err) {
        io.emit('receiveMsg', Object.assign({},doc._doc))
      }
    })
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRoute)
// app.use(function (req, res, next) {
//   if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
//     return next()
//   }
//   // console.log(path.resolve('build/'), 'path');
//   return res.send(renderToStaticMarkup(Test()))
//   //return res.sendFile(path.resolve('build/index.html'))
// })
// app.use('/',express.static(path.resolve('build')))
const port = 9093;

server.listen(port,function(){
  console.log('Server is running at ' + port + " !");
})

// const User = mongoose.model('user', new mongoose.Schema({
//   username: {
//     type: String,
//     require: true
//   },
//   age: {
//     type: Number,
//     require: true
//   }
// }))

// create

// User.create({
//   username: 'test',
//   age: 12
// }, function(err, doc){
//   if (!err) {
//     console.log(doc);
//   }else {
//     console.log(err);
//   }
// })


// remove / delete

// User.remove({age: 12}, function(err, doc){
//     if (!err) {
//       console.log(doc);
//     }else {
//       console.log(err);
//     }
// })


// update

// User.update({username: 'test'},{'$set': {age: 30}}, function (err,doc) {
//   if (!err) {
//     console.log(doc);
//   }else{
//     console.log(err);
//   }
// })

// app.get('/', function(req,res){
//   res.send("On board!");
// })
//
// app.get('/data', function(req,res){
//   res.json({
//     name: 'Express',
//     age: 7
//   })
//   User.find({age: 27}, function(err,doc){
//     res.json(doc)
//   })
// })

// app.get('/user', function(req,res){
//   // res.json({
//   //   name: 'Express',
//   //   age: 7
//   // })
//   User.findOne({username: 'Hazel'}, function(err,doc){
//     res.json(doc)
//   })
// })


//
// app.get('/test', function(req,res){
//   res.send("<h2>hahaha</h2>")
// })
