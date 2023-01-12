---
layout: default
permalink: docs/operators.html
---

# Operadores {#operators}

## Precedência de Operador {#operator-precedence}

Nesta seção está a table de precedência de operador, do mais alta à mais baixa:

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

## Operadores Unários {#unary-operators}

Os seguintes operadores unários estão disponíveis, `!`, `not`, `-`, `+`, e `~`.

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

O operador lógico `not` tem precedência baixa, portanto o seguinte exemplo poderia ser substítuido com:

```stylus
a = 0
b = 1

!a and !b
// => false
// parsed as: (!a) and (!b)
```

Com:

```stylus
not a or b
// => false
// parsed as: not (a or b)
```

## Operadores Binário {#binary-operators}

### Subscrito [] {#subscript}

O operador de subscrito permite-nos agarrar um valor dentro de uma expressão através do índice (baseado em zero).
Os valores de índice negativo começam com o último elemento na expressão.

```stylus
list = 1 2 3
list[0]
// => 1

list[-1]
// => 3
```

As expressões entre parêntesis podem agir como túplas (por exemplo `(15px 5px)`, `(1 2 3)`).

Nesta seção está um exemplo que usa túplas para manipulação de erro (e mostrando a versatilidade desta construção):

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

Nesta seção está um exemplo mais complexo. Agora estamos a invocar a função embutida `error()` com o retorno da mensagem de erro, sempre que o identificador (o primeiro valor) for igual a `error`.

```stylus
if (val = add(1,'5'))[0] == error
  error(val[1])
```

## Limite .. ... {#range}

Ambos operadores de limite inclusívo (`..`) e exclusívo (`...`) são fornecidos, expandindos para expressões:

```stylus
1..5
// => 1 2 3 4 5

1...5
// => 1 2 3 4

5..1
// => 5 4 3 2 1
```

### Aditivo: + - {#additive}

Os operadores binários aditivos e multiplicativos funcionam como esperado. A conversão de tipo é aplicada dentro das classes de tipo unitário ou predefinido para o valor literal. Por exemplo, `5s - 2px` resulta em `3s`.

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

### Multiplicativo: / * % {#multiplicative}

```stylus
2000ms + (1s * 2)
// => 4000ms

5s / 2
// => 2.5s

4 % 2
// => 0
```

Quando usas `/` dentro de um valor de propridade, **deves** envolver com parêntesis. Caso contrário o `/` é tomado literalmente (para suportar `line-height` de CSS):

```stylus
font: 14px/1.5;
```

Mas o seguinte é avaliado como `14px` ÷ `1.5`:

```stylus
font: (14px/1.5);
```

Isto é _somente_ exigido para o operador `/`.

### Operadores abreviados: += -= *= /= %= {#shorthand-operators}

Operadores abreviados funcionam como em outra linguagem comum. Com a variável de lista, o primeiro valor serão usados para executar os operadores e sobrescrever a lista para torná-la em uma variável valor único. Com a sequência de caracteres, apenas os valores de nó += funcionam como uma função de anexação. Com valor de tipo númerico, todos os operadores funcionam exatamente como um operador matemático normal. O mesmo é para o valor de cor.

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

### Expoente: ** {#exponent}

O operador exponencial:

```stylus
2 ** 8
// => 256
```

### Iqualdade & Relacional: == != >= <= > < {#equality-and-relational}

Operadores de igualdade podem ser usados para verificar a igualdade de unidades, cores, sequência de caracteres, e até mesmo identificadores. Isto é um conceito poderoso, até mesmo identificadores arbitrários (tais como `wahoo`) podem ser utilizados como átomos. Uma função poderia retornar `yes` ou `no` no lugar de `true` e `false` (embora não aconselhado).

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

Apenas os valores exatos correspondem. Por exemplo, `0 == false` e `null == false` são ambos `false`.

Pseudónimos:

```stylus
==    is
!=    is not
!=    isnt
```

## Veracidade {#truthfulness}

Quase tudo dentro da stylus resolve para `true`, incluindo unidades com um sufixo. Até mesmo `0%`, `0px`, etc. resolverá para `true` (porque é comum na stylus as combinações ou funções aceitarem unidades como válido).

No entanto, o próprio `0` é `false` nos termos aritméticos.

Expressões (ou "listas") com um comprimento maior do que 1 são considerados verdadeiros.

Exemplos de `true`:

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

Exemplos de `false`:

```stylus
0
null
false
''
```

### Operadores Lógicos: && || and or {#logical-operators}

Os operadores lógicos `&&` e `||` são apelidados de `and` e `or` que aplicam a mesma precedência.

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

### Operador de Existência: in {#existence-operator-in}

Consulta a existência do operando _à esquerda_ dentro da expressão _à direita_.

Exemplos simples:

