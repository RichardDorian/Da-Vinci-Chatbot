class Store {
  static instance = new Store();

  constructor() {
    this.store = {};
    console.info('Store initialized');
  }
}

module.exports = Store.instance;
