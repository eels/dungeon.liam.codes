function create(content) {
  const death = `
    <div class="tm-c-message">
      <div class="tm-c-message__container">${content()}</div>
    </div>
  `;

  return death;
}

export default function(content = () => {}) {
  return create(content);
};
