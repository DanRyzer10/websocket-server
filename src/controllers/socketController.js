import express from "express";
import  {getIO} from "../utils/socket.js";
import chalk from "chalk";


export const broadCastMessage = (req,res) =>{
    /**
     * {
        tenant_uuid: 345345-fdgdfg-4334534-ddsfdf
        user_uuid: asdasd-asdasd-asdasdas-asdasd (optional)
        reference: msa-chatbot
        reference_id: #uuid message
        paylod:(message record)
        }
     */
    const  io = getIO();
    const {tenant_uuid, user_uuid, reference, reference_id, payload} = req.body;
    if(!tenant_uuid || !reference || !reference_id || !payload){
        return res.status(400).json({message:"Invalid request"})
    }
    if(!payload.message){
        return res.status(400).json({message:"Invalid request"})
    }
    if(reference!="msa-chatbot"){
        return res.status(403).json({message:"Forbidden"})
    }
    console.log(chalk.blue(`received message : ${JSON.stringify(payload)} `))
    io.emit("message",payload);
    return res.status(201).json({message:"message sent"})
}