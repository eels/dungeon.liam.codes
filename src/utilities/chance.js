export default function chance(target) {
  return Math.round(Math.random() * 100000) / 100000 < target;
}
