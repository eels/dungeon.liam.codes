export default function hydrate(string, variables) {
  return string.replace(/%\d+/g, (placeholder) => {
    const placeholderIndex = parseInt(placeholder.replace('%', ''));

    return variables[placeholderIndex - 1];
  });
}
