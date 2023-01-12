---
layout: default
permalink: docs/functions.html
---

# Funções {#functions}


A stylus usufrui de poderosa funcionalidade para definições de função. As definições de função são idênticas as combinações; no entanto, as funções podem retornar um valor.

## Valores de Retorno {#return-values}

Vamos experimentar um exemplo insignificante: a criação de uma função que soma dois números.

```stylus
add(a, b)
  a + b
```

Nós podemos então usar esta função em condicionais, em valores de propriedade, etc.

```stylus
body
  padding add(10px, 5)
```

Resulta em:

```css  
body {
  padding: 15px;
}
```

## Valores Predefinidos para Argumento {#argument-defaults}

Os argumentos opcionais podem predefinidas para uma dada expressão. Com a stylus podemos até mesmo predefinir argumentos aos argumentos mais próximo!

Por exemplo:

```stylus
add(a, b = a)
  a + b

add(10, 5)
// => 15

add(10)
// => 20
```

**Nota:** Já que argumentos predefinidos são atribuições, também podemos usar chamadas de função para as predefinições:

```stylus
add(a, b = unit(a, px))
  a + b
```

## Parâmetros Nomeados {#named-parameters}

As funções aceitam parâmetros nomeados. Isto liberta-te da responsibilidade de lembrar a ordem dos parâmetros, ou simplesmente melhora a legibilidade do teu código.

Por exemplo:

```stylus
subtract(a, b)
  a - b

subtract(b: 10, a: 25)
```

## Corpos de Função {#function-bodies}

Nós podemos levar a nossa simples função `add()` mais adiante. Vamos distribuir todas as unidades passadas como `px` através da função `unit()` embutida.

```stylus
add(a, b = a)
  a = unit(a, px)
  b = unit(b, px)
  a + b

add(15%, 10deg)
// => 25
```

## Vários Valores de Retorno {#multiple-return-values}

As funções da stylus podem retornar vários valores—tal como podes atribuir vários valores para uma variável.

Por exemplo, a atribuição seguinte é uma atribuição válida:

```stylus
sizes = 15px 10px

sizes[0]
// => 15px
```

Similarmente, podemos retornar vários valores:

```stylus
sizes()
  15px 10px

sizes()[0]
// => 15px
```

Uma ligeira exceção é quando os valores retornados sã́o identificadores. O exemplo seguinte se parece com uma atribuição de propriedade para a stylus (já que nenhum operador se faz presente):

```stylus
swap(a, b)
  b a
```

Para esclarecer, podemos entanto envolver com parêntesis, ou usar a palavra `return`:


```stylus
swap(a, b)
  (b a)

swap(a, b)
  return b a
```

## Condicionais {#conditionals}

Vamos dizer que queremos criar uma função nomeada `stringish()` para determinar se o argumento pode ser transformado em uma sequência de caracteres. Nós verificamos se `val` é uma sequência de caracteres, ou um identificador (que é parecida com sequência de caracteres). Por causa dos identificadores não definidos entregam-se como valor, podemos compará-los com sigo mesmos como mostrado no exemplo abaixo (onde `yes` e `no` são usados no lugar de `true` e `false`):

```stylus
stringish(val)
  if val is a 'string' or val is a 'ident'
    yes
  else
    no
```

Uso:

```stylus
stringish('yay') == yes
// => true

stringish(yay) == yes
// => true

stringish(0) == no
// => true
```

**Nota**: `yes` e `no` não são booleanos literais. Eles são simplesmente identificadores não definidos neste caso.

Um outro exemplo:

```stylus
compare(a, b)
  if a > b
    higher
  else if a < b
    lower
  else
    equal
```

Uso:

```stylus
compare(5, 2)
// => higher

compare(1, 5)
// => lower

compare(10, 10)
// => equal
```

## Atribuição de Pseudónimos {#aliasing}

Para definir um pseudónimo para uma função, simplesmente atribua um nome da função para um novo identificador. Por exemplo, a nossa função `add()` poderia ser pseudónimada como `plus()`, tal como:

```stylus
plus = add

plus(1, 2)
// => 3
```

## Funções de Variável {#variable-functions}

Da mesma maneira que podemos definir "pseudónimos" para uma função, podemos também passar uma função. Nesta seção, a nossa função `invoke()` aceita uma função, assim podemos passá-la `add()` ou `sub()`.

```stylus
add(a, b)
  a + b

sub(a, b)
  a - b

invoke(a, b, fn)
  fn(a, b)

body
  padding invoke(5, 10, add)
  padding invoke(5, 10, sub)
```

Resulta em:

```css
body {
  padding: 15;
  padding: -5;
}
```

## Funções Anónimas {#anonymous-functions}

Tu podes usar funções anónimas onde precisávamos usar a sintaxe `@(){}`. Nesta seção está como poderias usá-la para criar uma função `sort()` personalizada:

```stylus
sort(list, fn = null)
  // default sort function
  if fn == null
    fn = @(a, b) {
      a > b
    }

  // bubble sort
  for $i in 1..length(list) - 1
    for $j in 0..$i - 1
      if fn(list[$j], list[$i])
        $temp = list[$i]
        list[$i] = list[$j]
        list[$j] = $temp
  return list

  sort('e' 'c' 'f' 'a' 'b' 'd')
  // => 'a' 'b' 'c' 'd' 'e' 'f'

  sort(5 3 6 1 2 4, @(a, b){
    a < b
  })
  // => 6 5 4 3 2 1
```

## arguments {#arguments}

Os `arguments` local está disponível para todos corpos de função, e contém todos os argumentos passados.

Por exemplo:

```stylus
sum()
  n = 0
  for num in arguments
    n = n + num

sum(1,2,3,4,5)
// => 15
```

## Exemplo de Dicionário (hash) {#hash-example}

Nesta seção nós definimos a função `get(hash, key)`, que retorna o valor de `key` (ou `null`). Nós iteramos cada `pair` em `hash`, e retornamos o nó do segundo par quando o primeiro (o `key`) corresponde.

```stylus
get(hash, key)
  return pair[1] if pair[0] == key for pair in hash
```

Como é demonstrado abaixo, as funções—emparelhadas da linguagem com as expressões robustas de stylus—podem fornecer uma grande flexibilidade:

```stylus
hash = (one 1) (two 2) (three 3)

get(hash, two)
// => 2

get(hash, three)
// => 3

get(hash, something)
// => null
```
