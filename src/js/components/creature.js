import { Dungeon } from 'instances/dungeon';

function create() {
  const current = Dungeon.store.state.creatures[0];
  const creature = `
    <div class="tm-c-creature">
      <div class="tm-c-creature__tunnel">
        <div class="tm-c-creature__name">${current.store.state.raw.name}</div>
        <div class="tm-c-creature__level">Lv. ${current.store.state.raw.level}</div>
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
      </div>
    </div>
  `;

  return creature;
}

export default function() {
  return create();
};
