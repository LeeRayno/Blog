# Menu

菜单组件

```js
// components/menu.js
import React, { useState, useEffect } from "react";
import { Menu, Icon, Layout } from "antd";
import { withRouter } from "react-router-dom";

// TIP: 如果菜单是后台返回 就 按照这个模板返回
import { menus } from "router";
import { isDev } from "common/util";

const { SubMenu } = Menu;
const { Sider } = Layout;

function AppMenu(props) {
  const { history, pathname, collapsed, openKeys, handleOpenChange } = props;

  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    setSelectedKeys([
      pathname
        .split("/")
        .slice(0, 3)
        .join("/")
    ]);
  }, [pathname]);

  const handleMenuClick = v => {
    // 如果是外链
    if (v.key.startsWith("http")) {
      return;
    }
    history.push(v.key);
  };

  const renderMenuItem = menu => {
    const { title, path, icon, routes, isLink } = menu;

    return routes && routes.some(item => item.isMenu) ? (
      renderSubMenuItem(menu)
    ) : (
      <Menu.Item key={path}>
        {icon && <Icon type={icon} />}
        {!isLink ? (
          <span>{title}</span>
        ) : (
          <a href={path} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        )}
      </Menu.Item>
    );
  };

  const renderSubMenuItem = menu => {
    const { title, icon, path, routes } = menu;

    return (
      <SubMenu
        key={path}
        title={
          <span>
            {icon && <Icon type={icon} />}
            <span>{title}</span>
          </span>
        }
      >
        {routes && routes.map(child => renderMenuItem(child))}
      </SubMenu>
    );
  };

  return isDev ? (
    <Sider
      collapsible
      trigger={null}
      collapsed={collapsed}
      className="App-aside"
    >
      <div className="App-logo-wrap">
        {collapsed ? "xx系统" : "xx系统管理后台"}
      </div>
      <div className="App-menu-wrap">
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onClick={handleMenuClick}
          onOpenChange={handleOpenChange}
        >
          {menus.map(menu => renderMenuItem(menu))}
        </Menu>
      </div>
    </Sider>
  ) : null;
}

export default withRouter(AppMenu);
```
