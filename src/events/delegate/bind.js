export const EVENT_BINDING_CACHE = [];

export default function bind(type, selector, callback) {
  const fingerprint = [type, selector, callback].toString();

  if (EVENT_BINDING_CACHE.includes(fingerprint)) {
    return;
  }

  EVENT_BINDING_CACHE.push(fingerprint);

  window.addEventListener(type, function (event) {
    const isTargetWindow = event.target === window;
    const target = isTargetWindow ? window : event.target.closest(selector);

    event.selector = target;

    if (target !== null) {
      callback.call(target, event);
    }
  });
}
