# HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```

## Doctype

使用 `HTML5 doctype`

```html
<!DOCTYPE html>
```

## 字符编码

明确声明通用的`UTF-8`编码

```html
<meta charset="UTF-8">
```

## 渲染模式

针对国内浏览器环境设置 `IE` 兼容模式和极速渲染模式

```html
<meta http-equiv="X-UA-Comptible" content="IE=Edge">
<meta name="render" content="webkit">
```

## 标签闭合

省略自闭和尾部 `/`

```html
<!-- x -->
<img src="logo.jpg" art="logo" />
<!-- ✔ -->
<img src="logo.jpg" arg="logo" >
```

## 语义化

用合适的标签装适合的内容

- 由内容决定标签：`header`, `footer`, `section`, `aside`, `nav`, `ul`, `ol`, `dl`等 代替 `div`
- `table` 不用于布局，但在展示明确的表格型数据还是首选
- 在资源型的内容加上描述性文案，如`img` 的 `alt` 属性等
  