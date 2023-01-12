---
layout: default
permalink: docs/media.html
---

# @media {#at-media}

As consultas de `@media` funcionam tal como dentro da CSS regular, mas com a notação de bloco da Stylus:

```stylus
@media print
  #header
  #footer
    display none
```

Resultando em:

```css
@media print {
  #header,
  #footer {
    display: none;
  }
}
```

## Transbordar da Consulta de Mídia {#media-query-bubbling}

As consultas de mídia também podem ser encaixadas, e serão expandidas para envolver o contexto no qual são usadas. Por exemplo:

```stylus
.widget
  padding 10px
  
  @media screen and (min-width: 600px)
    padding 20px
```

Resultando em:

```css
.widget {
  padding: 10px;
}

@media screen and (min-width: 600px) {
  .widget {
    padding: 20px;
  }
}
```

## Consultas de Mídia Encaixada {#nested-media-queries}

Tu podes encaixar `@media` dentro de umas das outras e combinariam em uma:

```stylus
@media (max-width: 500px)
  .foo
    color: #000

  @media (min-width: 100px), (min-height: 200px)
    .foo
      color: #100
```

Resultaria em

```css
@media (max-width: 500px) {
  .foo {
    color: #000;
  }
}
@media (max-width: 500px) and (min-width: 100px), (max-width: 500px) and (min-height: 200px) {
  .foo {
    color: #100;
  }
}
```

## Interpolações e Variáveis {#interpolations-and-variables}

Tu podes usar ambas interpolações e variáveis dentro das consultas de mídia, então é possível fazer coisas como isto:

```stylus
foo = 'width'
bar = 30em
@media (max-{foo}: bar)
  body
    color #fff
```

This would yield
Isto resultaria em

```stylus
@media (max-width: 30em) {
  body {
    color: #fff;
  }
}
```

Também é possível usar as expressões dentro das consultas de mídia:

```stylus
.foo
  for i in 1..4
    @media (min-width: 2**(i+7)px)
      width: 100px*i
```

resultaria em

```css
@media (min-width: 256px) {
  .foo {
    width: 100px;
  }
}
@media (min-width: 512px) {
  .foo {
    width: 200px;
  }
}
@media (min-width: 1024px) {
  .foo {
    width: 300px;
  }
}
@media (min-width: 2048px) {
  .foo {
    width: 400px;
  }
}
```
