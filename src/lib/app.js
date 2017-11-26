import StateProvider from "../lib/state/state-provider";

const globalBlockingServiceProviders = [StateProvider];
const globalServiceProviders = [];

export default class App {
  static remotes = {};
  static api = {};
  static env = null;
  static bindings = {};

  static boot() {
    console.ignoredYellowBox = [`Possible Unhandled Promise Rejection`];
    return Promise.all(
      globalBlockingServiceProviders.map(s => s.boot(App))
    ).then(() => {
      globalServiceProviders.map(s => s.boot(App));
    });
  }

  static setRouter(router) {
    App.router = router;
  }

  static setRootComponent(rootComponent) {
    App.rootComponent = rootComponent;
  }

  static pushRootComponent(componentClass, props) {
    this.rootComponent.pushSubComponent(componentClass, props);
  }

  static popRootComponent() {
    this.rootComponent.popSubComponent();
  }

  static conf(key) {
    if (key.includes(".")) {
      let value = conf;
      key.split(".").forEach(subkey => {
        value = value[subkey];
      });

      return value;
    }

    return conf[key];
  }

  /**
   * Saves an object in the registry
   * @param {string} name
   * @param {object} object
   */
  static register(name, object) {
    App.bindings[name] = object;
  }
  /**
   * Returns an object from the registry
   * @param {string} name
   * @returns object
   */
  static make(name) {
    return App.bindings[name];
  }

  /**
   * IMPORTANT: ONLY USE IN TESTING
   * Boots the application with mocks for:
   * redux, remotes
   */
  static bootWithMocks() {
    // filesystem exists
    RNFetchBlob.fs.exists.mockReturnPromiseResolving(true);
    // state
    App.redux = {
      getState: jest.fn(),
      subscribe: jest.fn(),
      dispatch: jest.fn()
    };
    // remotes
    App.remotes = {};
    [
      "products",
      "backgrounds",
      "shelves",
      "productsGroup",
      "corridors"
    ].forEach(key => {
      App.remotes[key] = new RemoteStorage("potato", key);
    });
    // router
    App.router = { push: jest.fn() };
    // methods
    App.popRootComponent = jest.fn();
    App.pushRootComponent = jest.fn();
    App.register = jest.fn();
    App.make = jest.fn();
  }
}
