const capitalize = string => {
  return string.split(' ').map(chunk => {
    return chunk.length === 2 ? chunk : chunk.charAt(0).toUpperCase() + chunk.slice(1);
  }).join(' ');
}

export { capitalize };
