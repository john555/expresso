import {
  serve,
  ServerRequest,
  Server,
  IExpresso,
  IServerOptions,
} from "../deps.ts";

export class Expresso implements IExpresso {
  private methodCallbackLookup: Map<string, Map<string, Function>> = new Map();
  private server?: Server | null;
  private methods: string[] = [
    "options",
    "get",
    "post",
    "put",
    "patch",
    "delete",
    "head",
  ];
  public serverOptions: IServerOptions = { port: 8000 };

  constructor(serverOptions?: IServerOptions) {
    this.server = null;
    this.init(serverOptions);
  }

  init(serverOptions?: IServerOptions): void {
    this.serverOptions = { ...this.serverOptions, ...serverOptions };

    for (const method of this.methods) {
      this.methodCallbackLookup.set(method, new Map());
    }

    // TODO: Look up a soln for dynamically creating instance methods w/ TypeScript
    // for (const method of this.methods) {
    //   this[method] = (url: string, callback: Function): void => {
    //     this.methodCallbackLookup[method][url] = callback;
    //   };
    // }
  }

  get(url: string, callback: Function): void {
    this.methodCallbackLookup.get("get")!.set(url, callback);
  }

  post(url: string, callback: Function): void {
    this.methodCallbackLookup.get("post")!.set(url, callback);
  }

  handleRequest(request: ServerRequest) {
    const routeCallbackLookup = this.methodCallbackLookup.get(
      request.method.toLowerCase(),
    );

    if (!routeCallbackLookup) {
      throw new Error("Unsupported HTTP Method");
    }

    const routeCallback:
      | Function
      | undefined = this.getCallbackFromRouteCallbackLookup(
        routeCallbackLookup,
        request.url,
      );

    if (!routeCallback) {
      throw new Error("HTTP Not Found Error");
    }

    const req = {
      url: request!.url,
      method: request!.method,
    };

    const res = {
      json(json: object) {
        request.respond({
          body: JSON.stringify(json),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
      },
    };

    routeCallback(req, res);
  }

  getCallbackFromRouteCallbackLookup(
    routeCallbackLookup: Map<string, Function>,
    requestUrl: string,
  ): Function {
    const routeCallback: Function | undefined = routeCallbackLookup.get(
      requestUrl,
    );

    if (!routeCallback) {
      throw new Error("Unimplemented feature: URL path parameters");
    }

    return routeCallback;
  }

  async listen(callback: Function): Promise<void> {
    callback();
    this.server = serve({ port: 8000 });
    for await (const request of this.server!) {
      this.handleRequest(request);
    }
  }
}
