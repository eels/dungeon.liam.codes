import dungeons from 'data/dungeons';
import image from 'utilities/image';
import shuffle from 'utilities/shuffle';

export default function StartScreen() {
  return `
    <div class="tm-c-start">
      <div class="tm-c-start__heading">You approach the dungeon gate</div>
      <div class="tm-c-start__icon">
        <img alt="" src="${image('dungeon-gate')}" />
      </div>
      <div class="tm-c-start__name">"${shuffle(dungeons)[0]}"</div>
      <div class="tm-c-start__description">
        <p>A large dark cave in a shady forest marks the dungeon enterance.
        Beyond the gate lies a narrow, foggy room covered in ash, dirt and broken stone.</p>
        <p>Your torch allows you to see remnants of statues, demolished by time itself.</p>
      </div>
      <div class="tm-c-start__start js-start">Enter the dungeon</div>
    </div>
  `;
}
