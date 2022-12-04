import { defineConfig } from 'vitepress'
import { version } from '../../package.json'
import {
  contributing,
  font,
  github,
  ogImage,
  ogUrl,
  releases,
  twitter,
  stylusDescription,
  stylusName,
} from './meta'

export default defineConfig({
  lang: 'pt-PT',
  title: stylusName,
  description: stylusDescription,
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/favicon.ico', type: 'image/png', sizes: '16x16' }],
    ['meta', { name: 'author', content: `${stylusName} colaboradores` }],
    ['meta', { name: 'keywords', content: 'css, preprocessor, stylus, styl, stylesheet, css3, pré-processador' }],
    ['meta', { property: 'og:title', content: stylusName }],
    ['meta', { property: 'og:description', content: stylusDescription }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { name: 'twitter:title', content: stylusName }],
    ['meta', { name: 'twitter:description', content: stylusDescription }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { href: font, rel: 'stylesheet' }],
    ['link', { rel: 'mask-icon', href: '/logo.svg', color: '#ffffff' }],
    ['link', { rel: 'apple-touch-icon', href: '/stylus.png', sizes: '180x180' }],
    [
      'script',
      { async: 'true', src: 'https://www.googletagmanager.com/gtag/js?id=G-ZWB0JH7RJV' }
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-ZWB0JH7RJV');"
    ]
  ],
  lastUpdated: true,
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      repo: 'nazarepiedady/stylus-docs-pt',
      branch: 'main',
      dir: 'docs',
      text: 'Sugerir alterações para esta página',
    },

    algolia: {
      appId: 'O7LII3IXQM',
      apiKey: '141079ddcec4eb7078fa8873bea53a03',
      indexName: 'stylus-lang'
    },

    localeLinks: {
      text: 'Português',
      items: [
        { text: 'English', link: 'https://www.stylus-lang.com' },
        { text: '中文', link: 'https://www.stylus-lang.cn' },
        { text: '中文(张鑫旭)', link: 'https://www.zhangxinxu.com/jq/stylus' },
      ],
    },

    socialLinks: [
      { icon: 'twitter', link: twitter },
      { icon: 'github', link: github },
    ],

    footer: {
      message: 'Lançado sob a licença MIT.',
      copyright: 'Copyright © 2010-PRESENT tj, iChenLei, os colaboradores da stylus',
    },

    nav: [
      { text: 'Zona de Testes', link: '/try' },
      { text: 'Funcionalidades', link: '/docs/' },
      { text: 'API', link: '/docs/js' },
      { text: 'CLI', link: '/docs/executable' },
      {
        text: `v${version}`,
        items: [
          {
            text: 'Notas de Lançamento ',
            link: releases,
          },
          {
            text: 'Contribuições ',
            link: contributing,
          },
        ],
      },
    ],

    sidebar: {
      '/': [
        {
          text: 'Funcionalidades',
          items: [
            {
              text: 'Seletores',
              link: '/docs/selectors',
            },
            {
              text: 'Variáveis',
              link: '/docs/variables',
            },
            {
              text: 'Interpolação',
              link: '/docs/interpolation',
            },
            {
              text: 'Operadores',
              link: '/docs/operators',
            },
            {
              text: 'Misturadores',
              link: '/docs/mixins',
            },
            {
              text: 'Funções',
              link: '/docs/functions',
            },
            {
              text: 'Argumentos de Palavra-Chave',
              link: '/docs/kwargs',
            },
            {
              text: 'Funções Embutidas',
              link: '/docs/bifs',
            },
            {
              text: 'Parâmetros Resto',
              link: '/docs/vargs',
            },
            {
              text: 'Comentários',
              link: '/docs/comments',
            },
            {
              text: 'Condicionais',
              link: '/docs/conditionals',
            },
            {
              text: 'Hashes',
              link: '/docs/hashes',
            },
            {
              text: 'Iteração',
              link: '/docs/iteration',
            },
            {
              text: 'url()',
              link: 'docs/functions.url'
            },
            {
              text: 'Literal de CSS',
              link: 'docs/literal'
            },
            {
              text: 'Sintaxe Normal de CSS',
              link: 'docs/css-style'
            },
            {
              text: 'Escapar Carácter',
              link: 'docs/escape'
            },
            {
              text: 'Executável',
              link: 'docs/executable'
            },
            {
              text: 'Intermediário de Conexão',
              link: 'docs/middleware'
            },
            {
              text: 'API de Introspeção',
              link: 'docs/introspection'
            },
            {
              text: 'API de JavaScript',
              link: 'docs/js'
            },
            {
              text: 'Extensões de CSS3 com nib',
              link: 'https://stylus.github.io/nib'
            }
          ],
        },
        {
          text: 'Regras Arroba',
          items: [
            {
              text: '@import e @require',
              link: '/docs/import',
            },
            {
              text: '@media',
              link: '/docs/media',
            },
            {
              text: '@font-face',
              link: 'docs/font-face'
            },
            {
              text: '@keyframes',
              link: 'docs/keyframes'
            },
            {
              text: '@extend',
              link: 'docs/extend'
            },
            {
              text: '@block',
              link: 'docs/block'
            },
            {
              text: 'Outras Regras Arroba',
              link: 'docs/atrules'
            }
          ],
        },
        {
          text: 'Depuração',
          items: [
            {
              text: 'Reportagem de Erro',
              link: 'docs/error-reporting'
            },
            {
              text: 'Mapas de Fonte',
              link: 'docs/sourcemaps'
            },
          ],
        },
        {
          text: 'Interface de Linha de Comando',
          items: [
            {
              text: 'Referência da Linha de Comando',
              link: '/docs/executable',
            },
          ],
        },
        {
          text: 'IDE',
          items: [
            {
              text: 'gedit',
              link: '/docs/gedit',
            },
            {
              text: 'textmate',
              link: '/docs/textmate',
            },
          ],
        },
      ],
    },
  },
})
