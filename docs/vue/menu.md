# Menu

::: tip
采用 `Vue` 模板语法写菜单扩展性很差，假如你有四，五级菜单或者更多，那你维护起来会非常困难！所以我们可以采用 `JSX` 来写菜单组件，使其更灵活，可以支持无限级。只需要维护数据源就可以了
:::

假如你的菜单数据结构如下：

## menus

```json
[
  {
    "path": "/",
    "meta": {
      "keepAlive": true,
      "isMenu": true,
      "sort": 0,
      "title": "首页",
      "icon": "el-icon-menu"
    }
  },
  {
    "path": "/sdfsf",
    "meta": {
      "keepAlive": true,
      "isMenu": true,
      "sort": 1,
      "title": "十点多",
      "icon": "el-icon-menu"
    },
    "children": [
      {
        "path": "qews",
        "meta": {
          "keepAlive": true,
          "isMenu": true,
          "title": "水电费"
        }
      }
    ]
  },
  {
    "path": "/gdfs",
    "meta": {
      "keepAlive": true,
      "isMenu": true,
      "sort": 2,
      "title": "给对方",
      "icon": "el-icon-menu"
    },
    "children": [
      {
        "path": "gdfdws",
        "meta": {
          "keepAlive": true,
          "isMenu": true,
          "title": "大师傅"
        }
      },
      {
        "path": "faqs",
        "meta": {
          "keepAlive": true,
          "isMenu": true,
          "title": "阿萨德"
        }
      }
    ],
  },
  {
    "path": "/marketasd",
    "meta": {
      "keepAlive": true,
      "isMenu": true,
      "sort": 3,
      "title": "地方的",
      "icon": "el-icon-menu"
    },
    "children": [
      {
        "path": "coupongdfd",
        "meta": {
          "keepAlive": true,
          "isMenu": true,
          "title": "阿萨德"
        }
      }
    ]
  }
]
```

## Menu.js

```js
/**
 * 如果 菜单 是后台返回 需要获取菜单
 * 菜单可以无限有子级，加 children 就可以
 */
import { mapGetters } from 'vuex'
import { menus } from '@/router/router.config.js'
import { isHttp } from '@/utils/index.js'
import router from '@/router'

export default {
  name: 'LlMenu',

  computed: {
    ...mapGetters([
      'isCollapse'
    ]),

    defaultActive () {
      return this.$route.path
    }
  },

  methods: {
    _renderItem (menu, index) {
      const self = this
      const { meta, path, children } = menu
      const { title, icon } = meta

      return (
        children
          ? self._renderSubMenu(menu, index)
          : (
            <el-menu-item index={path}>
              {icon && <i class={icon} />}
              {title && <span slot="title">{title}</span>}
            </el-menu-item>
          )
      )
    },

    _renderSubMenu (subMenu, index) {
      const self = this
      const { meta, children, path } = subMenu
      const { title, icon } = meta
      return (
        <el-submenu index={path}>
          <template slot="title">
            {icon && <i class={icon} />}
            {title && <span slot="title">{title}</span>}
          </template>

          {
            children && children.map((menu, index) => {
              const copy = { ...menu }
              const p = menu.path
              const childPath = isHttp(p) ? p : `${path}/${p}`
              copy.path = childPath
              return self._renderItem(copy, index)
            })
          }
        </el-submenu>
      )
    },

    handleSelect (path, indexPath) {
      if (isHttp(path)) {
        return window.open(path)
      }

      if (this.$route.path !== path) {
        router.push(path)
      }
    }
  },

  render (h) {
    const self = this
    return (
      <el-menu
        collapse={this.isCollapse}
        default-active={this.defaultActive}
        background-color="#4c4c4c"
        text-color="#fff"
        onSelect={this.handleSelect}
        unique-opened={true}
        // router
      >

        {
          menus.map((menu, index) => {
            return self._renderItem(menu, index)
          })
        }
      </el-menu>
    )
  }
}

```
