import { fire } from 'utilities/delegation';
import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';

const applyCardEffect = (data) => {
  if (data.effect === 'health potion') {
    const hp = Player.store.state.hp + data.health;
    const maxHp = Player.store.state.maxHp;
    Player.store.commit({ hp: hp > maxHp ? maxHp : hp });
    fire('PLAYER_UPDATE');
  }

  if (data.effect === 'mana potion') {
    const mp = Player.store.state.mp + data.mana;
    const maxMp = Player.store.state.maxMp;
    Player.store.commit({ mp: mp > maxMp ? maxMp : mp });
    fire('PLAYER_UPDATE');
  }

  if (data.effect === 'damage') {
    const creature = Dungeon.store.state.creatures[0];
    const hit = creature.store.state.hp - data.damage;

    if (hit > 0) {
      creature.store.commit({ hp: hit });
    } else {
      Player.store.commit({ gold: Player.store.state.gold + creature.store.state.raw.gold });
      Dungeon.advance();
    }

    fire('CREATURE_UPDATE');
    fire('PLAYER_UPDATE');
  }
};

export { applyCardEffect };
