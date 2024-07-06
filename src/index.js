import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"
import { init } from "./utils/socket.js";
import router from "./router/routes.js"
const port = process.env.PORT || 3000;

import {createServer} from "node:http";
const app = express();
app.use(logger("dev"))
app.use(cors())
app.use(express.json())
app.use(cookieParser())
const server = createServer(app);

init(server);

app.get("/",(req,res) =>{
    res.sendFile(process.cwd() + "/public/index.html")
});
app.use("/api",router());

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})