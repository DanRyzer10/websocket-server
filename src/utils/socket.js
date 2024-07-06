import { Server } from "socket.io";
import chalk from "chalk";

let io = null;

function init(httpServer){
    io = new Server(httpServer,{
        connectionStateRecovery:{
            maxDisconnectionDuration: 1000,
        },
        
    })
    io.on("connection",(socket)=>{
        console.log(chalk.green(`new connection ${socket.id}`))

        socket.on("message",(message)=>{
            console.log("hello")
            io.emit("message",message)
        })
        socket.on("disconnect",()=>{
            console.log(chalk.yellow(`disconnected ${socket.id}`))
        })
    })
    return io;
}

function getIO(){
    if(!io){
        throw new Error("Socket.io not initialized")
    }
    return io;
}

export {init, getIO};