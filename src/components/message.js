export default function Message(content = () => {}) {
  return `
    <div class="tm-c-message">
      <div class="tm-c-message__container">${content()}</div>
    </div>
  `;
}
