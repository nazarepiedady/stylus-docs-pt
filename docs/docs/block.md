---
layout: default
permalink: docs/block.html
---

# @block {#at-block}

Tu podes atribuir qualquer bloco de código na Stylus a uma variável e depois chamá-lo, passar como argumento ou re-usar de qualquer outra maneira.

Para definir um bloco, podes ou escrevê-lo com uma indentação acrescentada depois de um sinal de atribuição:

```stylus
foo =
  width: 20px
  height: 20px
```

ou usar uma sintaxe de chavetas com a palavra-chave `@block`:

```stylus
foo = @block {
  width: 20px
  height: 20px
}
```

se gostarias de interpretar este bloco em qualquer sítio, poderias chamar esta variável dentro de uma interpolação, assim

```stylus
.icon
  {foo}
```

interpretaria para

```css
.icon {
  width: 20px;
  height: 20px;
}
```

Já agora, esta é a mesma maneira que podes usar os blocos passados para os [misturadores de bloco](mixins.html#block-mixins).

Agora só podes passar a variável como qualquer outra variável e interpretá-la dentro de uma interpolação. No futuro forneceríamos mais maneiras de manipular isto.
