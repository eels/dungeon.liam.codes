import { Dungeon } from 'instances/dungeon';

function create() {
  const current = Dungeon.store.state.creatures[0];
  const creature = `
    <div class="tm-c-creature">
      <div class="tm-c-creature__tunnel">
        <div class="tm-c-creature__name">${current.store.state.raw.name}</div>
        <div class="tm-c-creature__level">Lv. ${current.store.state.raw.level}</div>
        ${current.store.state.raw.weakness !== undefined ? `<div class="tm-c-creature__weakness">Weakness</div><div class="tm-c-creature__weakness-icon"><img src="/assets/img/${current.store.state.raw.weakness}.png" /></div>` : ''}
      </div>
      <div class="tm-c-creature__stats">
        <div class="tm-c-creature__stat" data-stat="health">
          <div class="tm-c-creature__label">HP</div>
          <div class="tm-c-creature__bar" style="width: ${(current.store.state.hp / current.store.state.maxHp) * 100}%"></div>
        </div>
        <div class="tm-c-creature__stat" data-stat="mana">
          <div class="tm-c-creature__label">MP</div>
          <div class="tm-c-creature__bar" style="width: ${(current.store.state.mp / current.store.state.maxMp) * 100}%"></div>
        </div>
        <div class="tm-c-creature__stat">
          <div class="tm-c-creature__status-label">Status Effects</div>
          <div class="tm-c-creature__status-effect">
            <div class="tm-c-creature__status-icon">
              ${current.store.state.status !== 'normal' && current.store.state.statusDuration !== 0 ? `<img src="/assets/img/${current.store.state.status}.png" />` : ''}
            </div>
            <div class="tm-c-creature__status-duration">
              ${current.store.state.status !== 'normal' && current.store.state.statusDuration !== 0 ? `x ${current.store.state.statusDuration} turns` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return creature;
}

export default function() {
  return create();
};
