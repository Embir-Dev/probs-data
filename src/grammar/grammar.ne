@{%
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

%}

# Pass your lexer object using the @lexer option:
@lexer lexer

# nonterminal 
main -> _ AS _      {% (d) => d[1] %}

# Parentheses
P -> "(" _ AS _ ")" {% (d) => d[2] %}
  | ROLL            {% id %}

# Exponents
E -> P _ "^" _ E    {% (d) => Math.pow(d[0], d[4]) %}
  | P               {% id %}

# Multiplication and division (rounded)
MD -> MD _ "*" _ E  {% (d) => d[0]*d[4] %}
  | MD _ "/" _ E    {% (d) => Math.round(d[0]/d[4]) %}
  | E               {% id %}

# Addition and subtraction
AS -> AS _ "+" _ MD {% (d) => d[0]+d[4] %}
  | AS _ "-" _ MD   {% (d) => d[0]-d[4] %}
  | MD              {% id %}

# Roll
ROLL -> int         {% id %}
  | %die int        {% (d) => randomRange(d[1]) %}

# int AKA number range. We don't want to ever see floats so crush them.
int -> %number:+    {% (d) => parseInt(d[0]) %}
_ -> %WS:*          {% () => null %}