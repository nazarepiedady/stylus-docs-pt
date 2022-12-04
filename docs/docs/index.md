---

layout: default

permalink: /

---

# CSS expressiva, dinâmica e robusta {#expressive-dynamic-robust-css}

## A CSS precisa de um herói {#css-needs-a-hero}

```css
body {
  font: 12px Helvetica, Arial, sans-serif;
}
a.button {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
```

### E se pudéssemos omitir as chavetas? {#what-if-we-could-omit-braces}

```stylus
body
  font: 12px Helvetica, Arial, sans-serif;

a.button
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
```

### E que tal os pontos e virgulas? {#how-about-semi-colons}

```stylus
body
  font: 12px Helvetica, Arial, sans-serif

a.button
  -webkit-border-radius: 5px
  -moz-border-radius: 5px
  border-radius: 5px
```

### Mantenha as coisas no Não Se Repita (DRY, sigla em Inglês) {#keep-things-dry}

```stylus
border-radius()
  -webkit-border-radius: arguments
  -moz-border-radius: arguments
  border-radius: arguments

body
  font: 12px Helvetica, Arial, sans-serif

a.button
  border-radius(5px)
```

### Que tal misturadores transparentes? {#how-about-transparent-mixins}

```stylus
border-radius()
  -webkit-border-radius: arguments
  -moz-border-radius: arguments
  border-radius: arguments

body
  font: 12px Helvetica, Arial, sans-serif

a.button
  border-radius: 5px
```

### Crie & Partilhe {#create-&-share}

```stylus
@import 'vendor'

body
  font: 12px Helvetica, Arial, sans-serif

a.button
  border-radius: 5px
```

### Até mesmo funções na linguagem! {#even-in-language-functions}

```stylus
sum(nums...)
  sum = 0
  sum += n for n in nums

sum(1 2 3 4)
// => 10
```

### E se for tudo opcional? {#what-if-it-were-all-optional}

```stylus
fonts = Helvetica, Arial, sans-serif

body {
  padding: 50px;
  font: 14px/1.4 fonts;
}
```

### Escreva os teus estilos com a Stylus {#get-styling-with-stylus}

A instalação do Stylus é muito fácil uma vez que tenhas a [Node.js](https://nodejs.org/) instalada. Então pegue os binários para a tua plataforma e certifica-te de que eles também incluem a NPM, o gestor de pacote da Node.

Agora, digite no teu terminal o que está abaixo:

```bash
$ npm install stylus -g
```

Se quiseres uma linguagem de CSS expressiva para Node.js com estas funcionalidades ou as funcionalidades listadas abaixo, siga para a [GitHub](https://github.com/stylus/stylus) para mais informações.


### Funcionalidades {#features}

- Dois pontos opcionais
- Pontos e virgulas opcionais
- Virgulas opcionais
- Chavetas opcionais
- Variáveis
- Interpolação
- Misturadores
- Aritmética
- Coação de tipo
- Importação dinâmica
- Condicionais
- Iteração
- Seletores encaixados
- Fazer referência ao pai
- Chamadas de função variável
- Escopo Léxico
- Funções embutidas (mais de 60)
- Funções na linguagem
- Compressão opcional
- Incorporação de imagem opcional
- Executável de Stylus
- Reportagem de erro robusta
- Comentários de várias linhas e de única linha
- Literal de CSS para aqueles momentos difíceis
- Escapamento de Carácter
- Pacote de TextMate
- E muito mais!s