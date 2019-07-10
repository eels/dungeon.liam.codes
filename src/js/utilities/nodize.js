const nodize = string => {
  return document.createRange().createContextualFragment(string);
}

export { nodize };
