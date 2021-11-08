import Card from 'components/card';
import Cards from 'library/cards';

const debugCards = () => {
  const field = document.getElementById('dungeon');
  field.insertAdjacentHTML(
    'beforeend',
    `
    <div class="tm-c-debug">
      ${Cards.map((card) => {
        return `
          <div class="tm-c-debug__card-container">
            ${Card(card)}
          </div>
        `;
      }).join('')}
    </div>
  `,
  );
};

export { debugCards };
