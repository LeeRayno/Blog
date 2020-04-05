module.exports = {
  title: 'Blog',
  description: 'Just playing around',
  base: '/Blog/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }],
    ['link', { rel: 'stylesheet', href: 'https://unpkg.com/gitalk/dist/gitalk.css'}],
    ['script', { src: 'https://unpkg.com/gitalk/dist/gitalk.min.js'}],
    ['script', {},`
      var _hmt = _hmt || []
    `],
    ['script', { src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'}],
    ['script', { src: 'https://hm.baidu.com/hm.js?f1661a9d96dfacbfa0cd47b35701e6d9'}],
    ['script', { src: '/cursor-effects.js'}]
  ],

  themeConfig: {
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: 'LeeRayno/Blog',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // default value is true. Allows to hide next page links on all pages
    nextLinks: false,
    // default value is true. Allows to hide prev page links on all pages
    prevLinks: false,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!',

    nav: [
      { text: '首页', link: '/' },
      { text: 'JS', link: '/js/'},
      { text: 'Vue', link: '/vue/'},
      { text: '规范', link: '/style/'},
      { text: 'Github', link: 'https://github.com/LeeRayno' },
    ],

    sidebar: {
      '/vue/': [
        ['', 'Vue'],
        ['table', 'Table'],
        ['menu', 'Menu'],
        ['decentralize', '去中心化'],
      ],
      '/style/': [
        ['', 'FE docs'],
        ['html', 'HTML'],
        ['css', 'CSS'],
        ['named', '命名']
      ],
      '/js/': [
        '',       
        ['typeof', 'typeof'],
        ['closure', '闭包']
      ]
    },
  },

  globalUIComponents: [
    'Gitalk',
    'Footer'
  ],

  plugins: [
    '@vuepress/back-to-top',
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-149696000-1' // UA-00000000-0
      }
    ]
  ]
}