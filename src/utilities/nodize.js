export default function nodize(string) {
  return document.createRange().createContextualFragment(string);
}
