import { expresso } from "./routing/Expresso.ts";

const app = expresso();

app.get("/", (req: object, res: { json: Function }) => {
  res.json({ message: "Hello world", req });
});

app.get("/favicon.ico", (req: object, res: { json: Function }) => {
  res.json({ message: "Hello world, from faviconbrequest", req });
});

app.post("/post", (req: object, res: { json: Function }) => {
  res.json({ message: "Hello world from POST", req });
});

app.listen(() => {
  console.log(`Server running at http://localhost:${app.serverOptions.port}/`);
});
