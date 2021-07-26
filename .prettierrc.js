module.exports = {
  singleQuote: true,
  semi: true,
  printWidth: 100,

  // FIXME: Prettier 2.0 added the mandatory trailing commas rule, which I disable here to not resave every file in the project right now.
  trailingComma: "none",

  // FIXME: Prettier 2.0 added the mandatory parentheses around single-argument arrow functions rule, which I disable here to not resave every file in the project right now.
  arrowParens: "avoid",
};
