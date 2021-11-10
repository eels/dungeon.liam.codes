import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import Tombstone from 'resources/img/tombstone.png';

export default function DeathScreen() {
  return `
    <div class="tm-c-death">
      <div class="tm-c-death__heading">You died</div>
      <div class="tm-c-death__icon">
        <img src="${Tombstone}" />
      </div>
      <div class="tm-c-death__level">
        Valiantly, you managed to reach lv. ${Dungeon.level} of the dungeon.
      </div>
      <div class="tm-c-death__gold">
        You killed ${Player.kills} creature(s) and collected ${Player.totalGold} total gold.
      </div>
      <div class="tm-c-death__restart js-restart">Re-enter the dungeon</div>
    </div>
  `;
}
