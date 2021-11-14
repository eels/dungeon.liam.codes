import Player from 'instances/Player';
import image from 'utilities/image';
import uuid from 'utilities/uuid';

export default function Card(data, isPreview = false, namespace = 'hand') {
  const cardBaseClasses = `tm-c-${namespace}__card tm-c-card`;
  const cardDisabledClasses = !isPreview && Player.mp < data.cost ? 'tm-c-card--disabled' : '';
  const cardActionClasses = !isPreview ? 'js-card' : '';
  const cardClasses = [cardBaseClasses, cardDisabledClasses, cardActionClasses].join(' ');
  const cardBackgroundIcon = `background-image: url(${image(data.icon)})`;
  const cardElementIcon = `background-image: url(${image(data.element)})`;

  return `
    <div class="${cardClasses}" style="${cardBackgroundIcon}" data-id="${data.id ?? uuid()}">
      ${data.cost ? `<div class="tm-c-card__cost">${data.cost}</div>` : ''}
      ${data.element ? `<div class="tm-c-card__element" style="${cardElementIcon}"></div>` : ''}
      <div class="tm-c-card__name" ${data.size ? `style="font-size: ${data.size}"` : ''}>
        ${data.name}
      </div>
      <div class="tm-c-card__effect">
        ${data.armor ? `+${data.armor} ARM` : ''}
        ${data.damage ? `${data.damage} ATK` : ''}
        ${data.health ? `+${data.health} HP` : ''}
        ${data.keyword ? `${data.keyword}` : ''}
        ${data.mana ? `+${data.mana} MP` : ''}
        ${data.maxHealth ? `+${data.maxHealth} MAX HP` : ''}
        ${data.maxMana ? `+${data.maxMana} MAX MP` : ''}
      </div>
    </div>
  `;
}
