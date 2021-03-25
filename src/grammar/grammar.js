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
  times:  /\*|x/,
  devide:  /\/|devide/,
  plus:  /\+|plus/,
  minus:  /\-|minus/,
  die: /[dD]/
});

const randomRange = (max) => chance.integer({ min: 0, max })

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["_", "AS", "_"], "postprocess": (d) => d[1]},
    {"name": "P", "symbols": [{"literal":"("}, "_", "AS", "_", {"literal":")"}], "postprocess": (d) => d[2]},
    {"name": "P", "symbols": ["ROLL"], "postprocess": id},
    {"name": "E", "symbols": ["P", "_", {"literal":"^"}, "_", "E"], "postprocess": (d) => Math.pow(d[0], d[4])},
    {"name": "E", "symbols": ["P"], "postprocess": id},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"*"}, "_", "E"], "postprocess": (d) => d[0]*d[4]},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"/"}, "_", "E"], "postprocess": (d) => Math.round(d[0]/d[4])},
    {"name": "MD", "symbols": ["E"], "postprocess": id},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"+"}, "_", "MD"], "postprocess": (d) => d[0]+d[4]},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"-"}, "_", "MD"], "postprocess": (d) => d[0]-d[4]},
    {"name": "AS", "symbols": ["MD"], "postprocess": id},
    {"name": "ROLL", "symbols": ["int"], "postprocess": id},
    {"name": "ROLL", "symbols": [(lexer.has("die") ? {type: "die"} : die), "int"], "postprocess": (d) => randomRange(d[1])},
    {"name": "int$ebnf$1", "symbols": [(lexer.has("number") ? {type: "number"} : number)]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", (lexer.has("number") ? {type: "number"} : number)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1"], "postprocess": (d) => parseInt(d[0])},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
