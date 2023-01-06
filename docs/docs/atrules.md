---
layout: default
permalink: docs/atrules.html
---

# Outras Regras Arroba {#other-at-rules}

A Stylus tem um suporte básico para a sintaxe sem chavetas para a maioria das regras arroba da CSS, tais como `@viewport`, `@page`, `@host`, `@supports` e outros:

```stylus
@viewport
  color: #00f

@supports (display: flex)
  div
    display: flex

@page :blank
  @top-center
    content: none
```

Compilaria para

```css
@viewport {
  color: #00f;
}
@supports (display: flex) {
  div {
    display: flex;
  }
}
@page :blank {
  @top-center {
    content: none;
  }
}
```
## Regras Arroba Desconhecidas {#unknown-at-rules}

A Stylus suporta ainda quaisquer regras arroba desconhecida, assim é amistosa com o futuro, já que quaisquer regras arroba novas na CSS poderiam ser escritas na sintaxe baseada em indentação da Stylus e seriam interpretadas perfeitamente:

```stylus
@foo
  @bar
    width: 10px

    .baz
      height: 10px
```

Seria compilada para

```css
@foo {
  @bar {
    width: 10px;
    .baz {
      height: 10px;
    }
  }
}
```