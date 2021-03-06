import { IServerResponse } from "dottype.hosting/Interfaces/IServerResponse";
import { ServerResponse } from "http";
import { NameValueObject } from "dottype.utils/NameValueObject";
import { Collection } from "dottype/Collections/Collection<T>";
import { ArgumentNullException } from "dottype/Exceptions/ArgumentNullException";

/** Represents a http context response class */
export class Response implements IServerResponse
{
    /** Gets the Http Server response object. */
    private serverResponse: ServerResponse;

    /** Contains the write buffer. */
    private writeBuffer: string[] = [];
    
    /** Contains the server status code buffer.*/
    private statusCodeBuffer: number = 200;

    /** Contains the server response headers buffer. */
    private headersBuffer: Collection<NameValueObject> = new Collection<NameValueObject>();

    public ContentType: string | null = null;

    public get StatusCode(): number
    {
        return this.statusCodeBuffer;
    }

    public set StatusCode(statusCode: number)
    {
        this.statusCodeBuffer = statusCode;
    }

    /**
     * Initializes a new instance of Response class.
     * @param serverResponse The ServerResponse object (imported from Node http module).
     */
    constructor(serverResponse: ServerResponse)
    {
        if(serverResponse == null)
        {
            throw new ArgumentNullException("serverResponse");
        }
        
        this.serverResponse = serverResponse;
    }

    public OnEnd: Collection<(...args: any[])=>void> = new Collection<(...args: any[])=>void>();

    public async EndAsync(): Promise<void>;

    public async EndAsync(chunk?: any): Promise<void>
    {
        try
        {
            this.OnEnd.ForEach(item =>
            {
                item.call(item);
            });
            this.OnEnd.Clear();
        }
        catch(exception)
        {
            console.log(exception);
        }

        await this.ReleaseStatusCode();
        await this.ReleaseHeadersBufferAsync();
        await this.ReleaseWriteBufferAsync();
        
        this.EndResponse(chunk);
    }

    public async WriteAsync(text: string): Promise<void>
    {
        this.writeBuffer.push(text);
    }

    public SetHeader(name: string, value: string)
    {
        if(name == null)
        {
            throw new ArgumentNullException("name");
        }
        if(value == null)
        {
            throw new ArgumentNullException("value");
        }

        this.headersBuffer.Add(new NameValueObject(name, value));
    }

    /** The overload base for Response.End function. */
    private EndResponse(chunk: any): void
    {
        this.serverResponse.end(chunk);
    }

    private async ReleaseWriteBufferAsync(): Promise<void>
    {
        this.writeBuffer.forEach(item => 
        {
            this.serverResponse.write(item, "utf-8");
        });
        this.writeBuffer = [];
    }

    private async ReleaseHeadersBufferAsync(): Promise<void>
    {
        this.headersBuffer.ForEach(item =>
        {
            this.serverResponse.setHeader(item.Name, item.Value);
        });

        this.headersBuffer.Clear();

        if(this.ContentType)
        {
            this.serverResponse.setHeader("Content-Type", this.ContentType);
            this.ContentType = null;
        }
    }

    private ReleaseStatusCode(): void
    {
        this.serverResponse.statusCode = this.StatusCode;
    }
}