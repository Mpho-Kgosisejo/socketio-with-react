var app = require('http').createServer()
var io = module.exports.io = require('socket.io')(app)
const SocketManager = require('./SocketManager')


const PORT = process.env.PORT || 3231

io.on('connection', SocketManager)
app.listen(PORT, () => {
    console.log(`SocketIO connected to port: ${PORT}`)
})