# Menu

采用 `Vue` 模板 语法写 菜单扩展性不强，所以可以采用 `JSX` 来写增强可扩展性

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
    "path": "/product-operation",
    "meta": {
      "keepAlive": true,
      "isMenu": true,
      "sort": 1,
      "title": "产品运营",
      "icon": "el-icon-menu"
    },
    "children": [
      {
        "path": "operation-manage",
        "meta": {
          "keepAlive": true,
          "isMenu": true,
          "title": "运营位管理"
        }
      }
    ]
  },
  {
    "path": "/content-operation",
    "meta": {
      "keepAlive": true,
      "isMenu": true,
      "sort": 2,
      "title": "内容运营",
      "icon": "el-icon-menu"
    },
    "children": [
      {
        "path": "course-adjustment",
        "meta": {
          "keepAlive": true,
          "isMenu": true,
          "title": "课程组配置"
        }
      },
      {
        "path": "faq-config",
        "meta": {
          "keepAlive": true,
          "isMenu": true,
          "title": "常见问题"
        }
      }
    ],
    "redirect": "/content-operation/course-adjustment"
  },
  {
    "path": "/market-strategy",
    "meta": {
      "keepAlive": true,
      "isMenu": true,
      "sort": 3,
      "title": "营销策略",
      "icon": "el-icon-menu"
    },
    "children": [
      {
        "path": "coupon-config",
        "meta": {
          "keepAlive": true,
          "isMenu": true,
          "title": "优惠券管理"
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
  name: 'XdfMenu',

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
