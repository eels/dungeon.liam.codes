import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';

function create() {
  const facebook = `http://www.facebook.com/sharer.php?u=${window.location.href}`;
  const twitter = `https://twitter.com/share?url=${window.location.href}&amp;text=${encodeURIComponent(`I just defeated ${Player.store.state.kills} ${Player.store.state.kills === 1 ? 'creature' : 'creatures'} on Dungeon Delver. Can you beat my score?`)}&amp;hashtags=DungeonDelver`;
  const email = `mailto:?Subject=I just defeated ${Player.store.state.kills} ${Player.store.state.kills === 1 ? 'creature' : 'creatures'} on Dungeon Delver. Can you beat my score? ${window.location.href}&amp;Body=${encodeURIComponent('')}`;

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
        <a href="${facebook}" target="_blank" class="tm-c-death__share-icon tm-c-death__share-facebook"></a>
        <a href="${twitter}" target="_blank" class="tm-c-death__share-icon tm-c-death__share-twitter"></a>
        <a href="${email}" target="_blank" class="tm-c-death__share-icon tm-c-death__share-email"></a>
      </div>
      <div class="tm-c-death__restart js-restart">Re-enter the dungeon</div>
    </div>
  `;

  return death;
}

export default function() {
  return create();
};
