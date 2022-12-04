---
layout: default
permalink: docs/variables.html
---

# Variáveis {#variables}

Nós podemos atribuir expressões a variáveis e usá-las por toda nossa folha de estilo:

```stylus
font-size = 14px

body
  font font-size Arial, sans-serif

//Compila para:
body {
  font: 14px Arial, sans-serif;
}
```

As variáveis podem ser composta de uma lista de expressão:

```stylus
font-size = 14px
font-stack = "Lucida Grande", Arial, sans-serif

body
  font font-size font-stack

//Compila para:
body {
  font: 14px "Lucida Grande", Arial, sans-serif;
}
```

Os identificadores (nomes de variáveis, funções, etc.) também podem incluir o carácter `$`. Por exemplo:

```stylus
$font-size = 14px
body {
  font: $font-size sans-serif;
}
```

Nós não podemos usar `null` para criar uma variável vazia, mas os parênteses `()` podem ser usados para isto:

```stylus
empty = ()
body {
  font: empty sans-serif;
}
```

Compila para:

```css
    body {
      font: sans-serif;
    }
```

## Consulta de Propriedade {#property-lookup}

Uma outra funcionalidade fantástica exclusiva da Stylus é a habilidade de referenciar propriedades definidas _sem_ a atribuição de seus valores às variáveis. Um excelente exemplo disto é a lógica obrigatória para o centralizar verticalmente e horizontalmente um elemento (normalmente realizado com uso de percentagens e margens negativas, como mostrado a seguir):

```stylus
#logo
  position: absolute
  top: 50%
  left: 50%
  width: w = 150px
  height: h = 80px
  margin-left: -(w / 2)
  margin-top: -(h / 2)
```

No lugar de atribuir as variáveis `w` e `h`, podemos simplesmente prefixar o nome da propriedade com o carácter `@` para acessar o valor:

```stylus
#logo
  position: absolute
  top: 50%
  left: 50%
  width: 150px
  height: 80px
  margin-left: -(@width / 2)
  margin-top: -(@height / 2)
```

Um outro caso de uso é a definir condicionalmente as propriedades dentro de misturadores baseados sobre a existência de outros. No exemplo seguinte, aplicamos um `z-index` padrão como `1` — mas _somente_ se `z-index` não foi especificado antes:

```stylus
position()
  position: arguments
  z-index: 1 unless @z-index

#logo
  z-index: 20
  position: absolute

#logo2
  position: absolute
```

A consulta de propriedade "transbordará" a pilha até encontrar, ou retornar `null` se a propriedade não puder ser resolvida. No exemplo seguinte, `@color` resolverá para `blue`:

```stylus
body
  color: red
  ul
    li
      color: blue
      a
        background-color: @color
```