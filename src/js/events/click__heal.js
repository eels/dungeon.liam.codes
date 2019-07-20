import { on, fire } from 'utilities/delegation';
import { Player } from 'instances/player';

export default function() {
  on('click', '.js-heal', event => {
    const cardPrice = 20;
    const playerGold = Player.store.state.gold;
    const errorClass = document.querySelector('.tm-c-shop') !== null ? 'tm-c-shop__status--error' : 'tm-c-treasure__status--error';

    document.querySelector('.tm-c-message [class*="status"]').classList.remove(errorClass);

    if (playerGold - cardPrice < 0) {
      document.querySelector('.tm-c-message [class*="status"]').innerHTML = '"You do not possess enough gold for that blessing"';
      document.querySelector('.tm-c-message [class*="status"]').classList.add(errorClass);
      return;
    }

    Player.store.commit({ gold: playerGold - cardPrice });
    Player.store.commit({ hp: Player.store.state.hp + 25 < Player.store.state.maxHp ? Player.store.state.hp + 25 : Player.store.state.maxHp });
    document.querySelector('.tm-c-message [class*="status"]').innerHTML = `"A bright light surrounds you as your health is restored"`;

    fire('PLAYER_UPDATE_STATS');
  });
};
