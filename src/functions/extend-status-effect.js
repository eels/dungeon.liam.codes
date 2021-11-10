export default function extendStatusEffect(object, effect, duration) {
  return object.status === effect ? object.statusDuration + duration : duration;
}
