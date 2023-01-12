---
layout: default
permalink: docs/mixins.html
---

# Combinadores {#mixins}

Tanto os combinadores e funções são definidas da mesma maneira, mas eles são aplicados de maneiras diferentes.

Por exemplo, temos uma função `border-radius(n)` definida abaixo, que é invocada como um _combinador_ (por exemplo, invocada como uma declaração, em vez de uma parte de uma expressão).

Quando `border-radius()` é invocado dentro de um seletor, as propriedades são expandidas e copiadas para o seletor.

```stylus
border-radius(n)
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

form input[type=button]
  border-radius(5px)
```

Compila para:

```css
form input[type=button] {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
```

Quando estiveres a usar os combinadores podes omitir os parêntesis completamente, fornecendo suporte transparente de propriedade ambulante fantástico!

```stylus
border-radius(n)
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

form input[type=button]
  border-radius 5px
```

Nota que o `border-radius` dentro do nosso combinador é tratado como uma propriedade, e não uma invocação de função recursiva.


Para levar isto mais adiante, podemos utilizar a variável local automática `arguments`, contendo a expressão passada, permitindo que vários valores sejam passados:

```stylus
border-radius()
  -webkit-border-radius arguments
  -moz-border-radius arguments
  border-radius arguments
```

Agora podemos passar valores como `border-radius 1px 2px / 3px 4px`!

Além disto podemos fazer uso da [interpolação](https://stylus-lang.com/docs/interpolation.html) `{param}`:

```stylus
border(side, args...)
  if side
    border-{side}  args
  else
    border args

.border-thick
  border('left' , 10px, 'darkred')

.border
  border('' , 1px, 'darkred')
```

Resultando em:

```stylus
.border-thick {
  border-left: 10px 'darkred';
}
.border {
  border: 1px 'darkred';
}
```

Um outro excelente uso disto é a adição de suporte transparente para especificações ambulantes—tais como suporte a `opacity` para Internet Explorer:

```stylus
support-for-ie ?= true

opacity(n)
  opacity n
  if support-for-ie
    filter unquote('progid:DXImageTransform.Microsoft.Alpha(Opacity=' + round(n * 100) + ')')

#logo
  &:hover
    opacity 0.5
```

Resultando em:

```css
#logo:hover {
  opacity: 0.5;
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);
}
```

## Referências do Pai {#parent-references}

Os combinadores podem utilizar o caractér de referência do pai `&`, agindo sobre o pai no lugar de encaixamento mais adiante.

Por exemplo, vamos dizer que queremos criar um combinador `stripe(even, odd)` para estilizar as linhas da tabela como se fossem faixas. Nós fornecemos ambos `even` e `odd` com valores de cor padrão, e atribuimos a propriedade `background-color` sobre a linha. Encaixado dentro do `tr` usamos `&` para fazer referência ao `tr`, fornecendo a cor `even`.

```stylus
stripe(even = #fff, odd = #eee)
  tr
    background-color odd
    &.even
    &:nth-child(even)
      background-color even
```

Nós podemos então utilizar o combinador como mostrado abaixo:

```stylus
table
  stripe()
  td
    padding 4px 10px

table#users
  stripe(#303030, #494848)
  td
    color white
```

Alternativamente, `stripe()` poderia ser definida sem a referência ao elemento pai:

```stylus
stripe(even = #fff, odd = #eee)
  tr
    background-color odd
  tr.even
  tr:nth-child(even)
    background-color even
```

Se desejassemos, poderiamos invocar `stripe()` como se ela fosse uma propriedade:

```stylus
stripe #fff #000
```

## Combinadores de Bloco {#block-mixins}

Tu podes passar blocos para os combinadores chamando o combinar com o prefixo `+`:

```stylus
+foo()
  width: 10px
```

O bloco passado estaria disponível dentro do combinador como variável `block`, que depois poderia ser usada dentro da interpolação:

```stylus
foo()
  .bar
    {block}

+foo()
  width: 10px

=> .bar {
      width: 10px;
    }
```

Esta funcionalidade está dentro do seu estado de rascunho (ATM), mas seria melhorada no futuro.

## Combinando Combinadores dentro de Combinadores {#mixing-mixins-in-mixins}

Os combinadores podem (com certeza!) utilizar outros combinadores, contruindo sobre os seus seletores e propriedades.

Por exemplo, abaixo criamos `comma-list()` para incorporar (através de `inline-list()`) e separar por vírgula uma lista não ordenada.

```stylus
inline-list()
  li
    display inline

comma-list()
  inline-list()
  li
    &:after
      content ', '
    &:last-child:after
      content ''

ul
  comma-list()
```

Resultando em:

```css
ul li:after {
  content: ", ";
}
ul li:last-child:after {
  content: "";
}
ul li {
  display: inline;
}
```
