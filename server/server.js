const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRoute = require('./user')
const model = require('./model')
const Chat = model.getModel('chat')

const app = express()


// work with Express

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

app.use(cookieParser()).use(bodyParser.json()).use('/user', userRoute)

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
