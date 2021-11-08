import { on } from 'utilities/delegation';
import Creature from 'components/creature';

export default function() {
  on('CREATURE_UPDATE', 'body', event => {
    document.querySelector('.tm-c-creature').outerHTML = Creature();
  });
};
