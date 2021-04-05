const nearley = require("nearley");
const grammar = require("./grammar");

const parse = (feed: string) => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(feed);
  return parser.results[0];
};

export default parse;
