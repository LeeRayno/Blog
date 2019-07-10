module.exports = {
  title: 'Blog',
  description: 'Just playing around',
  base: '/Blog/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '规范', link: '/foo/'},
      { text: 'Github', link: 'https://github.com/LeeRayno' },
    ],
    sidebar: {
      '/foo/': [
        '',     /* /foo/ */
        'one',  /* /foo/one.html */
        'two'   /* /foo/two.html */
      ],
      '/': [
        '',        /* / */
        ['typeof', 'typeof'], /* /contact.html */
        ['about', '关于']    /* /about.html */
      ]
    }
  }
}