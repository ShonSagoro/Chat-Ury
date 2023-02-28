import express from "express";
import morgan from "morgan";
import {Server as SocketServer} from "socket.io";
import http from "http";
import cors from "cors";
import {PORT} from "./config.js";



const app = express(); //express tiene su propio servidor http
const server=http.createServer(app); //lo hacemos un servidor http compatible
const io=new SocketServer(server, {
    cors:{
        origin: 'http://127.0.0.1:5173'
    }
});// se lo damos a socket.io


app.use(cors());
app.use(morgan("dev"));
const preferences = {};
const users = [];

io.on('connection', (socket)=>{
    
    
    //retorna la lista

    socket.on('update',()=>{
        socket.emit('update',users);
    });

    console.log("New client", socket.id);

    if (preferences[socket.id] === undefined) {
        preferences[socket.id] = {
          username: socket.id,
          id: socket.id
        };
    }
    
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
        socket.disconnect;
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

    // const sendDestinationMessage=(messageObject, socket)=>{
    //     console.log(preferences[socket.id].username, messageObject.body,"to ->",preferences[messageObject.to].username);
            
    //     io.to(messageObject.to).emit('message', {
    //         type:messageObject.type,
    //         body:messageObject.body,
    //         file:messageObject.file,
    //         mimeType: messageObject.mimeType,
    //         filename:messageObject.filename,
    //         from: preferences[socket.id].username,
    //     });

    // }

server.listen(PORT);
console.log("Server stared on port ",PORT);
