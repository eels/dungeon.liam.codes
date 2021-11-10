export default class StatefulEntity {
  constructor(initialState) {
    this.__state = initialState;

    return new Proxy(this, {
      get(target, property) {
        return target[property] ?? target.__state[property] ?? undefined;
      },
    });
  }

  __commitStateChange(state) {
    this.__state = state;
  }

  setState(payload) {
    const value = Object.assign(this.__state, payload);

    return {
      commit: () => this.__commitStateChange(value),
      value,
    };
  }
}
