---
layout: default
permalink: docs/kwargs.html
---

# Argumentos de Palavra-Chave {#keyword-arguments}

A Stylus suporta argumentos de palavra-chave, ou "kwargs". Estes permitem-te referenciar os argumentos pelo nome de parâmetro associado.

Os exemplos mostrados abaixo são funcionalmente equivalente. No entanto, podemos colocar os argumentos de palavra-chave em qualquer lugar dentro da lista. Os argumentos restantes que _não_ são chaves serão aplicados aos parâmetros que não têm sido satisfeitos.

```stylus
body {
  color: rgba(255, 200, 100, 0.5);
  color: rgba(red: 255, green: 200, blue: 100, alpha: 0.5);
  color: rgba(alpha: 0.5, blue: 100, red: 255, 200);
  color: rgba(alpha: 0.5, blue: 100, 255, 200);
}
```

Resultando em:

```css
body {
  color: rgba(255,200,100,0.5);
  color: rgba(255,200,100,0.5);
  color: rgba(255,200,100,0.5);
  color: rgba(255,200,100,0.5);
}
```

Para ver quais parâmetros uma função ou misturador aceita, use a função `p()`:

```stylus
p(rgba)
```

Resultando em:

```bash
inspect: rgba(red, green, blue, alpha)
```