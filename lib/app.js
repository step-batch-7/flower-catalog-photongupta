const matchHeaders = function(route, req) {
  return route.method == req.method && req.url.match(route.path);
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
      if (matchingHandlers.length == 0) {
        return;
      }
      const route = matchingHandlers.shift();
      route.handler(req, res, next);
    };
    next();
  }
}

module.exports = App;
