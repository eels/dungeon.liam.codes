import { on } from 'utilities/delegation';
import { Player } from 'instances/player';
import { Tick } from 'instances/tick';
import ShopScreen from 'components/shop-screen';
import TreasureScreen from 'components/treasure-screen';

export default function() {
  on('ENTER_SHOP', 'body', event => {
    Tick.stop();
    Player.store.commit({ actionTaken: true });
    document.querySelector('.tm-c-timer').style.width = '100%';
    document.querySelector('.tm-c-hand').classList.add('tm-c-hand--disabled');
    document.querySelector('.tm-c-board__message').classList.add('tm-c-board__message--active');

    const chance = Math.round(Math.random() * 10);
    if (chance > 7) {
      document.querySelector('.tm-c-message__container').innerHTML = TreasureScreen();
      return;
    }

    document.querySelector('.tm-c-message__container').innerHTML = ShopScreen();
  });
};
