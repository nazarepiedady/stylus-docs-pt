---
layout: default
permalink: docs/font-face.html
---

# @font-face {#font-face}

A regra arroba `@font-face` espera conforme esperarias. Adicione simplesmente um bloco de propriedades depois dela, desta maneira:
 
```stylus
@font-face
  font-family Geo
  font-style normal
  src url(fonts/geo_sans_light/GensansLight.ttf)

.ingeo
  font-family Geo
```

Resultando em:

```css
@font-face {
  font-family: Geo;
  font-style: normal;
  src: url("fonts/geo_sans_light/GensansLight.ttf");
}
.ingeo {
  font-family: Geo;
}
```