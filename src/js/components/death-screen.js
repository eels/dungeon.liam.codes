import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';

function create() {
  const death = `
    <div class="tm-c-death">
      <div class="tm-c-death__heading">You died</div>
      <div class="tm-c-death__icon">
        <img src="/assets/img/tombstone.png" />
      </div>
      <div class="tm-c-death__level">
        Valiantly, you managed to reach lv. ${Dungeon.store.state.level} of the dungeon.
      </div>
      <div class="tm-c-death__gold">
        Along the way you killed ${Player.store.state.kills} ${Player.store.state.kills === 1 ? 'creature' : 'creatures'} and collected ${Player.store.state.totalGold} gold.
      </div>
      <div class="tm-c-death__share">
        <div class="tm-c-death__share-icon tm-c-death__share-facebook"></div>
        <div class="tm-c-death__share-icon tm-c-death__share-twitter"></div>
        <div class="tm-c-death__share-icon tm-c-death__share-email"></div>
      </div>
      <div class="tm-c-death__restart js-restart">Re-enter the dungeon</div>
    </div>
  `;

  return death;
}

export default function() {
  return create();
};
