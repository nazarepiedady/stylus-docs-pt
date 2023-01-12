---
layout: default
permalink: docs/js.html
---

# API de JavaScript {#javascript-api}

Simplesmente importe o módulo usando `require`, e chame `render()` com a dada sequência de caracteres de código Stylus, e o objeto `options` opcional.

As abstrações utilizando a Stylus devem passar a opção `filename` para fornecer reportagem de erro melhor.

```js
var stylus = require('stylus');

stylus.render(str, { filename: 'nesting.css' }, function(err, css){
  if (err) throw err;
  console.log(css);
});
```

Nós também podemos fazer a mesma coisa de uma maneira mais progressiva:

```js
var stylus = require('stylus');

stylus(str)
  .set('filename', 'nesting.css')
  .render(function(err, css){
    // lógica
  });
```

## .set(setting, value) {#set}

Aplica um parâmetro tal como uma `filename`, ou importa `paths`:

```js
.set('filename', __dirname + '/test.styl')
.set('paths', [__dirname, __dirname + '/mixins'])
```
## .include(path) {#include}

Uma alternativa progressiva para `.set('paths',...)` é `.include()`. Isto é ideal quando estamos expondo bibliotecas externas da Stylus que expõem um caminho.

```js
stylus(str)
  .include(require('nib').path)
  .include(process.env.HOME + '/mixins')
  .render(...)
```

## .import(path) {#import}

Adia a importação do dado `path` até que a avaliação for realizada. O exemplo abaixo é essencialmente o mesmo que fazer `@import 'mixins/vendor'` dentro da tua folha de Stylus.

```js
var stylus = require('../')
  , str = require('fs').readFileSync(__dirname + '/test.styl', 'utf8');

stylus(str)
  .set('filename', __dirname + '/test.styl')
  .import('mixins/vendor')
  .render(function(err, css){
  if (err) throw err;
  console.log(css);
});
```

## .define(name, node) {#define}

Ao passar um `Node`, podemos definir uma variável global. Isto é útil quando estamos expondo funcionalidades condicionais dentro da tua biblioteca dependendo da disponibilidade de uma outra. Por exemplo a biblioteca de extensão **Nib** suporta condicionalmente o nó de tela (node-canvas, em Inglês), fornecendo a geração de imagem.

No entanto, isto não está sempre disponível, assim a Nib pode definir:

```js
.define('has-canvas', stylus.nodes.false);
.define('some-setting', new stylus.nodes.String('some value'));
```

A Stylus também distribui valores de JavaScript para os seus equivalentes de Stylus quando possível. Cá estão alguns exemplos:

```js
.define('string', 'some string')
.define('number', 15.5)
.define('some-bool', true)
.define('list', [1,2,3])
.define('list', [1,2,[3,4,[5,6]]])
.define('list', { foo: 'bar', bar: 'baz' })
.define('families', ['Helvetica Neue', 'Helvetica', 'sans-serif'])
```

Estas mesmas regras também se aplicam aos valores de retorno nas funções de JavaScript:

```js
.define('get-list', function(){
  return ['foo', 'bar', 'baz'];
})
```

## .define(name, fn) {#define-name-fn}

Este método permite-te fornecer uma função definida de JavaScript para Stylus. Pense nisto como pensarias a respeitos de vinculações JavaScript-para-C++. Quando existe algo que não podes fazer em Stylus, defina-o em JavaScript!

Neste exemplo, definimos quatro funções: `add()`, `sub()`, `image-width()`, e `image-height()`. Estas funções devem retornar um nó (`Node`, em Inglês), este construtor e outros nós que estiverem disponíveis através de `stylus.nodes`.

```js
var stylus = require('../')
  , nodes = stylus.nodes
  , utils = stylus.utils
  , fs = require('fs');

function add(a, b) {
  return a.operate('+', b);
}

function sub(a, b) {
  return a.operate('-', b);
}

function imageDimensions(img) {
  // afirma que o nó (img) é um nó de String, passando
  // o nome do parâmetro para a reportagem de erro
  utils.assertType(img, 'string', 'img');
  var path = img.val;

  // Agarre os bytes necessários para recuperas as dimensões.
  // Se este for real farias isto por formato,
  // no lugar de ler a imagem inteira :)
  var data = fs.readFileSync(__dirname + '/' + path);

  // GIF
  // claro que suportarias... mais :)
  if ('GIF' == data.slice(0, 3).toString()) {
    var w = data.slice(6, 8)
      , h = data.slice(8, 10);
    w = w[1] << 8 | w[0];
    h = h[1] << 8 | h[0];
  }

  return [w, h];
}

function imageWidth(img) {
  return new nodes.Unit(imageDimensions(img)[0]);
}

function imageHeight(img) {
  return new nodes.Unit(imageDimensions(img)[1]);
}

stylus(str)
  .set('filename', 'js-functions.styl')
  .define('add', add)
  .define('sub', sub)
  .define('image-width', imageWidth)
  .define('image-height', imageHeight)
  .render(function(err, css){
    if (err) throw err;
    console.log(css);
  });
```

Para mais referências (até a documentação estar completa) consulte os seguintes ficheiros:

```bash
- `lib/nodes/*`
- `lib/utils.js`
```

## .use(fn) {#use-fn}

Quando chamado, a dada `fn` é invocada com o interpretador, permitindo que todos os métodos acima sejam usados. Isto permite as extensões exporem facilmente a si mesmas, definindo funções, caminhos etc.

```js
var mylib = function(style){
  style.define('add', add);
  style.define('sub', sub);
};

stylus(str)
  .use(mylib)
  .render(...)
```

Quando chamamos o método `rende()` com opções, a opção `use` pode ser dado a uma função ou arranjo de funções pode ser invocado com o interpretador.

```stylus
stylus.render(str, { use: mylib }, function(err, css){
  if (err) throw err;
  console.log(css);
});
```

## .deps() {#deps}

Retorna o arranjo de dependências (importa os ficheiros):

```stylus
stylus('@import "a"; @import "b"')
  .deps();

// => ['a.styl', 'b.styl']
```

Consulte também a [opção --deps da interface de linha de comando](https://stylus-lang.com/docs/executable.html#list-dependencies).

## stylus.resolver([options]) {#stylus-resolver}

A função opcional embutida que pode ser usado para resolver urls relativas dentro dos ficheiros importados:

```stylus
stylus(str)
  .define('url', stylus.resolver())
  .render(function(err, css) {

  });
```

Consulte também a [opção --resolve da interface de linha de comando](https://stylus-lang.com/docs/executable.html#resolving-relative-urls-inside-imports).

Opções:

```bash
- `paths` additional resolution path(s)
- `nocheck` don't check file existence
```
