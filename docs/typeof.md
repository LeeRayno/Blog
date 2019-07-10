# typeof

::: tip
JS 数据类型分`原始(基础)`数据类型和`Object(引用)`数据类型，他们之间的区别是什么？
:::

## 原始

基础数据类型目前有 `6` 种，除了 `typeof null === 'object'`之外，其他都为正常类型，对于`null`来说虽然是基础数据类型，但是`typeof`为`object`，这个为历史遗留问题，以`000`开头代表对象，`null`为`0000`四个`0`所以将它错误的判断为`object`

|   Type    |   typeof    |             备注              |
| :-------: | :---------: | :---------------------------: |
|   null    |  'object'   |          为 `object`          |
| undefined | 'undefined' |           undefined           |
|  string   |  'string'   |          `'' || ' '`          |
|  number   |  'number'   | `NaN`,`+Infinity`,`-Infinity` |
|  boolean  |  'boolean'  |        `true || false`        |
|  symbol   |  'symbol'   |         `Symbol('')`          |

⚠️ `typeof typeof 1 === 'string'`

## 引用

引用数据类型目前有 `3` 种，除了`typeof function === 'function'`之外，其他都为`object`

|    Type     |   typeof   |    备注    |
| :---------: | :--------: | :--------: |
|     []      |  'object'  |            |
|     {}      |  'object'  |            |
| console.log | 'function' | `function` |

一般判断是否为引用(对象)数据类型的方法为：

```js
function isObj(obj) {
  const type = typeof obj
  return (obj !== null) && (type === 'object' || type === 'function')
}
```

如果需要准确的判断某个数据的具体类型可以用 `Object.prototype.toString` 方法：

```js
function toString(v) {
  return Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
}

// 基础数据类型
toString('') // 'string'
toString(1)  // 'number'
toString(true) // 'boolean'
toString(null) // 'null'
toString(undefined) // 'undefined'
toString(Symbol()) // 'symbol'

// 引用数据类型
toString({}) // 'object'
toString([]) // 'array'
toString(console.log) // 'function'

// 其他
toString(new Date()) // 'date'
toString(new RegExp()) // 'regexp'
```
