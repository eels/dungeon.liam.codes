export default class {
  constructor(store) {
    this.state = store;
  }

  commit(payload) {
    this.state = Object.assign(this.state, payload);
  }
}
