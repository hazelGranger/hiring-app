const express = require('express')
const Router = express.Router()
const utils = require('utility')

const models = require('./model')
const User = models.getModel('user')

Router.get('/list', function(req, res){
  User.find({}, function(err,doc){
    return res.json(doc)
  })
})

// Router.get('/remove', function(req, res){
//   User.remove({}, function(err,doc){
//     res.json(doc)
//   })
// })

Router.post('/register', function(req, res) {
  const { username, password, type } = req.body
  User.findOne({username},function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: "Unavailable username!"})
    }else {
      User.create({ username, password: md5Password(password), type }, function (err, doc){
        if (err) {
          return res.json({code: 1, msg: "Server Error!"})
        }else{
          return res.json({code: 0})
        }
      })
    }
  })
})

Router.post('/login', function(req, res){
  const {username, password} = req.body
  User.findOne({ username, password: md5Password(password) }, function(err,doc){
    if (err) {
      return res.json({code: 1, msg: "Server Error!"})
    }
    if (!doc) {
      return res.json({code: 1, msg: "Wrong username or password"})
    }else{
      return res.json({code: 0, data: doc})
    }
  })
})


// Router.get('/info', function(req, res){
//   return res.json({code: 1})
// })
function md5Password(password){
  const salt = 'imooc_awesome_398ex@#5d~nd23_forever'
  return utils.md5(utils.md5(password+salt))
}

module.exports = Router
