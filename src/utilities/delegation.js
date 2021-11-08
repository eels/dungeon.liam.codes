const on = (type, selector, cb) => {
  window.addEventListener(type, event => {
    const target = event.target.closest(selector);

    if (target === null) {
      return;
    }

    event.selector = target;

    const callback = cb.bind(target);
    callback(event);
  });
};

const fire = (name, details = {}) => {
  var dispatch = document.createEvent('Event');
  dispatch.initEvent(name, true, true);
  dispatch.detail = details;
  document.body.dispatchEvent(dispatch);
};

export { on, fire };
