import { assert } from "./test_deps.ts";
import { Expresso } from "./deps.ts";
import { expresso } from "./mod.ts";

Deno.test("expresso returns an application instance", () => {
  const app = expresso();
  assert(app instanceof Expresso);
});
