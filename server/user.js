const express = require('express')
const Router = express.Router()
const utils = require('utility')

const models = require('./model')
const User = models.getModel('user')

const _userfilter = {'password': 0, '_v': 0}

Router.get('/list', function (req, res) {
  const {type} = req.query
  User.find({type},_userfilter,function(err, doc){
    if (err) {
      return res.json({code: 1, msg: err})
    }else {
      return res.json({code: 0, data: doc})
    }
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
      // in order to get id from mongodb for cookie 为了得到id给cookie存储
      const userModel = new User({ username, password: md5Password(password), type })
      userModel.save(function (err, doc){
        if (err) {
          return res.json({code: 1, msg: "Server Error!"})
        }else{
          const {username, type, _id} = doc
          res.cookie('userid', _id)
          return res.json({code: 0, data: {username, type, _id}})
        }
      })
    }
  })
})

Router.post('/login', function(req, res){
  const {username, password} = req.body
  User.findOne({ username, password: md5Password(password) }, _userfilter, function(err,doc){
    if (err) {
      return res.json({code: 1, msg: "Server Error!"})
    }
    if (!doc) {
      return res.json({code: 1, msg: "Wrong username or password"})
    }else{
      res.cookie('userid', doc._id)
      return res.json({code: 0, data: doc})
    }
  })
})


Router.get('/info', function(req, res){
  const { userid } = req.cookies
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _userfilter, function(err, doc){
    if (err) {
      return res.json({ code: 1, msg: "Server Error!"})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
})


Router.post('/update', function(req, res){
  const { userid } = req.cookies
  if (!userid) {
    return res.json({code:1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function(err, doc){
    console.log(body, "body");
    if (err) {
      return res.json({code:1, msg:"Server Error!"})
    }else{
      const data = Object.assign({},{
        user: doc.username,
        type: doc.type
      }, body)
      return res.json({code:0, data})
    }
  })
})


function md5Password(password){
  const salt = 'imooc_awesome_398ex@#5d~nd23_forever'
  return utils.md5(utils.md5(password+salt))
}

module.exports = Router
