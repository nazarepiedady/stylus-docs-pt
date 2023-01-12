---
layout: default
permalink: docs/sourcemaps.html
---

# Mapeamento de Código-Fonte {#sourcemaps}

A stylus suporta mapeamento de código-fonte básico em conformidade com a [terceira versão da especificação do mapeamento do código-fonte](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k).

## Criar um mapa de código-fonte {#create-a-sourcemap}

Passe a opção `--sourcemap` (ou `m`) com um ficheiro de Stylus. Isto criará um ficheiro `style.css`, e um ficheiro `style.css.map` como irmão do teu `style.styl` e coloque uma ligação para o teu mapa do código-fonte no final do `style.css`.

```bash
stylus -m style.styl
```

Tu também podes executar este comando enquando observas um ficheiro. Por exemplo: `stylus -w -m style.styl`. Isto atualizará o teu mapa de código-fonte toda vez que guardares.

## API de JavaScript {#javascript-api}

Defina o parâmetro `sourcemap` com um objeto de opções ou um valor booleano:

```js
var stylus = require('stylus');

var style = stylus(str)
  .set('filename', 'file.styl')
  .set('sourcemap', options);

style.render(function(err, css) {
  // objeto do mapa do código-fonte gerado
  console.log(style.sourcemap);
});
```

### Opções {#options}

```bash
`comment`     Adiciona um comentário com o `sourceMappingURL`
							para a CSS gerada (predefinido: `true`)
`inline`      Incorpora o mapa do código-fonte com texto da fonte completo
							no formato base64 (predefinido: `false`)
`sourceRoot`  Propriedade "sourceRoot" do mapa do código-fonte gerado
`basePath`    Caminho de base a partir do qual o mapa do código-fonte e
							todas fontes são relativos (predefinido: `.`)
```
