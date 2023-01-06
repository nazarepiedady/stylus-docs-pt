---
layout: default
permalink: docs/comments.html
---

# Comentários {#comments}

A Stylus suporta três tipos de comentários: única linha, várias linhas, e várias linhas amortecidas.

## Única Linha {#single-line}

Os comentários de única linha são parecidos com os comentários da JavaScript, e não fazem parte da folha de estilo de CSS compilada:

```stylus
// Eu sou um comentário!
body
  padding 5px // algum enchimento (padding, em Inglês) impressionante
```

## Várias Linhas {#multi-line}

Os comentários de várias linhas são idênticos aos comentários normais de CSS. No entanto, só são processados como parte da folha de estilo compilada quando a opção `compress` não está ativada:

```stylus
/*
 * Some dois dados números.
 */
add(a, b)
  a + b
```

## Várias Linhas Amortecidas {#multi-line-buffered}

Os comentários de várias linhas que não são suprimidos começam com `/*!`. Isto diz a Stylus para processar o cometário na folha de estilo compilada independentemente da compressão:

```stylus
/*!
 * Some dois dados números.
 */
add(a, b)
  a + b
```
