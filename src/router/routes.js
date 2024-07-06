import express from "express";
import socketRouter from  "./socket.js"


const router = express.Router();

export default ()=>{
    socketRouter(router)
    return router;
}