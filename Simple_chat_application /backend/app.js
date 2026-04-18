import { WebSocketServer , WebSocket} from "ws";

const wss = new WebSocketServer({ port: 8080 });

let usercount=0;
let allsockets:WebSocket[]=[];

wss.on("connection",(socket)=>{
    usercount=usercount+1;
    allsockets.push(socket);
    console.log("New client connected, total users: "+usercount);
    socket.on("message",(message)=>{
        console.log("Received message: "+message.toString());
        for(let i=0;i<allsockets.length;i++){
            if(allsockets[i]!==socket){
                allsockets[i].send(message.toString());
            }
        }
    });

});

