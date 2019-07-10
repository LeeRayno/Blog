# CSS

`css` 命名，书写规范，推荐用`scss`写样式

## BEM

BEM 是块（block）、元素（element）、修饰符（modifier）的简写，由 Yandex 团队提出的一种前端 CSS 命名方法论。

```css
.block {}

.block__element {}

.block--modifier {}
```

如果用 `scss` 书写样式建议用`element-ui`封装好的 `BEM mixin` [BEM](https://github.com/ElemeFE/element/blob/40946e1230edf9fba18a7e8758bc1b4c610f4976/packages/theme-chalk/src/mixins/mixins.scss#L68)

```scss
/* BEM
 -------------------------- */
@mixin b($block) {
  $B: $namespace+'-'+$block !global;

  .#{$B} {
    @content;
  }
}

@mixin e($element) {
  $E: $element !global;
  $selector: &;
  $currentSelector: "";
  @each $unit in $element {
    $currentSelector: #{$currentSelector + "." + $B + $element-separator + $unit + ","};
  }

  @if hitAllSpecialNestRule($selector) {
    @at-root {
      #{$selector} {
        #{$currentSelector} {
          @content;
        }
      }
    }
  } @else {
    @at-root {
      #{$currentSelector} {
        @content;
      }
    }
  }
}

@mixin m($modifier) {
  $selector: &;
  $currentSelector: "";
  @each $unit in $modifier {
    $currentSelector: #{$currentSelector + & + $modifier-separator + $unit + ","};
  }

  @at-root {
    #{$currentSelector} {
      @content;
    }
  }
}
```

如果用 `less` 书写样式就用 `vant`的 `JS` 方式的[BEM](https://github.com/youzan/vant/blob/dev/src/utils/create/bem.ts)

## lint

安装相关依赖并配置 `stylelintrc.js`

```bash
# install Devdependencies via npm or yarn
$ npm install stylelint -D
$ npm install stylelint-order -D
$ npm install stylelint-scss -D # scss 需要
$ npm install stylelint-config-standard -D
$ npm install stylelint-config-recommended-scss -D # 如果是用 scss 书写样式
$ npm install stylelint-config-rational-order -D # 属性书写顺序 order

# for vue
$ yarn add @ascendancyy/vue-cli-plugin-stylelint -D
$ vue invoke @ascendancyy/vue-cli-plugin-stylelint
```

```js
// stylelintrc.js
module.exports = {
  'root': true,
  'defaultSeverity': 'warning',
  'extends': [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-rational-order'
  ],
  'plugins': [
    'stylelint-order'
  ],
  'rules': {}
}

```

如果需要完全定制属性书写顺序，则需要在`rules`里面加规则:

```js
module.exports = {
  root: true,
  'extends': [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss'
  ],
  'plugins': [
    'stylelint-order'
  ],
  'rules': {
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'at-variables',
      'declarations',
      'rules',
      'at-rules'
    ],
    'order/properties-order': [
      // GENERATED CONTENT
      'content',
      // POSITION AND LAYOUT
      'position',
      'top',
      'left',
      'right',
      'bottom',
      'z-index',
      'float',
      'clear',
      // FlexBox
      'display',
      'flex-direction',
      'justify-content',
      'align-items',
      'flex',
      // BOX MODEL (FROM OUTSIDE IN)
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'padding',
      'padding-top',
      'padding-left',
      'padding-right',
      'padding-bottom',
      'margin',
      'margin-top',
      'margin-left',
      'margin-right',
      'margin-bottom',
      'border',
      'border-top',
      'border-left',
      'border-right',
      'border-bottom',
      'border-width',
      'border-style',
      'border-color',
      'border-radius',
      // ANIMATION
      'transform',
      'animation',
      'transition',
      'line-height',
      'box-sizing',
      'box-shadow',
      'text-align',
      'vertical-align',
      'outline',
      'list-style',
      'table-layout',
      'border-collapse',
      // TYPOGRAPHY
      'font',
      'font-family',
      'font-size',
      'font-weight',
      'text-indent',
      'text-transform',
      'text-decoration',
      'text-overflow',
      'letter-spacing',
      'word-spacing',
      'white-space',
      'color',
      'background',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'visibility',
      'overflow',
      'overflow-x',
      'overflow-y',
      'opacity',
      'cursor',
      'quotes'
    ]
  }
}

```
