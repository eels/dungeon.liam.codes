import { Player } from 'instances/player';

function create() {
  const stats = `
    <div class="tm-c-stats">
      <div class="tm-c-stats__stat" data-stat="health">
        <div class="tm-c-stats__label">HP:</div>
        <div class="tm-c-stats__value">${Player.store.state.hp} / ${Player.store.state.maxHp}</div>
        <div class="tm-c-stats__bar"></div>
      </div>
      <div class="tm-c-stats__stat" data-stat="mana">
        <div class="tm-c-stats__label">MP:</div>
        <div class="tm-c-stats__value">${Player.store.state.mp} / ${Player.store.state.maxMp}</div>
        <div class="tm-c-stats__bar"></div>
      </div>
    </div>
  `;

  return stats;
}

export default function() {
  return create();
};
