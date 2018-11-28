import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import csshook from 'css-modules-require-hook/preset'
import assetHook from 'asset-require-hook'

assetHook({
    extensions: ['png'],
    limit: 8000
})

// SSR using
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import thunk from 'redux-thunk'
import staticPath from '../build/asset-manifest.json'
import reducer from '../src/redux'
import App from '../src/App'

import path from 'path'
import userRoute from './user'
import model from './model'

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const Chat = model.getModel('chat')

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
app.use(function(req, res, next){
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }
  const context = {}
  const store = createStore(reducer, compose(applyMiddleware(thunk)))

  const domNodes = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )

  const page = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <title></title>
      <link rel="stylesheet" href="${staticPath['main.css']}">
      <link rel="stylesheet" href="${staticPath['chunk.css']}">
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root">${domNodes}</div>
      <script src="${staticPath['chunk.js']}"></script>
      <script src="${staticPath['main.js']}"></script>
      <script src="${staticPath['runtime~main.js']}"></script>
    </body>
  </html>
`

  return res.send(page)
})

// static files
app.use('/', express.static(path.resolve('build')))

const port = 9093;

server.listen(port,function(){
  console.log('Server is running at ' + port + " !");
})
