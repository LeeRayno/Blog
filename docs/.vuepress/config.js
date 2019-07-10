module.exports = {
  title: 'Blog',
  description: 'Just playing around',
  base: '/Blog/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '规范', link: '/style/'},
      { text: 'Github', link: 'https://github.com/LeeRayno' },
    ],
    sidebar: {
      '/style/': [
        ['', 'FE docs'],
        ['html', 'HTML'],
        ['css', 'CSS'],
        ['named', '命名']
      ],
      '/': [
        '',       
        ['typeof', 'typeof'],
        ['closure', '闭包']
      ]
    }
  }
}