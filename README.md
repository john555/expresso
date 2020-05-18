# Expresso

This is an **experimental** for a routing system for [Deno](https://deno.land/).

## Installation requirements

- [Deno](https://deno.land/#installation)

## How to run

```
git clone https://github.com/john555/expresso.git
cd expresso
deno run --allow-net example.ts
```

Go to Postman and hit the routes following example.

## Example

```ts
import { expresso } from "./library/index.ts";

const app = expresso();

app.get("/", (req: object, res: { json: Function }) => {
  res.json({ message: "Hello world", req });
});

// Adding this to prevent the server from crashing
// Modern browsers will make this request and cause the server to crash
// PS. We do not have support for 404 requests at the moment
app.get("/favicon.ico", (req: object, res: { json: Function }) => {
  res.json({ message: "Hello world, from faviconbrequest", req });
});

app.post("/post", (req: object, res: { json: Function }) => {
  res.json({ message: "Hello world from POST", req });
});

app.listen(() => {
  console.log(`Server running at http://localhost:${app.serverOptions.port}/`);
});
```
