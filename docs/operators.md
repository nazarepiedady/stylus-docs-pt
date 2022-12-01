---
layout: default
permalink: docs/operators.html
---

# Operators

## Operator Precedence

Below is the operator precedence table, highest to lowest:

```bash
.
[]
! ~ + -
is defined
** * / %
+ -
... ..
<= >= < >
in
== is != is not isnt
is a
&& and || or
?:
= := ?= += -= *= /= %=
not
if unless
```

## Unary Operators

The following unary operators are available, `!`, `not`, `-`, `+`, and `~`.

```stylus
!0
// => true

!!0
// => false

!1
// => false

!!5px
// => true

-5px
// => -5px

--5px
// => 5px

not true
// => false

not not true
// => true
```
The logical `not` operator has low precedence, therefore the following example could be replaced with

```stylus
a = 0
b = 1

!a and !b
// => false
// parsed as: (!a) and (!b)
```

With:

```stylus
not a or b
// => false
// parsed as: not (a or b)
```

## Binary Operators

### Subscript []

The subscript operator allows us to grab a value inside an expression via index (zero-based).
Negative index values starts with the last element in the expression.

```stylus
list = 1 2 3
list[0]
// => 1

list[-1]
// => 3
```

Parenthesized expressions may act as tuples (e.g. `(15px 5px)`, `(1 2 3)`).
 
Below is an example that uses tuples for error handling (and showcasing the versatility of this construct):

```stylus
add(a, b)
  if a is a 'unit' and b is a 'unit'
    a + b
  else
    (error 'a and b must be units!')

body
  padding add(1,'5')
  // => padding: error "a and b must be units";
  
  padding add(1,'5')[0]
  // => padding: error;
  
  padding add(1,'5')[0] == error
  // => padding: true;

  padding add(1,'5')[1]
  // => padding: "a and b must be units";
```

Here's a more complex example. Now we're invoking the built-in `error()` function with the return error message, whenever the ident (the first value) equals `error`.
 
```stylus
if (val = add(1,'5'))[0] == error
  error(val[1])
```

## Range .. ...

Both the inclusive (`..`) and exclusive (`...`) range operators are provided, expanding to expressions:
 
```stylus
1..5
// => 1 2 3 4 5

1...5
// => 1 2 3 4

5..1
// => 5 4 3 2 1
```

### Additive: + -

Multiplicative and additive binary operators work as expected. Type conversion is applied within unit type classes, or default to the literal value. For example `5s - 2px` results in `3s`.

```stylus
15px - 5px
// => 10px

5 - 2
// => 3

5in - 50mm
// => 3.031in

5s - 1000ms
// => 4s

20mm + 4in
// => 121.6mm

"foo " + "bar"
// => "foo bar"

"num " + 15
// => "num 15"
```

### Multiplicative: / * %

```stylus
2000ms + (1s * 2)
// => 4000ms

5s / 2
// => 2.5s

4 % 2
// => 0
```

When using `/` within a property value, you **must** wrap with parens. Otherwise the `/` is taken literally (to support CSS `line-height`):

```stylus
font: 14px/1.5;
```

But the following is evaluated as `14px` ÷ `1.5`:

```stylus
font: (14px/1.5);
```

This is _only_ required for the `/` operator.

### Shorthand operators: += -= *= /= %=

Shorthand operators works like other common language. With list variable, the first value will be use to execute the operators and overwrite the list to turn it to a single-value variable. With string, node values only += works as an appending function. With number type value, all operators work exactly like a normal math. Similar for color value.

```stylus
n = 12
n += 8
// => n = 20

int-list = 12 23 0 32
int-list %= 2
// => 12 % 2 = 0 (mod operator)
// => int-list = 0

mixed-list = node 23 'str'
mixed-list %= 2
// => error

mixed-list = node 23 'str' #2e7
mixed-list += 2
// => mixed-list = node2

s = 'str'
s += 2
// => s = 'str2'

c = #0e0
c -= #0e0
// => c = #000    
```

### Exponent: **

The Exponent operator:

```stylus
2 ** 8
// => 256
```

### Equality & Relational: == != >= <= > <

Equality operators can be used to equate units, colors, strings, and even identifiers. This is a powerful concept, as even arbitrary identifiers (such as as `wahoo`) can be utilized as atoms. A function could return `yes` or `no` instead of `true` or `false` (although not advised). 

```stylus
5 == 5
// => true

10 > 5
// => true

#fff == #fff
// => true

true == false
// => false

wahoo == yay
// => false

wahoo == wahoo
// => true

"test" == "test"
// => true

true is true
// => true

'hey' is not 'bye'
// => true

'hey' isnt 'bye'
// => true

(foo bar) == (foo bar)
// => true

(1 2 3) == (1 2 3)
// => true

(1 2 3) == (1 1 3)
// => false
```

Only exact values match. For example, `0 == false` and `null == false` are both `false`.

Aliases:

```stylus
==    is
!=    is not
!=    isnt
```

## Truthfulness

