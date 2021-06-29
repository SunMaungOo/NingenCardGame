export interface Client{

    /**
     * Send a message
     * Return whether the message have been sent
     * @param message Message to send
     */
    send(message:string):Promise<boolean>;

    /**
     * Return a function which handle
     * when message is received
     */
    getMessageHandler():(message:string)=>void;

    /**
     * Return whether the client is ready
     */
    isReady():boolean;

    /**
     * Close a connection
     */
    close():void;
}

export class WebSocketClient implements Client{

    _isReady:boolean;

    _messageHandler:(message: string) => void;

    _client:WebSocket|null;

    constructor(connectionString:string,
        messageHandler:(message: string) => void){

            this._isReady = false;

            this._messageHandler = messageHandler;

            this._client = null;

            this._open(connectionString);

    }

    _open(connectionString:string){

        if(!connectionString){
            return;
        }

        this._client = new WebSocket(connectionString);

        this._client.onopen = (ev:Event)=>{
            this._isReady = true;
        };

        this._client.onerror=(ev:Event)=>{
            this._isReady = false;
        };

        this._client.onclose=(ev:Event)=>{
            this._isReady = false;
        };

        const messageHandler = this.getMessageHandler();

        if(!messageHandler){
            return;
        }

        this._client.onmessage = (ev:MessageEvent)=>{

            messageHandler(ev.data as string);

        };

    }

    send(message: string): Promise<boolean> {

        if(!message){
            return Promise.resolve(false);
        }

        if(!this.isReady()){
            return Promise.resolve(false);
        }

        if(!this._client){
            return Promise.resolve(false);
        }

        return new Promise((resolve,reject)=>{

            this._client?.send(message);

            resolve(true);
            
        });

    }

    getMessageHandler(): (message: string) => void {
        return this._messageHandler;
    }

    isReady(): boolean {
        return this._isReady;
    }

    close(): void {    
        this._client?.close();
    }

}