function create() {
  const start = `
    <div class="tm-c-start">
      <div class="tm-c-start__heading">You approach the dungeon gate</div>
      <div class="tm-c-start__icon">
        <img src="/assets/img/dungeon-gate.png" />
      </div>
      <div class="tm-c-start__start js-start">Enter</div>
    </div>
  `;

  return start;
}

export default function() {
  return create();
};
