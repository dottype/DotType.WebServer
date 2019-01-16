import { WebServer } from "./DotType.WebServer/WebServer";
import { CookieMiddleware } from "./Middleware/DotType.WebServer.Cookie/CookieMiddleware";
import { SessionMiddleware } from "./Middleware/DotType.WebServer.Session/SessionMiddleware";
import { SessionManager } from "./Middleware/DotType.WebServer.Session/SessionManager";
import { FaviconMiddleware } from "./Middleware/DotType.WebServer.Favicon/FaviconMiddleware";
new WebServer()
    .UseMiddleware(new CookieMiddleware())
    .UseMiddleware(new SessionMiddleware(new SessionManager()))
    .UseMiddleware(new FaviconMiddleware())
    .RunAsync();