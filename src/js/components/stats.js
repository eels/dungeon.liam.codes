import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';

function create() {
  const stats = `
    <div class="tm-c-stats">
      <div class="tm-c-stats__stat" data-stat="health">
        <div class="tm-c-stats__label">HP</div>
        <div class="tm-c-stats__value">${Player.store.state.hp < 10 ? '0' + Player.store.state.hp : Player.store.state.hp} / ${Player.store.state.maxHp}</div>
        <div class="tm-c-stats__bar" style="width: ${(Player.store.state.hp / Player.store.state.maxHp) * 100}%"></div>
      </div>
      <div class="tm-c-stats__stat" data-stat="mana">
        <div class="tm-c-stats__label">MP</div>
        <div class="tm-c-stats__value">${Player.store.state.mp < 10 ? '0' + Player.store.state.mp : Player.store.state.mp} / ${Player.store.state.maxMp}</div>
        <div class="tm-c-stats__bar" style="width: ${(Player.store.state.mp / Player.store.state.maxMp) * 100}%"></div>
      </div>
      <div class="tm-c-stats__stat" data-stat="armor">
        <div class="tm-c-stats__label">ARM</div>
        <div class="tm-c-stats__value">${Player.store.state.armor}</div>
        <div class="tm-c-stats__bar" style="width: ${Player.store.state.maxAd === 0 ? 0 : (Player.store.state.ad / Player.store.state.maxAd) * 100}%"></div>
      </div>
      <div class="tm-c-stats__stat" data-stat="status">
        <div class="tm-c-stats__status-label">Status Effects</div>
        <div class="tm-c-stats__status-effect">
          <div class="tm-c-stats__status-icon">
            ${Player.store.state.status !== 'normal' && Player.store.state.statusDuration !== 0 ? `<img src="/assets/img/${Player.store.state.status}.png" />` : ''}
          </div>
          <div class="tm-c-stats__status-duration">
            ${Player.store.state.status !== 'normal' && Player.store.state.statusDuration !== 0 ? `x ${Player.store.state.statusDuration} turns` : ''}
          </div>
        </div>
      </div>
      <div class="tm-c-stats__stat" data-stat="information">
        <div class="tm-c-stats__gold">${Player.store.state.gold} gold</div>
        <div class="tm-c-stats__level">Dungeon lv. ${Dungeon.store.state.level}</div>
      </div>
    </div>
  `;

  return stats;
}

export default function() {
  return create();
};
