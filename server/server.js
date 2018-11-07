const express = require('express');

const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/imooc'

mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
  console.log("mongodb connected");
})

const app = express()

const port = 9093;

const User = mongoose.model('user', new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  }
}))

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



app.listen(port,function(){
  console.log('Server is running at ' + port + " !");
})

app.get('/', function(req,res){
  res.send("On board!");
})

app.get('/data', function(req,res){
  // res.json({
  //   name: 'Express',
  //   age: 7
  // })
  User.find({age: 27}, function(err,doc){
    res.json(doc)
  })
})

app.get('/user', function(req,res){
  // res.json({
  //   name: 'Express',
  //   age: 7
  // })
  User.findOne({username: 'Hazel'}, function(err,doc){
    res.json(doc)
  })
})



app.get('/test', function(req,res){
  res.send("<h2>hahaha</h2>")
})
