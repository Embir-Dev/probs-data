// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require("moo");
const Chance = require('chance')
const chance = new Chance(new Date().getTime())
const lexer = moo.compile({
  WS:      /[ \t]+/,
  number: /[0-9]+/,
  AS:     /as|AS/,
  times:  /\*|x|times/,
  devide:  /\/|devide/,
  plus:  /\+|plus/,
  minus:  /\-|minus/,
  die: /\d*[dD]\d+\b/,
  openParenthases: /\(/,
  closedParenthases: /\)/,
  comma: /,/,
  word: /\w+/,
  quote: /["]/
});
const randomRange = (max) => chance.integer({ min: 1, max })
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["_", "logic_group", "_"], "postprocess": (d) => d[1]},
    {"name": "logic_group", "symbols": ["named_group", "_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "logic_group"], "postprocess": (d) => [d[0], d[4][0]]},
    {"name": "logic_group", "symbols": ["named_group"], "postprocess": (d) => [d[0]]},
    {"name": "named_group", "symbols": ["additive", "_", (lexer.has("AS") ? {type: "AS"} : AS), "_", (lexer.has("quote") ? {type: "quote"} : quote), "word", (lexer.has("quote") ? {type: "quote"} : quote)], "postprocess": (d) => ({name: d[5], value: d[0]})},
    {"name": "named_group", "symbols": ["additive"], "postprocess": (d) => ({name: "Result", value: d[0]})},
    {"name": "additive", "symbols": ["additive", "_", (lexer.has("plus") ? {type: "plus"} : plus), "_", "additive"], "postprocess": (d) => d[0]+d[4]},
    {"name": "additive", "symbols": ["multiplicative", "_", (lexer.has("minus") ? {type: "minus"} : minus), "_", "additive"], "postprocess": (d) => d[0]-d[4]},
    {"name": "additive", "symbols": ["multiplicative"], "postprocess": id},
    {"name": "multiplicative", "symbols": ["unary_expression", "_", (lexer.has("times") ? {type: "times"} : times), "_", "multiplicative"], "postprocess": (d) => d[0]*d[4]},
    {"name": "multiplicative", "symbols": ["unary_expression", "_", (lexer.has("devide") ? {type: "devide"} : devide), "_", "multiplicative"], "postprocess": (d) => Math.round(d[0]/d[4])},
    {"name": "multiplicative", "symbols": ["unary_expression"], "postprocess": id},
    {"name": "unary_expression", "symbols": [(lexer.has("openParenthases") ? {type: "openParenthases"} : openParenthases), "_", "additive", "_", (lexer.has("closedParenthases") ? {type: "closedParenthases"} : closedParenthases)], "postprocess": (d) => d[2]},
    {"name": "unary_expression", "symbols": ["ROLL"], "postprocess": id},
    {"name": "ROLL", "symbols": [(lexer.has("die") ? {type: "die"} : die)], "postprocess":  (d) => {
          const split = d[0].value.split(/[dD]/)
          return randomRange(split[1])
          
        } },
    {"name": "ROLL", "symbols": ["int", (lexer.has("die") ? {type: "die"} : die)], "postprocess":  (d) => {
          const split = d[1].value.split(/[dD]/)
          return Array.from({ length: d[0] }).reduce((m) => m + randomRange(split[1]), 0)
        } },
    {"name": "ROLL", "symbols": ["int"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [(lexer.has("number") ? {type: "number"} : number)]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", (lexer.has("number") ? {type: "number"} : number)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1"], "postprocess": (d) => parseInt(d[0])},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null},
    {"name": "word", "symbols": [(lexer.has("word") ? {type: "word"} : word)], "postprocess": (d) => d[0].toString()}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
