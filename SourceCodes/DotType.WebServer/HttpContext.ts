import { IHttpContext } from "./Interfaces/IHttpContext";
import { IServerResponse } from "./Interfaces/IServerResponse";
import { IServerRequest } from "./Interfaces/IServerRequest";

/** Represents a web server  http context. */
export class HttpContext implements IHttpContext
{
    /** Gets or sets the server request. */
    public Request: IServerRequest;    
    
    /** Gets or sets the server response. */
    public Response: IServerResponse;

    /**
     * Initializes a new instance of HttpContext class.
     * @param request The Server requset.
     * @param response The server response.
     */
    constructor(request: IServerRequest, response: IServerResponse)
    {
        Check.IsNullOrUndefined(request);
        Check.IsNullOrUndefined(response);
        
        this.Request = request;
        this.Response = response;
    }
}