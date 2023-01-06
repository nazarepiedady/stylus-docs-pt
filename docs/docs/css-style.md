---
layout: default
permalink: docs/css-style.html
---

# Sintaxe de Estilo da CSS {#css-style-syntax}

A Stylus suporta transparentemente uma sintaxe de estilo de CSS normal. Isto signifca que não precisas de um analisador alternativo, ou especificar que um certo ficheiro usa um estilo específico.

## Exemplo {#exemplo}

Abaixo está um pequeno estilo usando a abordagem indentada:
 
 ```stylus
border-radius()
  -webkit-border-radius arguments
  -moz-border-radius arguments
  border-radius arguments

body a
  font 12px/1.4 "Lucida Grande", Arial, sans-serif
  background black
  color #ccc

form input
  padding 5px
  border 1px solid
  border-radius 5px
```

Já que as chavetas, dois pontos, pontos e virgulas são opcionais, poderíamos escrever este exemplo tal como escreveríamos com a CSS normal:
 
```stylus
border-radius() {
  -webkit-border-radius: arguments;
  -moz-border-radius: arguments;
  border-radius: arguments;
}

body a {
  font: 12px/1.4 "Lucida Grande", Arial, sans-serif;
  background: black;
  color: #ccc;
}

form input {
  padding: 5px;
  border: 1px solid;
  border-radius: 5px;
}
```

Embora a Stylus não suporte _toda_ possível sintaxe parecida com CSS, ela pode entender atá mesmo tal código:

```stylus
      border-radius() {
        -webkit-border-radius: arguments;
        -moz-border-radius: arguments;
        border-radius: arguments;
      }

  body a
  {
    font: 12px/1.4 "Lucida Grande", Arial, sans-serif;
      background: black;
    color: #ccc;
  }

      form input {
        padding: 5px;
    border: 1px solid;
        border-radius: 5px;
        }
```

Já que podemos misturar e combinar as duas variantes, o que se segue também é válido:
 
```stylus
border-radius()
  -webkit-border-radius: arguments;
  -moz-border-radius: arguments;
  border-radius: arguments;

body a {
  font: 12px/1.4 "Lucida Grande", Arial, sans-serif;
  background: black;
  color: #ccc;
}

form input
  padding: 5px;
  border: 1px solid;
  border-radius: 5px;
```
As variáveis, funções, misturadores, e todas as outras funcionalidades fornecidas pela Stylus ainda funcionam como esperado:
 
 ```stylus
main-color = white
main-hover-color = black

body a {
  color: main-color;
  &:hover { color: main-hover-color; }
}

body a { color: main-color; &:hover { color: main-hover-color; }}
```

Estas são algumas das advertências para esta regra: já que os dois estilos podem ser misturados e combinados, algumas regras de indentação ainda se aplicam. Então ainda que nem _toda_ folha de estilo de CSS simples funcionará sem modificação, esta funcionalidade permite aqueles que preferem a sintaxe de CSS continuarem a fazê-lo enquanto influenciam outras funcionalidades poderosas da Stylus.
 

