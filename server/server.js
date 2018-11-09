const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRoute = require('./user')

const app = express()

app.use(cookieParser()).use(bodyParser.json()).use('/user', userRoute)

const port = 9093;

app.listen(port,function(){
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
