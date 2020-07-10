import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { NotFound } from "./404.ts";
import router from "./routes.ts";

const app = new Application();
const PORT = Deno.env.get("PORT") || 5000;
const HOST = Deno.env.get("HOST") || "http://localhost";

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(NotFound);

console.log(`🚀 server started at ${HOST}:${PORT}`);
await app.listen({ port: Number(PORT) });
