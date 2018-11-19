const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/imooc-recruit'

mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
  console.log("mongodb connected");
})

const models = {
  user: {
    username: {type: String, require: true},
    password: {type: String, require: true},
    type: {type: String, require: true},
    avatar: {type: String},
    desc: {type: String},
    jobTitle: {type: String},
    company: {type: String},
    money: {type: String}
  },
  chat: {
    chatid: {type: String, require: true},
    from: {type: String, require: true},
    to: {type: String, require: true},
    content: {type: String, require: true, default: ''},
    create_time: {type: Number, default: Date.now},
    read: {type: Boolean, default: false}
  }
}

for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name){
    return mongoose.model(name)
  }
}
