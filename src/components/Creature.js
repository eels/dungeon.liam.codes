import Dungeon from 'instances/Dungeon';
import image from 'utilities/image';

export default function Creature() {
  const level = Dungeon.level;
  const creature = Dungeon.creatures[0];
  const hasStatusEffect = creature.status !== 'normal' && creature.statusDuration !== 0;
  const creatureHPBarWidth = (creature.hp / creature.maxHp) * 100;
  const creatureMPBarWidth = (creature.mp / creature.maxMp) * 100;
  const creatureADBarWidth = (creature.ad / creature.maxAd) * 100;

  return `
    <div class="tm-c-creature">
      <div class="tm-c-creature__tunnel">
        <div class="tm-c-creature__name">
          ${creature.isBoss ? '<div class="tm-c-creature__name-icon"></div>' : ''}
          ${creature.isBoss ? 'BOSS: ' : ''}${creature.name}
        </div>
        <div class="tm-c-creature__level">
          ${creature.isBoss ? `Lv. ${new Array(level.toString().length + 1).join('X')}` : ''}
          ${creature.isBoss ? '' : `Lv. ${creature.raw.level}`}
        </div>
        <div class="tm-c-creature__attribute">
          <div class="tm-c-creature__attribute-label">Weakness</div>
          <div class="tm-c-creature__attribute-icon">
            ${creature.raw.weakness ? `<img alt="" src="${image(creature.raw.weakness)}" />` : ''}
          </div>
        </div>
        <div class="tm-c-creature__attribute">
          <div class="tm-c-creature__attribute-label">Resistance</div>
          <div class="tm-c-creature__attribute-icon">
            ${
              creature.raw.resistance
                ? `<img alt="" src="${image(creature.raw.resistance)}" />`
                : ''
            }
          </div>
        </div>
      </div>
      <div class="tm-c-creature__stats">
        <div class="tm-c-creature__stat" data-stat="health">
          <div class="tm-c-creature__label">HP</div>
          <div class="tm-c-creature__bar" style="width: ${creatureHPBarWidth}%"></div>
        </div>
        <div class="tm-c-creature__stat" data-stat="mana">
          <div class="tm-c-creature__label">MP</div>
          <div class="tm-c-creature__bar" style="width: ${creatureMPBarWidth}%"></div>
        </div>
        <div class="tm-c-creature__stat" data-stat="armor">
          <div class="tm-c-creature__label">AR</div>
          <div class="tm-c-creature__bar" style="width: ${creatureADBarWidth}%"></div>
        </div>
        <div class="tm-c-creature__stat">
          <div class="tm-c-creature__status-label">Status Effect</div>
          <div class="tm-c-creature__status-effect">
            <div class="tm-c-creature__status-icon">
              ${hasStatusEffect ? `<img alt="" src="${image(creature.status)}" />` : ''}
            </div>
            <div class="tm-c-creature__status-duration">
              ${hasStatusEffect ? `x ${creature.statusDuration} turns` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
