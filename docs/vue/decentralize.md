# 去中心化

::: tip
如果所有路由配置文件都集中放在一个 `router.config.js` 里面的话，随着业务量增加，路由的配置文件代码也会跟着增加，最后会使整个文件代码特别多！不易于维护，所以我们可以把路由拆分成对应模块，每一个大模块对应一个路由配置文件，使路由配置文件解耦，即 **去中心化** 思想
:::

假如你的项目目录结构如下，每个业务模块的页面代码都放在 `views` 或者 `pages` 目录下面的，那么我们可以把每个模块对应的路由配置文件 `router.js` 也放在同目录下

## tree

```shell
# 执行 tree 命令查看目录树
tree -I node_modules -L 4
```

``` js
.
├── README.md
├── babel.config.js
├── commitlint.config.js
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   ├── Aside.vue
│   │   ├── Breadcrumb.vue
│   │   ├── Catch.vue
│   │   ├── Checkbox.vue
│   │   ├── Draggable.vue
│   │   ├── Header.vue
│   │   ├── Linkage.vue
│   │   ├── Menu.js
│   │   ├── Table.js
│   │   ├── Upload.vue
│   │   └── index.js
│   ├── config
│   │   ├── axios.config.js
│   │   ├── const.config.js
│   │   └── http.config.js
│   ├── filters
│   │   ├── filters.js
│   │   └── index.js
│   ├── main.js
│   ├── router
│   │   ├── index.js
│   │   └── router.config.js
│   ├── store
│   │   ├── index.js
│   │   └── modules
│   │       ├── app
│   │       └── index.js
│   ├── styles
│   │   ├── config.scss
│   │   ├── element-variables.scss
│   │   ├── function.scss
│   │   ├── mixins.scss
│   │   ├── reset.scss
│   │   └── variable.scss
│   ├── utils
│   │   └── index.js
│   └── views
│       ├── About.vue
│       ├── Home.vue
│       ├── content-operation
│       │   ├── api.js
│       │   ├── router.js
│       │   └── src
│       ├── home
│       │   ├── router.js
│       │   └── src
│       ├── market-strategy
│       │   ├── api.js
│       │   ├── router.js
│       │   └── src
│       └── product-operation
│           ├── api.js
│           ├── router.js
│           └── src
├── vue.config.js
└── yarn.lock
```

## router

每个模块对应的 路由配置文件 `router.js` (包含路由和菜单配置),如果是菜单就加一个 `isMenu` 为true

```js
// views/content-operation/router.js
export default {
  path: '/content-operation',
  component: () => import('./components/view-catch.vue'),
  meta: {
    keepAlive: true,
    isMenu: true,
    sort: 2,
    title: '安达市',
    icon: 'el-icon-menu'
  },
  children: [
    {
      path: 'asdfsdf',
      component: () => import('./src/asdfsdf/index.vue'),
      meta: {
        keepAlive: true,
        isMenu: true,
        title: '阿斯蒂芬'
      }
    },
    {
      path: 'sdfsd',
      component: () => import('./src/asdfsdf/detail.vue'),
      meta: {
        keepAlive: false,
        isMenu: false,
        title: '阿斯蒂芬'
      }
    },
    {
      path: 'gfdfss',
      component: () => import('./src/gfdfss/index.vue'),
      meta: {
        keepAlive: true,
        isMenu: true,
        title: '搜索'
      }
    },
    {
      path: 'faq-detail/:type/:id',
      component: () => import('./src/gfdfss/detail.vue'),
      meta: {
        keepAlive: false,
        isMenu: false,
        title: '啥地方法规'
      }
    }
  ],
}

```

## 路由汇总

最后在一个汇总文件里通过 `require.context` 来获取每个模块下面的 `router.js` 来进行路由配置汇总，最终生成的 路由(和菜单)配置 和 集中化 配置的路由一样

```js
// src/router/router.config.js
import { cloneDeep } from 'lodash'
const routerFile = require.context('../', true, /^\.\/views\/[\w.-]+\/router.js$/)

const ruleConfig = (r => {
  return r.keys().map(key => r(key).default)
})(routerFile)

const routes = ruleConfig.concat({
  path: '*',
  redirect: '/'
})

const matchRoutesToMenu = (routesArr = []) => {
  return routesArr.filter(item => {
    if (item.children && item.children.length) {
      item.children = matchRoutesToMenu(item.children)
    }
    return item.meta && item.meta.isMenu
  })
}

const menus = matchRoutesToMenu(cloneDeep(routes)).sort((a, b) => {
  const sortA = a.meta.sort || 0
  const sortB = b.meta.sort || 0

  return sortA - sortB
})

export default routes

export {
  menus
}
```
