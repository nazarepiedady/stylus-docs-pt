---
layout: default
permalink: docs/introspection.html
---

# API de Introspeção {#introspection-api}

A Stylus suporta uma API de introspeção. Isto permite que os misturadores e funções reflitam o chamador, etc.


## mixin {#mixin}

A variável local `mixin` é atribuída automaticamente dentro dos corpos de função. Ela contém uma sequência de caracteres `root` se a função for chamada no nível da raiz, ou `block` a indicar o contrário, e finalmente `false` se a função invocada esperar  um valor de retorno.

No exemplo seguinte, definimos `reset()` para alterar o seu comportamento dependendo se está misturado para a raiz, para um outro bloco, ou para um valor de retorno, conforme usado na propriedade `foo` abaixo:

```stylus
reset()
  if mixin == 'root'
    got
      root true
  else if mixin
    got 'a mixin'
  else
    'not a mixin'

reset()

body
  reset()
  foo reset()
```

Compila para:

```css
got {
  root: true;
}
body {
  foo: "not a mixin";
  got: "a mixin";
}
```
