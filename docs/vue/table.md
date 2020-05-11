# Table

::: tip
`el-table` 并没有提供 **拖拽排序** 功能, 所以需要自己实现, 去 [Issue](https://github.com/ElemeFE/element/issues/5684#issuecomment-459691810) 里面找到了如下解决方法
:::

## 写拖拽组件

使用 `sortablejs`

```vue
<template>
  <div ref="wrapper">
    <div :key="tableKey">
      <slot />
    </div>
  </div>
</template>

<script>
// 使 el-table 可以拖拽
// @see https://github.com/WakuwakuP/element-ui-el-table-draggable/blob/master/src/SortableElTable.vue
import sortable from 'sortablejs'
export default {
  name: 'ElTableDraggable',
  props: {
    handle: {
      type: String,
      default: ''
    },
    animate: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      tableKey: 0
    }
  },
  watch: {
    tableKey () {
      this.$nextTick(() => {
        this.makeTableSortAble()
        this.keepWrapperHeight(false)
      })
    }
  },
  mounted () {
    this.makeTableSortAble()
  },
  methods: {
    makeTableSortAble () {
      const table = this.$children[0].$el.querySelector(
        '.el-table__body-wrapper tbody'
      )
      sortable.create(table, {
        handle: this.handle,
        animation: this.animate,
        onEnd: ({ newIndex, oldIndex }) => {
          this.keepWrapperHeight(true)
          this.tableKey = Math.random()
          const arr = this.$children[0].data
          const targetRow = arr.splice(oldIndex, 1)[0]
          arr.splice(newIndex, 0, targetRow)
          this.$emit('drop', { targetObject: targetRow, list: arr })
        }
      })
    },
    keepWrapperHeight (keep) {
      // eslint-disable-next-line prefer-destructuring
      const wrapper = this.$refs.wrapper
      if (keep) {
        wrapper.style.minHeight = `${wrapper.clientHeight}px`
      } else {
        wrapper.style.minHeight = 'auto'
      }
    }
  }
}
</script>

```

## 写 table 组件

集成 `pagination` 和 `拖拽` 功能

```js
import { isFunction, isUndef, MASK } from '@/utils'

/**
 * @desc 只适用于 简单的 表格。如果复杂的表格请使用 el-table
 * @usage
 * <el-table-draggable
      draggable
      handle="handle"
      :total="total"
      :columns="columns"
      :table-data="tableData"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      @drop="handleDrop"
    />
 */
export default {
  name: 'ElTableDraggable',
  props: {
    // 分页相关
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    hidePagination: {
      type: Boolean,
      default: false
    },

    // 表格相关
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },

    // 表格是否可拖拽相关
    draggable: {
      type: Boolean,
      default: false
    },
    // 指定必须点击到某个元素才可拖拽
    handle: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      curPage: this.currentPage
    }
  },

  watch: {
    currentPage (v) {
      this.curPage = v
    }
  },

  methods: {
    renderPagination () {
      return (
        <el-pagination
          background
          page-size={10}
          total={this.total}
          current-page={this.curPage}
          layout="total, prev, pager, next"
          on-current-change={this.handleCurrentChange}
        />
      )
    },

    renderColumns () {
      return this.columns.map(column => this.renderColumn(column))
    },

    renderColumn (column) {
      const { prop, render } = column

      // @see https://stackoverflow.com/questions/43702591/how-to-use-template-scope-in-vue-jsx
      return (
        <el-table-column
          props={{ ...column }}
          scopedSlots={
            {
              default: (scope) => isFunction(render)
                ? render(scope)
                : isUndef(scope.row[prop])
                  ? MASK
                  : scope.row[prop]
            }
          }
        />
      )
    },

    renderTable () {
      return (
        <el-table
          border
          data={this.tableData}
          style="width: 100%;"
          row-class-name={this.draggable ? 'el-table__row--draggable' : ''}
        >
          { this.columns.length ? this.renderColumns() : this.$slots.default }
        </el-table>
      )
    },

    renderDraggable () {
      return (
        <el-table-draggable
          onDrop={this.handleDrop}
          handle={this.handle}
        >
          {this.renderTable()}
        </el-table-draggable>
      )
    },

    handleCurrentChange (v) {
      this.curPage = v
      this.$emit('current-change', v)
    },

    handleDrop (v) {
      this.$emit('drop', v)
    }
  },

  render (h) {
    return (
      <div>
        { this.draggable ? this.renderDraggable() : this.renderTable() }
        { !this.hidePagination && this.renderPagination() }
      </div>
    )
  }
}

```
