import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import image from 'utilities/image';
import padding from 'utilities/padding';

export default function Stats() {
  const hasStatusEffect = Player.status !== 'normal' && Player.statusDuration !== 0;
  const playerHPBarWidth = (Player.hp / Player.maxHp) * 100;
  const playerMPBarWidth = (Player.mp / Player.maxMp) * 100;
  const playerADBarWidth = Player.maxAd !== 0 ? (Player.ad / Player.maxAd) * 100 : 0;

  return `
    <div class="tm-c-stats">
      <div class="tm-c-stats__stat" data-stat="health">
        <div class="tm-c-stats__label">HP</div>
        <div class="tm-c-stats__value ${Player.maxHp > 99 ? 'tm-c-stats__value--small' : ''}">
          ${padding(Player.hp, 2)} / ${padding(Player.maxHp, 2)}
        </div>
        <div class="tm-c-stats__bar" style="width: ${playerHPBarWidth}%"></div>
      </div>
      <div class="tm-c-stats__stat" data-stat="mana">
        <div class="tm-c-stats__label">MP</div>
        <div class="tm-c-stats__value ${Player.maxMp > 99 ? 'tm-c-stats__value--small' : ''}">
          ${padding(Player.mp, 2)} / ${padding(Player.maxMp, 2)}
        </div>
        <div class="tm-c-stats__bar" style="width: ${playerMPBarWidth}%"></div>
      </div>
      <div class="tm-c-stats__stat" data-stat="armor">
        <div class="tm-c-stats__label">ARM</div>
        <div class="tm-c-stats__value">${padding(Player.armor, 2)}</div>
        <div class="tm-c-stats__bar" style="width: ${playerADBarWidth}%"></div>
      </div>
      <div class="tm-c-stats__stat" data-stat="status">
        <div class="tm-c-stats__status-label">Status Effect</div>
        <div class="tm-c-stats__status-effect">
          <div class="tm-c-stats__status-icon">
            ${hasStatusEffect ? `<img alt="" src="${image(Player.status)}" />` : ''}
          </div>
          <div class="tm-c-stats__status-duration">
            ${hasStatusEffect ? `x ${Player.statusDuration} turns` : ''}
          </div>
        </div>
      </div>
      <div class="tm-c-stats__stat" data-stat="information">
        <div class="tm-c-stats__gold">* ${Player.gold} gold</div>
        <div class="tm-c-stats__defeated">* ${Player.kills} defeated</div>
        <div class="tm-c-stats__level">* Dungeon lv. ${Dungeon.level}</div>
      </div>
    </div>
  `;
}
