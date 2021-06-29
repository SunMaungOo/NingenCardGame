export class ClientMessage{

    _channelName:string;

    _message:string;

    constructor(channelName:string,message:string){

        this._channelName = channelName;

        this._message = message;

    }

    getChannelName():string{
        return this._channelName;
    }

    getMessage():string{
        return this._message;
    }
}

export class RegisterMessage{

    _channelName:string;

  
    constructor(channelName:string){
        this._channelName = channelName;
    }

    getChannelName():string{
        return this._channelName;
    }
}