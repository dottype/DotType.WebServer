# DotType.WebServer
DotType.WebServer is a lightweight, fast [Node.js](https://nodejs.org/en) based web server written 
in [Typescript](https://www.typescriptlang.org).

## Build
We are using [Visual Studio Code](https://code.visualstudio.com) to build the sources.  
Open the Visual Studio Code, press ctrl+shift+B (cmd+shift+B on mac) and choose build.

## Installation
No installation needed, justo copy the files to the desired directory, open "Build" 
directory in bash and run the following 
command:

```
node Program
```

## Using
Everything in DotType.WebServer is middleware, even cookies, session and favicon. You can 
create your own middleware by implementing the "IMiddleware" interface.

Example of a simple middleware:

```typescript

export class MyMiddleware implements IMiddleware
{
    Name: string = "MyMiddleware"; //The middleware name.
    Version: string = "0.0.1"; //The middleware version.
    Order: number = 0; //The middleware execution order
    
    public async OnRequestAsync(httpContext: IHttpContext, caller: IMiddleware): Promise<void>
    {
        await httpContext.Response.WriteAsync("Hello from MyMiddleware!!!");
    }

    public async OnErrorAsync(exception: Exception): Promise<void>
    {
        console.error(exception);
    }    
}

```

And the Program.ts file:

```typescript
import { WebServer } from "./DotType.WebServer/WebServer";
import { MyMiddleware } from "./MyMiddleware";

new WebServer()
    .UseMiddleware(new MyMiddleware())
    .RunAsync();
```