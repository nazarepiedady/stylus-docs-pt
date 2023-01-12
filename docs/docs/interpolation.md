---
layout: default
permalink: docs/interpolation.html
---

# Interpolação {#interpolation}

A Stylus suporta interpolação com o uso dos caracteres `{}` para envolver uma expressão, que depois torna-se parte do identificador. Por exemplo, `-webkit-{'border' + '-radius'}` avalia para `-webkit-border-radius`.

Um excelente exemplo de caso de uso para isto é a expansão de propriedades com prefixos.

```stylus
vendor(prop, args)
  -webkit-{prop} args
  -moz-{prop} args
  {prop} args

border-radius()
  vendor('border-radius', arguments)

box-shadow()
  vendor('box-shadow', arguments)

button
  border-radius 1px 2px / 3px 4px
```

Resulta em:

```css
button {
  -webkit-border-radius: 1px 2px / 3px 4px;
  -moz-border-radius: 1px 2px / 3px 4px;
  border-radius: 1px 2px / 3px 4px;
}
```

## Interpolação de Seletor {#selector-interpolation}

A interpolação também funciona com os seletores. Por exemplo, podemos iterar para atribuir a propriedade `height` para as primeiras 5 linhas em uma tabela, conforme mostrado abaixo:

```stylus
table
  for row in 1 2 3 4 5
    tr:nth-child({row})
      height: 10px * row
```

Resulta em:

```css
table tr:nth-child(1) {
  height: 10px;
}
table tr:nth-child(2) {
  height: 20px;
}
table tr:nth-child(3) {
  height: 30px;
}
table tr:nth-child(4) {
  height: 40px;
}
table tr:nth-child(5) {
  height: 50px;
}
```

Tu também podes organizar vários seletores em uma variável com a construção de uma sequência de caracteres e interpolá-las em algum ponto:

```stylus
mySelectors = '#foo,#bar,.baz'

{mySelectors}
  background: #000
```

Resulta em:

```css
#foo,
#bar,
.baz {
  background: #000;
}
```