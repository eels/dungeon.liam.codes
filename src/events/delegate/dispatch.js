export default function dispatch(type, detail = {}) {
  const Event = new CustomEvent(type, { detail });

  window.dispatchEvent(Event);
}
