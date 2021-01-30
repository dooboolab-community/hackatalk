module.exports = (message, key) => {
  if (key !== key.toUpperCase()) {
    throw new SyntaxError('Key must be in all capitals!');
  }
  if (key.includes('-')) {
    throw new SyntaxError('Key must use underbar(-) instead of hyphen(-)!');
  }
};