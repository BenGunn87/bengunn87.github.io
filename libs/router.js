export class Router {
  constructor () {
    this.routes = {};
    this.defaultRoute = null;
  }
  register (route, view, isDefault = false) {
    this.routes[route] = view;
    if (isDefault) {
      this.defaultRoute = view;
    }
  }
  onRoute (route) {
    if (this.activeRoute) {
      this.activeRoute.toggle(false);
    }
    this.activeRoute = this.routes[route] || this.defaultRoute;
    this.activeRoute.toggle(true);
  }
  start () {
    this.onRoute(window.location.hash.replace('#', ''));
    window.addEventListener('hashchange', () => {
      this.onRoute(window.location.hash.replace('#', ''))
    });
  }
}
