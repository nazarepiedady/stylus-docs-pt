---
layout: default
permalink: docs/middleware.html
---

# Intermédiario Connect {#connect-middleware}

A stylus é disponibilizada com o intermédiario [Connect](https://github.com/senchalabs/connect) para compilação automática de folhas de stylus sempre forem modificados.

## stylus.middleware(options) {#stylus-middleware-options}

### Opções {#options}

Retorna o intermédiario Connect com a dada `options`.

```bash
`serve`     Servir os ficheiros stylus a partir do `dest` [true]
`force`     Recompilar sempre
`src`       Diretório fonte usado para encontrar ficheiros `.styl`
`dest`      Diretório de destino usado para saída de ficheiros `.css`
            quando não-definido padronizado para `src`.
`compile`   Função compilação personalizada, aceitando os argumentos
            `(str, path)`.
`compress`  Se os ficheiros `.css` de saída deveriam ser compactados
`firebug`   Imprime informações de depuração no css gerado que pode
            ser usado pela extensão de Firebug FireStylus
`linenos`   Imprime comentários no css gerado indicando
            a linha de stylues correspondente
`sourcemap` Gera um mapa do código-fonte no versão 3 do formato
						de mapas de código-fonte
```

### Exemplos {#examples}

Serve os ficheiros `.styl` a partir do `./public`:

```js
var app = connect();

app.middleware(__dirname + '/public');
```

Mude as opções `src` e `dest` para alterar onde os ficheiros `.styl` são carregados ou onde são guardados:

```js
var app = connect();

app.middleware({
  src: __dirname + '/stylesheets',
  dest: __dirname + '/public'
});
```

Nesta seção definimos uma função de compilação personalizada para que possamos definir a opção `compress`, ou definir funções adicionais.

Por padrão a função de compilação simplesmente define `filename` e produz a CSS. No seguinte caso estamos a compactar a saída, usando a extensão da biblioteca "nib", e importando-a automaticamente.

```js
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib())
    .import('nib');
}
```

Passe-a como uma opção desta maneira:

```js
var app = connect();

app.middleware({
    src: __dirname
  , dest: __dirname + '/public'
  , compile: compile
})
```
