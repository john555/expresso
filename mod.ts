import { Expresso, IServerOptions } from "./deps.ts";

export function expresso(serverOptions?: IServerOptions) {
  return new Expresso(serverOptions);
}
