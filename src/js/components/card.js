function create(data) {
  const card = `
    <div class="tm-c-hand__card tm-c-card js-card" data-id="${data.id}" style="background-image: url('/assets/img/${data.icon}.png')">
      ${data.cost !== undefined ? `<div class="tm-c-card__cost">${data.cost}</div>` : ''}
      ${data.element !== undefined ? `<div class="tm-c-card__element" style="background-image: url('/assets/img/${data.element}.png')"></div>` : ''}
      <div class="tm-c-card__name">${data.name}</div>
      ${data.damage !== undefined ? `<div class="tm-c-card__effect">${data.damage} ATK</div>` : ''}
      ${data.health !== undefined ? `<div class="tm-c-card__effect">+${data.health} HP</div>` : ''}
      ${data.mana !== undefined ? `<div class="tm-c-card__effect">+${data.mana} MP</div>` : ''}
      ${data.keyword !== undefined ? `<div class="tm-c-card__effect">${data.keyword}</div>` : ''}
    </div>
  `;

  return card;
}

export default function(card) {
  return create(card);
};