Nearly everything within Stylus resolves to `true`, including units with a suffix. Even `0%`, `0px`, etc. will resolve to `true` (because it's common in Stylus for mixins or functions to accept units as valid). 
 
However, `0` itself is `false` in terms of arithmetic. 
 
Expressions (or "lists") with a length greater than 1 are considered truthy.

`true` examples:

```stylus
      0% 
      0px
      1px 
      -1
      -1px
      hey
      'hey'
      (0 0 0)
      ('' '')
```

`false` examples:

```stylus
0 
null
false
''
```
### Logical Operators: && || and or

Logical operators `&&` and `||` are aliased `and` / `or` which apply the same precedence.

```stylus
5 && 3
// => 3

0 || 5
// => 5

0 && 5
// => 0

#fff is a 'rgba' and 15 is a 'unit'
// => true
```

### Existence Operator: in

Checks for the existence of the _left-hand_ operand within the _right-hand_ expression.

Simple examples:

```stylus
nums = 1 2 3
1 in nums
// => true

5 in nums
// => false
```

Some undefined identifiers:

```stylus
words = foo bar baz
bar in words
// => true

HEY in words
// => false
```

Works with tuples too:

```stylus
vals = (error 'one') (error 'two')
error in vals
// => false

(error 'one') in vals
// => true

(error 'two') in vals
// => true

(error 'something') in vals
// => false
```

Example usage in mixin:

```stylus
pad(types = padding, n = 5px)
  if padding in types
    padding n
  if margin in types
    margin n

body
  pad()

body
  pad(margin)

body
  pad(padding margin, 10px)
```

Yielding:

```css
body {
  padding: 5px;
}
body {
  margin: 5px;
}
body {
  padding: 10px;
  margin: 10px;
}
```

### Conditional Assignment: ?= :=

The conditional assignment operator `?=` (aliased as `:=`) lets us define variables without clobbering old values (if present). This operator expands to an `is defined` binary operation within a ternary. 

For example, the following are equivalent:

```stylus
color := white
color ?= white
color = color is defined ? color : white
```

When using plain `=`, we simply reassign:

```stylus
color = white
color = black

color
// => black
```

But when using `?=`, our second attempt fails (since the variable is already defined):

```stylus
color = white
color ?= black

color
// => white
```

### Instance Check: is a

Stylus provides a binary operator named `is a` used to type check.

```stylus
15 is a 'unit'
// => true

#fff is a 'rgba'
// => true

15 is a 'rgba'
// => false
```

Alternatively, we could use the `type()` BIF:

```stylus
type(#fff) == 'rgba'
// => true                                                                            
```

**Note:** `color` is the only special-case, evaluating to `true` when the
left-hand operand is an `RGBA` or `HSLA` node.

### Variable Definition: is defined

This pseudo binary operator does not accept a right-hand operator, and does _not_ evaluate the left. This allows us to check if a variable has a value assigned to it.

```stylus
foo is defined
// => false

foo = 15px
foo is defined
// => true

#fff is defined
// => 'invalid "is defined" check on non-variable #fff'
```

Alternatively, one can use the `lookup(name)` built-in function to do this—or to perform dynamic lookups:

```stylus
name = 'blue'
lookup('light-' + name)
// => null

light-blue = #80e2e9
lookup('light-' + name)
// => #80e2e9
```

This operator is essential, as an undefined identifier is still a truthy value. For example:

```stylus
body
  if ohnoes
    padding 5px
```

_Will_ yield the following CSS when undefined:

```css
body {
  padding: 5px;
}
```

However this will be safe:

```stylus
body
  if ohnoes is defined
    padding 5px
```

## Ternary

The ternary operator works as we would expect in most languages. It's the only operator with three operands (the _condition_ expression, the _truth_ expression, and the _false_ expression).

```stylus
num = 15
num ? unit(num, 'px') : 20px
// => 15px
```

## Casting

As a terse alternative to the `unit()` built-in function, the syntax `(expr) unit` may be used to force the suffix. 

```stylus
body
  n = 5
  foo: (n)em
  foo: (n)%
  foo: (n + 5)%
  foo: (n * 5)px
  foo: unit(n + 5, '%')
  foo: unit(5 + 180 / 2, deg)
```

## Color Operations

Operations on colors provide a terse, expressive way to alter components. For example, we can operate on each RGB:

```stylus
#0e0 + #0e0
// => #0f0
```

Another example is adjust the lightness value by adding or subtracting a percentage. To lighten a color, add; to darken, subtract.

```stylus
#888 + 50%
// => #c3c3c3

#888 - 50%
// => #444
```

Adjust the hue is also possible by adding or subtracting with degrees. For example, adding `50deg` to this red value results in a yellow:
 
```stylus
#f00 + 50deg
// => #ffd500
```

Values clamp appropriately. For example, we can "spin" the hue 180 degrees, and if the current value is `320deg`, it will resolve to `140deg`.

We may also tweak several values at once (including the alpha) by using `rgb()`, `rgba()`, `hsl()`, or `hsla()`:

```stylus
#f00 - rgba(100,0,0,0.5)
// => rgba(155,0,0,0.5)
```

## Sprintf

The string sprintf-like operator `%` can be used to generate a literal value, internally passing arguments through the `s()` built-in:

```stylus
'X::Microsoft::Crap(%s)' % #fc0
// => X::Microsoft::Crap(#fc0)
```

Multiple values should be parenthesized:
 
```stylus
'-webkit-gradient(%s, %s, %s)' % (linear (0 0) (0 100%))
// => -webkit-gradient(linear, 0 0, 0 100%)
```
