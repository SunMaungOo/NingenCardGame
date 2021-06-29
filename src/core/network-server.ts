import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import {ClientMessage,RegisterMessage} from "./network-data";

export interface Server{

    /**
     * Create a server
     * Return whether the server have been created
     * @param port port of server
     */
    listen(port: number): Promise<boolean>;

}


export class WebSocketServer implements Server{
    
    _webSocketServer:WebSocket.Server|null;

    _channels:Map<string,Array<WebSocket>>;

    constructor(){

        this._webSocketServer = null;

        this._channels = new Map<string,Array<WebSocket>>();

    }

    listen(port: number): Promise<boolean> {

        const app = express();
        
        const server = http.createServer(app);

        this._webSocketServer = new WebSocket.Server({server});

        return new Promise((resolve,reject)=>{

            server.listen(port,()=>{

                if(this._webSocketServer){

                    this._webSocketServer.on("connection",this._onNewClient.bind(this));

                    resolve(true);

                }else{
                    resolve(false);
                }
            });

        });
    }

    /**
     * 
     * @param newClient new connected client
     */
    _onNewClient(newClient:WebSocket){

        newClient.on("message",(message:string)=>{

            const messageObj = this._parseMessage(message);

            if(messageObj instanceof RegisterMessage){

                this._registerClient((messageObj as RegisterMessage),newClient);

            }else if(messageObj instanceof ClientMessage){

                const clientMessage = messageObj as ClientMessage;

                this._broadcastMessage(newClient,
                    clientMessage.getChannelName(),
                    clientMessage.getMessage());

            }else{
                return;
            }

        });
    }

    _parseMessage(message:string):ClientMessage|RegisterMessage|null{

        if(!message){
            return null;
        }

        let jsonObj = JSON.parse(message);

        //check whether we have channelName property and it have string value

        if(!(jsonObj["channelName"] && 
        this._isString(jsonObj["channelName"]))){
            return null;
        }

        if(jsonObj["message"]){

            if(!this._isString(jsonObj["message"])){
                return null;
            }

            return new ClientMessage(jsonObj["channelName"],jsonObj["message"]);

        }else{
            return new RegisterMessage(jsonObj["channelName"]);
        }
    }

    _isString(data:any):boolean{
        return typeof data==="string" || data instanceof String;
    }
    /**
     * Register a client to the channel
     * @param data 
     * @param client client to register
     */
    _registerClient(data:RegisterMessage,client:WebSocket){

        if(!data){
            return;
        }

        const channelName = data.getChannelName();

        if(!channelName){
            return false;
        }

        let clients = new Array<WebSocket>();

        //get previous client in the channel

        if(this._channels.has(channelName)){

            clients = (this._channels.get(channelName) as Array<WebSocket>);

        }

        const isClientRegistered = clients.indexOf(client)>0;

        if(isClientRegistered){
            return;
        }

        clients.push(client);

        this._channels.set(channelName,clients);

        return true;

    }

    /**
     * Get the client connected to the channel
     * @param channelName 
     */
    _getClients(channelName:string):Array<WebSocket>{

        if(!channelName){
            return new Array<WebSocket>();
        }

        if(!this._channels.has(channelName)){
            return new Array<WebSocket>(); 
        }

        return (this._channels.get(channelName) as Array<WebSocket>);
    }

    /**
     * Broadcast the message to everyone in the channel
     * excluding the sender
     * @param sender 
     * @param channelName
     * @param message 
     */
    _broadcastMessage(sender:WebSocket,channelName:string,message:string){

        if(!(sender && channelName && message)){
            return;
        }

        this._getClients(channelName).forEach((client:WebSocket)=>{

            if(client!=sender){

                client.send(message);
            }

        });
    }
}
