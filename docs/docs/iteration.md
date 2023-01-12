---
layout: default
permalink: docs/iteration.html
---

# Iteração {#iteration}

A stylus permite-te iterar expressões através do construtor `for/in`, assumindo a forma de:

```bash
for <val-name> [, <key-name>] in <expression>
```
Por exemplo:

```stylus
body
  for num in 1 2 3
    foo num
```

Resulta em:

```stylus
body {
  foo: 1;
  foo: 2;
  foo: 3;
}
```

O exemplo abaixo mostra como usar a `<key-name>`:

```stylus
body
  fonts = Impact Arial sans-serif
  for font, i in fonts
    foo i font
```

Resultando em:

```css
body {
  foo: 0 Impact;
  foo: 1 Arial;
  foo: 2 sans-serif;
}
```

E cá está como fazes um laço `for` normal

```stylus
body
  for num in (1..5)
    foo num
```

Resulta em:

```css
body {
  foo: 1;
  foo: 2;
  foo: 3;
  foo: 4;
  foo: 5;
}
```

Uso com sequências de caracteres:

```stylus
for num in (1..10)
  .box{num}
    animation: box + num 5s infinite
  
  @keframes box{num}
    0%   { left: 0px }
    100% { left: (num * 30px) }
```

## Combinadores {#mixins}

Nós podemos usar a iteração dentro dos combinadores para produzir uma funcionalidade poderosa. Por exemplo, podemos aplicar pares de expressão como propriedades com uso de interpolação e iteração.

Abaixo definimos `apply()`, utilizando condicionalmente todos os `arguments` para que as listas de expressão _e_ delimitadas com virgula sejam suportadas:

```stylus
apply(props)
  props = arguments if length(arguments) > 1
  for prop in props
    {prop[0]} prop[1]

body
  apply(one 1, two 2, three 3)

body
  list = (one 1) (two 2) (three 3)
  apply(list)
```

## Funções {#functions}

As funções de stylus também podem conter laços `for`. Abaixo estão alguns exemplos de casos de uso:

Sum:

```stylus
sum(nums)
  sum = 0
  for n in nums
    sum += n

sum(1 2 3)
// => 6
```

join:

```stylus
join(delim, args)
  buf = ''
  for arg, index in args
    if index
      buf += delim + arg
    else
      buf += arg

join(', ', foo bar baz)
// => "foo, bar, baz"
```

## Sufixo {#postfix}

Da mesma maneira que o `if` / `unless` pode ser utilizada após a declaração, o mesmo pode ser feito com `for`. Abaixo estão os mesmos exemplos que os de cima utilizando a sintaxe de sufixo:


```stylus
sum(nums)
  sum = 0
  sum += n for n in nums


join(delim, args)
  buf = ''
  buf += i ? delim + arg : arg for arg, i in args
```

Nós também podemos __retornar__ a partir de dentro de um laço, abaixo está um exemplo retornando o número quando `n % 2 == 0` avaliar para __verdadeiro__ (`true`).

```stylus
first-even(nums)
  return n if n % 2 == 0 for n in nums

first-even(1 3 5 5 6 3 2)
// => 6
```
