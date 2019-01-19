import { IncomingMessage } from "http";
import { IServerRequest } from "./Interfaces/IServerRequest"
import { Collection } from "dottype/Collections/Collection<T>";
import { NameValueObject } from "dottype.utils/NameValueObject";
import { ArgumentNullException } from "dottype/Exceptions/ArgumentNullException";

export class Request implements IServerRequest
{
    public readonly HttpVersion: string;    
    public readonly Headers: Collection<NameValueObject> = new Collection<NameValueObject>();
    public readonly Method: string = "";
    public readonly Url: string = "";
    public readonly StatusCode: number = 0;
    public readonly StatusMessage: string = "";

    /** 
     * Initializes a new instance of Request 
     * @param incomingMessage The incoming message object (imported from Node http module)
     */
    constructor(incomingMessage: IncomingMessage)
    {
        if(incomingMessage == null)
        {
            throw new ArgumentNullException("incomingMessage");
        }
       
        for(var item in incomingMessage.headers) 
        {
            this.Headers.Add(new NameValueObject(item, incomingMessage.headers[item]));
        }        

        this.HttpVersion = incomingMessage.httpVersion;
        if(incomingMessage.method)
            this.Method = incomingMessage.method;
        if(incomingMessage.url)
            this.Url = incomingMessage.url;
        if(incomingMessage.statusCode)
            this.StatusCode = incomingMessage.statusCode;
        if(incomingMessage.statusMessage)
            this.StatusMessage = incomingMessage.statusMessage;
    }
}