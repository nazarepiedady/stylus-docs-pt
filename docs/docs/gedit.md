---
layout: default
permalink: docs/gedit.html
---

# Especificação da Linguagem para Gedit

A Stylus está disponível com uma versão temporária de `styl.lang` para [GtkSourceView](https://live.gnome.org/GtkSourceView), baseado no [trabalho](https://github.com/gmate/gmate/blob/master/lang-specs/scss.lang) do [Yanekk](https://github.com/yanekk) sobre a `scss.lang`.
 
![Especificação da Linguagem de Stylus para GtkSourceView](https://i.imgur.com/uBppL.png)

Isto é um inicio e fornece uma [especificação da linguagem](https://live.gnome.org/Gedit/NewLanguage) básica para editores de GtkSourceView tais como [gedit](https://projects.gnome.org/gedit/).

**Fases da Instalação**
 
Descarregue o `styl.lang` na tua pasta `language-specs` local:

```bash
mkdir -p ~/.local/share/gtksourceview-2.0/language-specs/ && wget https://raw.github.com/stylus/stylus/master/editors/gedit/styl.lang -O ~/.local/share/gtksourceview-2.0/language-specs/styl.lang
```

Para utilizador da gtksourceview 3.0 (gedit 3.0):
 
```bash
mkdir -p ~/.local/share/gtksourceview-3.0/language-specs/ && wget https://raw.github.com/stylus/stylus/master/editors/gedit/styl.lang -O ~/.local/share/gtksourceview-3.0/language-specs/styl.lang
```

Atualize a base de dados da MIME e desfrute da sintaxe da Stylus na gedit!
 
```bash
cd ~/.local/share
update-mime-database mime
```

Isto é muito mais agradável do ver o gedit reconhecer os teus ficheiros `.styl` como Configurações de Apache (Apache Confs)!
 
---
 
**Está guloso?** Adicione mais cobertura glacé ao gedit com a `gedit-icing`: [https://github.com/niftylettuce/gedit-icing](https://github.com/niftylettuce/gedit-icing)
