# 闭包

::: tip
函数在`调用`的时候可以访问它在`定义`时的`词法作用域`就称为`闭包`
:::

```js
function foo() {
  let a = 1

  return function() { // 在这里`定义`
    a++
    console.log(a)
  }
}

// 函数一
const bar = foo()
// 多次调用
bar() // 2 在这里`调用`
bar() // 3
bar() // 4

// 函数二
const baz = foo()
baz() // 2
baz() // 3
baz() // 4
```
