# 面包屑

面包屑组件

```js
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";
import { matchRoutes, routes } from "router/index";

function AppBreadCrumb(props) {
  const {
    location: { pathname },
    history
  } = props;

  const [paths, setPaths] = useState([]);

  useEffect(() => {
    setPaths(
      matchRoutes(routes, pathname).filter(item => item.path !== "/home")
    );
  }, [pathname]);

  return (
    <Breadcrumb separator="/" style={{ margin: "14px 16px" }}>
      <Breadcrumb.Item
        onClick={() => history.push("/")}
        style={{ cursor: "pointer" }}
      >
        首页
      </Breadcrumb.Item>
      {paths.map(item => (
        <Breadcrumb.Item key={item.path}>{item.title}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default withRouter(AppBreadCrumb);
```
