import { broadCastMessage } from "../controllers/socketController.js";

export default  (router) => {
    router.post("/websocket/create",broadCastMessage)
}