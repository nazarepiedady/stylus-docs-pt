---
layout: default
permalink: docs/error-reporting.html
---

# Reportagem de Erro {#error-reporting}

A stylus tem um sistema de reportagem de erro para sintaxe, analise, e avaliação completa de erros com vestígios da pilha, números de linha, e nomes de ficheiro.

## Erro de Analise {#parse-error}

Exemplo de erro de analise:

```stylus
     body
       form input
         == padding 5px
```

Resulta em:

```bash
ParseError: test.styl:3:16
  1| body
  2|    form input
  3|      == padding 5px
---------------------^
  4|

illegal unary "==", missing left-hand operand
```

## Erro de Avaliação {#evaluation-error}

Este erro de "tempo de execução" ou avaliação é causado pela passagem de uma sequência de caracteres para `border-radius()`, no lugar da `Unit` esperado (com o uso do nosso auxiliar `ensure(n, 'unit')`).

```stylus
ensure(val, type)
  unless val is a type
    error('expected a ' + type + ', but got ' + typeof(val))

border-radius(n)
  ensure(n, 'unit')
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

body
  border-radius '5px'
```

Resulta em:

```bash
Error: test.styl:3:62
  1| ensure(val, type)
  2|     unless val is a type
  3|       error('expected a ' + type + ', but got ' + typeof(val))
-------------------------------------------------------------------^
  4|
  5| border-radius(n)
  6|   ensure(n, 'unit')

expected a unit, but got string
    at ensure() (test.styl:2:17)
    at border-radius() (test.styl:6:16)
    at "body" (test.styl:10:18)
```
