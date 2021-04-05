@{%
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
%}

# Pass your lexer object using the @lexer option:
@lexer lexer

# nonterminal 
main -> _ logic_group _  {% (d) => d[1] %}

logic_group 
  -> named_group _ %comma _ logic_group {% (d) => [d[0], d[4][0]] %}
  | named_group                         {% (d) => [d[0]] %}

# Named as 
named_group
 -> additive _ %AS _ %quote word %quote {% (d) => ({name: d[5], value: d[0]}) %}
 | additive                              {% (d) => ({name: "Result", value: d[0]}) %}

# Addition and subtraction
additive 
  -> additive _ %plus _ additive        {% (d) => d[0]+d[4] %}
  | multiplicative _ %minus _ additive  {% (d) => d[0]-d[4] %}
  | multiplicative                      {% id %}

# Multiplication and division (rounded)
multiplicative 
  -> unary_expression _ %times _ multiplicative {% (d) => d[0]*d[4] %}
  | unary_expression _ %devide _ multiplicative {% (d) => Math.round(d[0]/d[4]) %}
  | unary_expression                            {% id %}

unary_expression
 -> %openParenthases _ additive _ %closedParenthases  {% (d) => d[2] %}
 | ROLL                                               {% id %}


# Roll
ROLL 
  -> %die  {% (d) => {
    const split = d[0].value.split(/[dD]/)
    return randomRange(split[1])
    
  } %}
  | int %die  {% (d) => {
    const split = d[1].value.split(/[dD]/)
    return Array.from({ length: d[0] }).reduce((m) => m + randomRange(split[1]), 0)
  } %}
  | int          {% id %}

# int AKA number range. We don't want to ever see floats so crush them.
int -> %number:+    {% (d) => parseInt(d[0]) %}
_ -> %WS:*          {% () => null %}
word => %word       {% (d) => d[0].toString() %}