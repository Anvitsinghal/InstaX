import { Server } from "socket.io"; 

import express from "express"
import http from "http"

const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"https://localhost:5173",
        methods:['GET','POST']
    }
})

const userSocketmap={};

io.on('connection',(socket)=>{
    const userId=socket.handshake.query.userId;
    if(userId){
        userSocketmap[userId]=socket.id;
    }
    io.emit('getOnlineUsers',Object.keys(userSocketmap));
    socket.on('disconnect',()=>{
        if(userId){
            delete userSocketmap[userId];
        }
        io.emit('getOnlineUsers', Object.keys(userSocketmap));
    })
})

export {app,server,io};
