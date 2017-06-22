const express = require('express');
const h2 = require('spdy')
// const h2 = require('http2')
// const h2 = require('https')
const fs = require('fs')
const path = require('path')
const debug = require('debug') ('server')
const spParser = require('h2-server-push')
// const spParser = require('../h2-server-push/themiddleware.js')
// HTTP2
// express.request.__proto__ = h2.IncomingMessage.prototype;
// express.response.__proto__ = h2.ServerResponse.prototype;
const app = express();

// HTTP
// app.use(express.static('.'))

// HTTP2
// const jq = fs.readFileSync('./jquery.min.js')
// const processing = fs.readFileSync('./processing.min.js')
// const index = fs.readFileSync('./index.html')
// app.get('/', (req, res) => {
//   let push = res.push('/jquery.min.js')
//   push.writeHead(200)
//   fs.createReadStream(path.join(__dirname, '/jquery.min.js')).pipe(push);
//   push = res.push('/processing.min.js')
//   push.writeHead(200)
//   fs.createReadStream(path.join(__dirname, '/processing.min.js')).pipe(push);
//   res.end(index);
// })


// //SPDY
app.get('/', spParser,  (req, res) =>{
    console.log('hello')
    res.sp('index.html')
})


//EVERYTHING HTTP HTTP2 SPDY
const PORT = 3000;
h2.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}, app)

.listen(PORT, (err) => {   if(err) {
    debug(`error!!!!!!!:${err}`)
        throw new Error(err)
    }
    debug(`listening at localhost:${PORT}`)
})