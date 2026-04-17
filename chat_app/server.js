const express=require('express')
const app=express()
const http=require('http')
const server=http.createServer(app)
const { Server }=require('socket.io')
const statusMonitor=require('express-status-monitor')

const io=new Server(server)

app.use(statusMonitor())

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

io.on('connection',(socket)=>{
    console.log('a user connected')

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })

    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
})

server.listen(3000,()=>{
    console.log('listening on *:3000')
})