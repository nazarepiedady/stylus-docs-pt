---
layout: default
permalink: docs/escape.html
---

# Escapamento de Carácter {#char-escaping}

A Stylus permite-te escapar caracteres. Isto transforma-os efetivamente em identificadores, permitindo-os serem interpretados como literais.

Por exemplo:

```stylus
body
  padding 1 \+ 2
```

Compila para:

```css
body {
  padding: 1 + 2;
}
```

Nota que a Stylus exige que `/` está entre parênteses quando usada em uma propriedade:

```stylus
body
  font 14px/1.4
  font (14px/1.4)
```

resulta em:

```css
body {
  font: 14px/1.4;
  font: 10px;
}
```
