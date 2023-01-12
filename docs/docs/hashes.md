---
layout: default
permalink: docs/hashes.html
---

# Dicionários {#hashes}

Na versão `0.39.0` a stylus recebeu os objetos dicionário.

## Definir {#define}

Tu podes definir um dicionário com uso de parêntesis curvos e dois pontos para dividir as chaves e os valores:

```stylus
foo = {
  bar: baz,
  baz: raz
}
```

as chaves devem ser ou identificadores apropriados ou sequências de caracteres:

```stylus
foo = {
  bar: baz,
  'baz': raz,
  '0': raz
}
```

Quando já tiveres um dicionário, podes definir os seus valores usandos parêntesis retos e sequências de caracteres dentro:

```stylus
foo = {}
foo['bar'] = baz
foo['baz'] = raz
```

Nota que enquanto não poderes usar as variáveis ou interpolações nos parêntesis curvos da definição, podes usar variáveis dentro dos parêntesis retos:

```stylus
foo = {}
bar = 'baz'
foo[bar] = raz

foo.baz
// => raz
```

### Dicionário Anónimos

Nós podemos criar anónimos objetos de dicionário para lista, um tipo de objeto com nome de variável de saída.

```stylus
list = foo {int: 1, str: '1'} {node: a-node, color: #32E}

list[0]
// => foo

type(list[0])
// => 'ident'

type(list[1])
// => 'object'

list[1].int
// => 1

list[2].color
// => #32E
```

Para acessar os seus valores, podemos usar ambas a sintaxe de parêntesis reto (`['str']`) e sintaxe de ponto (`.`). A sintaxe de parêntesis retos funciona bem para programação, enquanto a sintaxe de ponto é mais legível e parecida com a sintaxe de JSON. Ela funciona bem com iteração e também com declaração condicional.

## Recuperadores {#getters}

Para recuperar valores a partir dos dicionários podes usar o ponto para os identificadores:

```stylus
foo = { bar: "baz" }

foo.bar
// => "baz"
```

Ou parêntesis retos com sequências de caracteres para qualquer coisa:

```stylus
foo = { "%": 10 }
baz = "%"

foo[baz]
// => 10
```

Tu podes usar quaisquer combinações que quiseres:

```stylus
foo = {
  bar: {
    baz: {
      raz: 10px
    }
  }
}

qux = "raz"
foo["bar"].baz[qux]
// => 10px
```

## Interpolação {#interpolation}

Os dicionários usados dentro de uma interpolação produziriam o conteúdo dos dicionários como CSS (embora sem quase quaisquer funcionalidades da stylus):

```stylus
foo = {
  width: 10px,
  height: 20px,
  '&:hover': {
    padding: 0

  }
}

.bar
  {foo}

// => .bar {
//      width: 10px;
//      height: 20px;
//    }
//    .bar:hover {
//      padding: 0;
//    }
```

## Outras coisas {#other-stuff}

Tu podes usar outras coisas da stylus normal com os dicionários, como `length()`:

```stylus
foo = { bar: 'a', baz: 'b' }

length(foo)
// => 2
```

Tu podes iterar através dos dicionários com o parâmetro chave opcional:

```stylus
foo = { width: 10px, height: 20px }

for key, value in foo
  {key}: value

// => width: 10px;
//    height: 20px;
```

Tu podes verificar a existência de uma chave no dicionário usando `in`:

```stylus
foo = { bar: 10px}

bar in foo
// => true

baz in foo
// => false
```

Tu podes receber as chaves ou valores do dicionário usando funções embutidas correspondentes:

```stylus
foo = { bar: 'a', baz: 'b' }

keys(foo)
// => 'bar' 'baz'

values(foo)
// => 'a' 'b'
```

Tu podes remover uma chave a partir do dicionário usando a função embutida `remove`:

```stylus
obj = { foo: 1, bar: 2 }
remove(obj, 'foo')
// => {"bar":"(2)"}
```

E podes usar `merge` (apelidado como `extend`) para fundir os dicionários:

```stylus
obj = {
  foo: 'foo'
  bar: 'bar'
}

obj2 = {
  baz: 'baz'
}

merge(obj, obj2)
// => {"foo":"('foo')","bar":"('bar')","baz":"('baz')"}
```