```stylus
nums = 1 2 3
1 in nums
// => true

5 in nums
// => false
```

Alguns identificadores não definidos:

```stylus
words = foo bar baz
bar in words
// => true

HEY in words
// => false
```

Também funciona com as túplas:

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

Exemplo de uso em combinação:

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

Resulta em:

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

### Atribuição Condicional: ?= := {#conditional-assignment}

O operador de atribuição condicional `?=` (apelidado como `:=`) permite-nos definir variáveis sem excluir valores antigos (se presente). O operador expande para uma operação binária `is defined` sem um um ternário.

Todos os exemplos seguintes são equivalentes:

```stylus
color := white
color ?= white
color = color is defined ? color : white
```

Quando usamos um `=` simples, nós simplesmente reatribuimos:

```stylus
color = white
color = black

color
// => black
```

Mas quando usamos `?=`, a nossa segunda tentativa falha (já que a variável já está definida):

```stylus
color = white
color ?= black

color
// => white
```

### Verificação de Instância: is a {#instance-check-is-a}

A stylus fornece um operador binário nomeado `is a` usado para a verificação de tipo:

```stylus
15 is a 'unit'
// => true

#fff is a 'rgba'
// => true

15 is a 'rgba'
// => false
```

Alternativamente, nós poderiamos usar o função de instância binária `type()`:

```stylus
type(#fff) == 'rgba'
// => true  
```

**Nota**: `color` é o único caso especial, avaliando para `true` quando o operando à esquerda é um nó `RGBA` ou `HSLA`.

### Definição de Variável: is defined  {#variable-definition-is-defined}

Este pseudo operador binário não aceita um operador à direita, e _não_ avalia a esquerda. Isto permite-nos verificar se a variável tem um valor atribuído a ela.

```stylus
foo is defined
// => false

foo = 15px
foo is defined
// => true

#fff is defined
// => 'invalid "is defined" check on non-variable #fff'
```

Alternatimante, um pode usar a função embutida `lookup(name)` para fazer isto—ou realizar uma procura dinâmica:

```stylus
name = 'blue'
lookup('light-' + name)
// => null

light-blue = #80e2e9
lookup('light-' + name)
// => #80e2e9
```

Este operador é fundamental, já que um identificador não definido continua a ser um valor verdadeiro. Por exemplo:

```stylus
body
  if ohnoes
    padding 5px
```

_Resultará_ na seguinte CSS quando for não definido:

```css
body {
  padding: 5px;
}
```

No entanto, este estará seguro:

```stylus
body
  if ohnoes is defined
    padding 5px
```

## Ternário {#ternary}

O operador ternário funciona conforme esperaríamos na maioria das linguagens. É o único operador com três operandos (a expressão de _condição_, a expressão _verdadeira_, e a expressão _falsa_).

```stylus
num = 15
num ? unit(num, 'px') : 20px
// => 15px
```

## Moldagem {#casting}

Como uma alternativa concisa à função embutida `unit()`, a sintaxe `(expr) unit` pode ser usado para forçar o sufixo.

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

## Operações de Cor {#color-operations}

As operações sobre as cores fornce uma maneira concisa e expressiva para alterar os componentes. Por exemplo, podemos operar sobre cada RGB:

```stylus
#0e0 + #0e0
// => #0f0
```

Um outro exemplo é o ajuste do valor de claridade pela adição ou subtração de uma percentagem. Para aclarar uma cor, adicione; para escurecer, subtraia.

```stylus
#888 + 50%
// => #c3c3c3

#888 - 50%
// => #444
```

Ajuste da tonalidade também é possível pela adição ou substração com graus. Por exemplo, adicionando `50deg` para este valor de vermelho resulta em um amarelo:

```stylus
#f00 + 50deg
// => #ffd500
```

Os valores apertam apropriadamente. Por exemplo, podemos "girar" a tonalidade para `180deg`, e se o valor atual é `320deg`, resolverá para `140deg`.

Nós podemos também torcer vários valores de uma vez (incluindo alfa) pelo uso `rgb()`, `rgba()`, `hsl()`, ou `hsla()`:

```stylus
#f00 - rgba(100,0,0,0.5)
// => rgba(155,0,0,0.5)
```

## Sprintf {#sprintf}

O operador `%` de sequência de caracteres parecido com o `sprintf` pode ser usado para gerar um valor literal, internamente passando argumentos através da função embutida `s()`:

```stylus
'X::Microsoft::Crap(%s)' % #fc0
// => X::Microsoft::Crap(#fc0)
```

Os vários valores deve ser colocado em parêntesis:

```stylus
'-webkit-gradient(%s, %s, %s)' % (linear (0 0) (0 100%))
// => -webkit-gradient(linear, 0 0, 0 100%)
```
