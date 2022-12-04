---
layout: default
permalink: docs/keyframes.html
---

# @keyframes {#keyframes}

A Stylus suporta `@keyframes` tanto com chavetas ou sem elas, também podes usar a interpolação tanto nos nomes ou fases do `@keyframes`:

```stylus
$keyframe-name = pulse
@keyframes {$keyframe-name}
  for i in 0..10
    {10% * i}
      opacity (i/10)
```

Resultando em (prefixos expandidos omitidos):

```css
@keyframes pulse {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.2;
  }
  40% {
    opacity: 0.4;
  }
  60% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
```

## Expansão {#expansion}

Ao usar a `@keyframes`, as tuas regras são automaticamente expandidas para os prefixos definidos pela variável `vendors` (padrão: `moz webkit o ms official`). Isto significa que podemos alterá-lo em qualquer momento para a expansão surtir efeito imediatamente.

**Nota que a expansão da `@keyframes` para as regras arroba prefixadas seriam removidas da Stylus quando chegássemos nela**.

Por exemplo, considere o seguinte:

```css
@keyframes foo {
  from {
    color: black
  }
  to {
    color: white
  }
}
```

Isto expande para os três prefixos padrão, e a sintaxe oficial:

```css
@-moz-keyframes foo {
  from {
    color: #000;
  }
  to {
    color: #fff;
  }
}
@-webkit-keyframes foo {
  from {
    color: #000;
  }
  to {
    color: #fff;
  }
}
@-o-keyframes foo {
  from {
    color: #000;
  }
  to {
    color: #fff;
  }
}
@keyframes foo {
  from {
    color: #000;
  }
  to {
    color: #fff;
  }
}
```

Se quiséssemos limitar a sintaxe oficial apenas, simplesmente alteramos a `vendors`:

```stylus
vendors = official

@keyframes foo {
  from {
    color: black
  }
  to {
    color: white
  }
}
```

Resultando em:

```css
@keyframes foo {
  from {
    color: #000;
  }
  to {
    color: #fff;
  }
}
```
