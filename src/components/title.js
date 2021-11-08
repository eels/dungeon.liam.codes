function create(value) {
  const title = `
    <div class="tm-c-title">${value}</div>
  `;

  return title;
}

export default function(title) {
  return create(title);
}
