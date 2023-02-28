import express from "express";
import morgan from "morgan";
import {Server as SocketServer} from "socket.io";
import http from "http";
import cors from "cors";
import {PORT} from "./config.js";
import { RateLimiterMemory } from "rate-limiter-flexible";



const app = express();
const server=http.createServer(app); 
const io=new SocketServer(server, {
    cors:{
        origin: 'http://127.0.0.1:5173'
    }
});// se lo damos a socket.io


app.use(cors());
app.use(morgan("dev"));
const preferences = {};
const users = [];
let state={};

io.on('connection', (socket)=>{

    rateLimiter.consume(socket.handshake.address, 2).
    then((data)=>{
        socket.emit('news', { data: data });
        socket.broadcast.emit('news', { data: data });
        console.log("New client", socket.id);
        if (preferences[socket.id] === undefined) {
            preferences[socket.id] = {
              username: socket.id,
              id: socket.id
            };
        }
        state=data;
        console.log(state);
    }).catch((rejRes)=>{
        socket.emit('blocked', { retryMs: rejRes.msBeforeNext });
        console.log(`Rate limit exceeded for socket id ${socket.Id}. Rejected with code ${rejRes}`);
        socket.disconnect(true)
    })
    
    //retorna la lista

    socket.on('update',()=>{
        socket.emit('update',users);
    });
    
    socket.on("getState",()=>{
        socket.emit('getState',state);
    })
 
    
    socket.on('addNameUser', (name)=>{
        const nameUsed=Object.values(preferences).filter((x)=> x.username.includes(name));
        
        if(nameUsed[0]!=undefined){
            console.log("Ya ocupado el nombre");
            socket.emit('addNameUser',null);
        }else{
            preferences[socket.id].username=name;
            users.push(preferences[socket.id])
            
            console.log("Nombre del usuario: ", preferences[socket.id].username);
            socket.emit('addNameUser',{
                username: preferences[socket.id].username,
                id: socket.id,
            });
        }
    })
      
    socket.on('disconected', ()=>{
        preferences[socket.id] = undefined;
        console.log(socket.id, "disconnected")
        socket.disconnect(true);
    })


    socket.on('message', (messageObject)=>{
        console.log("to: ",messageObject.to);
        console.log("from: ",messageObject.from);
        sendGeneralMessage(messageObject,socket)
        
        })    
    })

const sendGeneralMessage=(messageObject, socket)=>{
    console.log(preferences[socket.id].username, messageObject.body);
    console.log(messageObject.to);
        
    socket.broadcast.emit('message', {
        type:messageObject.type,
        body:messageObject.body,
        file:messageObject.file,
        mimeType: messageObject.mimeType,
        filename:messageObject.filename,
        to:messageObject.to,
        from: preferences[socket.id].username,
    });

}

server.listen(PORT);

const rateLimiter= new RateLimiterMemory({
    points: 10,
    duration: 60, //60 seconds
})

console.log("Server stared on port ",PORT);