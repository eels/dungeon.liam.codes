export default function getElementEffect(element) {
  const elementEffectMap = {
    electric: 'paralyse',
    fire: 'burn',
    ice: 'freeze',
    poison: 'poison',
  };

  return elementEffectMap[element];
}
