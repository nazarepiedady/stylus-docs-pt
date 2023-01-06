---
layout: default
permalink: docs/firebug.html
---

# Extensão FireStylus para a Firebug {#firestylus-extension-for-firebug}

A [FireStylus](https://github.com/parallel/firestylus) é uma extensão de Firebug que faz a Firebug mostrar o nome de ficheiro da STylus e o números da linha dos estilos de CSS gerados pela Stylus em vez daqueles da CSS gerada.

![Captura da Tela](https://raw.github.com/parallel/firestylus/master/src/chrome/skin/screenshot.png)

## Uso {#usage}

Primeiro, precisas instalar as extensões [Firebug](https://addons.mozilla.org/firefox/downloads/latest/1843/addon-1843-latest.xpi?src=addondetail) e a [FireStylus](https://github.com/parallel/firestylus).

Depois simplesmente ative a opção `firebug` da Stylus quando estiveres gerando a CSS.

Uso com a linha de comando:

```bash
$ stylus -f <path>
$ stylus --firebug <path>
```
Uso com a JavaScript:

```css
var stylus = require('stylus');

stylus(str)
  .set('firebug', true)
  .render(function(err, css){
  // logic
  });
```

Connect / Express:

```css
var stylus = require('stylus');

var server = connect.createServer(
    stylus.middleware({
        src: __dirname
      , dest: __dirname + '/public'
      , firebug: true
    })
  , connect.static(__dirname + '/public')
);
```

## Compatibilidade {#compatibility}

A FireStylus deve funcionar com as versões de Firefox iguais ou superior a 3.0, e com as verões de Firebug iguais ou superiores a 1.4.

- Firefox 3+ (também funciona com a versão 5)
- Firebug 1.4+

## Limitações {#limitations}

A FireStylus e a FireSass são incompatíveis. Tu não podes ativá-las em simultâneo.

A FireStylus (tal como a FireSass) apenas funcionam no painel da HTML da Firebug. Os outros (tais como o painel da CSS) não funcionarão por causa das limitações da Firebug.
