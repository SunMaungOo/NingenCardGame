import {WebSocketServer} from "./network-server";

const server = new WebSocketServer();
server.listen(3000).then(()=>{
    console.log("Server started at http://localhost:3000");
});




