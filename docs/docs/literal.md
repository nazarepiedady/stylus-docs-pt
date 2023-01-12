---
layout: default
permalink: docs/literal.html
---

# Literal de CSS {#css-literal}

Se por qualquer razão a stylus não poder contemplar uma necessidade específica, podes sempre recorrer a literal de CSS com `@css`:

```css
@css {
    .ie-opacity {
        filter: progid:DXImageTransform.Microsoft.Alpha(opacity=25);
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=25)";
    }
}
```

Compilando para:

```stylus
.ie-opacity {  
    filter: progid:DXImageTransform.Microsoft.Alpha(opacity=25);
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=25)";
}
```
