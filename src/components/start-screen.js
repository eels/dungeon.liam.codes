import { shuffle } from 'utilities/array';
import DungeonNames from 'library/dungeons';

function getRandomDungeonName() {
  const dungeons = shuffle(DungeonNames);
  return dungeons[0];
}

function create() {
  const start = `
    <div class="tm-c-start">
      <div class="tm-c-start__heading">You approach the dungeon gate</div>
      <div class="tm-c-start__icon">
        <img src="assets/img/dungeon-gate.png" />
      </div>
      <div class="tm-c-start__name">"${getRandomDungeonName()}"</div>
      <div class="tm-c-start__description">
        <p>A large dark cave in a shady forest marks the dungeon enterance.
        Beyond the gate lies a narrow, foggy room covered in ash, dirt and broken stone.</p>
        <p>Your torch allows you to see remnants of statues, demolished by time itself.</p>
      </div>
      <div class="tm-c-start__start js-start">Enter</div>
    </div>
  `;

  return start;
}

export default function() {
  return create();
};
