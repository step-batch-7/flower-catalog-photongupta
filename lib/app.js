const matchHeaders = function(route, req) {
  if (route.method) {
    return route.method === req.method && req.url.match(route.path);
  }
  return true;
};

class App {
  constructor() {
    this.routes = [];
  }

  get(path, handler) {
    this.routes.push({path, handler, method: 'GET'});
  }

  post(path, handler) {
    this.routes.push({path, handler, method: 'POST'});
  }

  serve(req, res) {
    const matchingHandlers = this.routes.filter(route =>
      matchHeaders(route, req)
    );
    const next = function() {
      const route = matchingHandlers.shift();
      route && route.handler(req, res, next);
    };
    next();
  }

  use(handler) {
    this.routes.push({handler});
  }
}

module.exports = App;
