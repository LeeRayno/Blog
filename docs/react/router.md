# Router-config

::: tip
使 `React` 路由像 `Vue` 一样变成可配置化的
:::

## router.js

某个模块下面对应的路由配置

```js
// pages/xx/router.js
import { lazy } from "react";
import RouterView from "components/RouterView";

export default {
  path: "/order-manage",
  component: RouterView,
  title: "订单管理",
  icon: "euro",
  sort: 3,
  isMenu: true,
  routes: [
    {
      path: "/order-manage/order-overview",
      component: lazy(() => import("./src/order-overview")),
      exact: true,
      isMenu: true,
      title: "订单概览"
    },
    {
      path: "/order-manage/order-record",
      component: lazy(() => import("./src/order-record")),
      exact: true,
      isMenu: true,
      title: "订单记录"
    },
    {
      path: "/order-manage",
      redirect: "/order-manage/order-overview"
    }
  ]
};
```

## 路由汇总

汇总所有模块的路由

```js
// router/router.config.js
const routerFile = require.context(
  "../",
  true,
  /^\.\/pages\/[\w.-]+\/router.js$/
);

const ruleConfig = (r => {
  return r.keys().map(key => r(key).default);
})(routerFile);

const routes = ruleConfig.concat([
  {
    path: "/",
    redirect: "/home"
  }
]);

export default routes;
```

## renderRoutes

通过路由配置获取菜单和路由

```js
// router/index.js
import React from "react";
import { Switch, Route, Redirect, matchPath } from "react-router-dom";

import { cloneDeep } from "lodash";

import routes from "./router.config";

// 渲染路由
export function renderRoutes(routesArr) {
  return (
    <Switch>
      {routesArr.map(route => {
        const { path, redirect, exact, routes: childRoutes } = route;

        return redirect ? (
          <Redirect from={path} to={redirect} key={path} />
        ) : (
          <Route
            path={path}
            key={path}
            exact={exact}
            render={props => (
              <route.component {...props} routes={childRoutes} />
            )}
          />
        );
      })}
    </Switch>
  );
}

// 匹配路由
export function matchRoutes(routesArr, pathname) {
  if (!pathname) return [];

  return routesArr.reduce((acc, cur) => {
    if (matchPath(pathname, cur) && !cur.redirect) {
      acc.push(cur);
      cur.routes && acc.push(...matchRoutes(cur.routes, pathname));
    }

    return acc;
  }, []);
}

// 匹配菜单
const matchRoutesToMenu = routesArr => {
  return routesArr.filter(item => {
    if (item.routes && item.routes.length) {
      item.routes = matchRoutesToMenu(item.routes);
    }
    return item.isMenu;
  });
};

const menus = matchRoutesToMenu(cloneDeep(routes)).sort((a, b) => {
  const sortA = a.sort || 0;
  const sortB = b.sort || 0;

  return sortA - sortB;
});

export { routes, menus };
```

## RouterView

封装类似于 `Vue` 的 `RouterView` 路由出口组件

```js
// components/RouterView.js
import React, { Suspense } from 'react';

import { renderRoutes } from 'router';
import { Spin } from 'antd';

export default function RouterView(props) {
    const { routes, children } = props;

    const style = {
        textAlign: 'center',
        bordeeRadius: '4px',
        marginBottom: '20px',
        padding: '200px 50px',
        margin: '20px 0',
    };

    return (
    <>
      { children }

      <Suspense fallback={
          <div style={{ ...style }}>
              <Spin tip="加载中" />
          </div>
      }>
          { renderRoutes(routes) }
      </Suspense>
    </>
    );
}

```
