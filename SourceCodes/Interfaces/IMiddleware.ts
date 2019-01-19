import { IHttpContext } from "./IHttpContext";
import { Exception } from "dottype/Exceptions/Exception";

/**
 * Represents the interface used by all server middleware.
 */
export interface IMiddleware
{
    /** Gets or sets the middleware name. */
    Name: string;

    /** Gets or sets the middleware version. */
    Version: string;

    /** Gets or sets the middleware execution order. */
    Order: number;

    /** Event that will be executed on server request. */
    OnRequestAsync(httpContext: IHttpContext, caller: IMiddleware): Promise<void>;

    /** Event that will be execute on server error */
    OnErrorAsync(exception: Exception): Promise<void>;
}