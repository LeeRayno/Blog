# Request

::: tip
目前市面上绝大多数使用请求库是 [axios](https://github.com/axios/axios) 我们可以利用它的`拦截器` 和 `自定义配置`来封装适合自己业务逻辑的请求方法
如在发送请求时，可以加入如下自定义配置
:::

```js
// 请求一个接口时的默认配置
const DEFAULT_OPTIONS = {
  isLoading: true, // 是否展示 loading
  isAutoMsg: true, // 是否自动提示错误消息
  isApiHost: true, // 是否添加 /api 前缀, 这样就不需要在每个请求去手动加 /api 前缀了。便于统一修改，比如需要 从 /v1 切换到 /v2 时，只需要修改 API_HOST 即可
  isApiMock: false, // 是否添加 /api/mock 模拟 url 前缀，模拟数据的时候适用
  isRemoveField: true, // 是否移除全部空参数  有时表单的某些字段非必填，所以可以不传该字段给后端
  removeFields: [] // 需要手动移除部分 空参数的数据
}

// 可以根据具体业务逻辑加入更多的配置项，比如是否加解密之类的
```

## axios

主要利用 `拦截器` 添加业务代码

```js
// axios.config.js
import axios from 'axios'
import Vue from 'vue'

const service = axios.create({
  timeout: 20000,
  withCredentials: true
})

let LOADING_INSTANCE = null
let IS_LOADING = false

// Add a request interceptor
service.interceptors.request.use(config => {
  if (config.isLoading && !IS_LOADING) {
    IS_LOADING = true
    LOADING_INSTANCE = Vue.prototype.$loading({
      text: '努力加载中...'
    })
  }

  config.headers.common['X-Requested-With'] = 'XMLHttpRequest'

  return config
}, err => Promise.reject(err))

// Add a response interceptor
service.interceptors.response.use(response => {
  const { data, config } = response
  const { status, message: errMsg } = data
  if (LOADING_INSTANCE && IS_LOADING) {
    LOADING_INSTANCE.close()
    IS_LOADING = false
    LOADING_INSTANCE = null
  }

  if (status !== 0 && config.isAutoMsg) {
    Vue.prototype.$notify.error({
      title: '提示',
      message: errMsg || '接口异常'
    })
    return Promise.reject(data)
  }

  return Promise.resolve(data.data)
}, err => {
  const { response } = err
  if (LOADING_INSTANCE && IS_LOADING) {
    LOADING_INSTANCE.close()
    IS_LOADING = false
    LOADING_INSTANCE = null
  }

  if (!response) {
    Vue.prototype.$notify.error({
      title: '提示',
      message: '服务异常'
    })
    return Promise.reject(err)
  }

  const { status } = response

  Vue.prototype.$notify.error({
    title: `${status}`,
    message: '服务异常'
  })

  if (status === 401) {
    // 未认证
  }

  return Promise.reject(err)
})

export default service

```

## http

主要对外暴露一些常用的请求方法如：`get` `post` `put` `Delete` `jsonp` 等方法

```js
// http.config.js
import Vue from 'vue'
import service from './axios.config'
import { API_HOST, API_HOST_MOCK } from '@/utils'

// @/utils 配置 API_HOST, API_HOST_MOCK
// 请求接口时是否添加 /api 前缀
// export const API_HOST = isDevelopment ? '/api' : '/api'

// 使用 mock 数据时 是否添加 /api/mock 前缀
// export const API_HOST_MOCK = isDevelopment ? '/api/mock' : ''

// 请求一个接口时的默认配置
const DEFAULT_OPTIONS = {
  isLoading: true, // 是否展示 loading
  isAutoMsg: true, // 是否自动提示错误消息
  isApiHost: true, // 是否添加 /api 前缀
  isApiMock: false, // 是否添加 /api/mock 模拟 url 前缀，模拟数据的时候适用
  isRemoveField: true, // 是否移除全部空参数
  removeFields: [] // 需要手动移除部分 空参数的数据
}

const POST_HEADER = {
  headers: {
    'content-type': 'application/json'
  }
}

/**
 * @desc get 请求
 * @param {String} url
 * @param {Object} params
 * @param {Object} config
 * @returns {Promise}
 */
export function get (url = '', params = {}, config = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...config }
  opts.params = _getParams(params, opts)
  return service.get(_getUrl(url, opts), opts)
}

/**
 * @desc post 请求
 * @param {String} url
 * @param {Object} params
 * @param {Object} config
 * @returns {Promise}
 */
export function post (url = '', params = {}, config = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...POST_HEADER, ...config }
  return service.post(_getUrl(url, opts), _getParams(params, opts), opts)
}

/**
 * @desc put 请求
 * @param {String} url
 * @param {Object} params
 * @param {Object} config
 * @returns {Promise}
 */
export function put (url = '', params = {}, config = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...POST_HEADER, ...config }
  return service.put(_getUrl(url, opts), _getParams(params, opts), opts)
}

/**
 * @desc delete 请求
 * @param {String} url
 * @param {Object} params
 * @param {Object} config
 * @returns {Promise}
 */
export function Delete (url = '', params = {}, config = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...config }
  return service.delete(_getUrl(url, opts), _getParams(params, opts))
}

/**
 * 下载，导出
 *
 * @param {String} url 请求url
 * @param {Object} [params={}] 请求的参数
 * @param {Object} [config={}] 配置
 * @param {String} [method=get] 请求方法
 */
export function download (url, params = {}, config = {}, method = 'get') {
  const opts = { ...DEFAULT_OPTIONS, ...POST_HEADER, ...config }

  const $form = document.createElement('form')
  $form.setAttribute('method', method)
  $form.setAttribute('hidden', 'hidden')
  $form.setAttribute('action', _getUrl(url, opts.isApiHost))
  $form.setAttribute('target', 'down_iframe')

  const $iframe = document.createElement('iframe')
  $iframe.setAttribute('id', 'down_iframe')
  $iframe.setAttribute('name', 'down_iframe')
  $iframe.setAttribute('style', 'display: none')

  const createInput = (name, value) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', name)
    input.setAttribute('value', value)

    $form.appendChild(input)
  }

  const pars = _getParams(params, opts)
  Object.keys(pars).forEach(key => {
    createInput(key, pars[key])
  })

  const $body = document.body || document.getElementsByTagName('body')[0]
  $body.appendChild($form)
  $body.appendChild($iframe)
  $form.submit()
  $form.remove()

  return new Promise((resolve, reject) => {
    $iframe.onload = function () {
      const ctx = this.contentWindow
      const text = ctx.document.body.innerText
      $body.removeChild(this)

      if (text) {
        Vue.$notify.error({
          title: '提示',
          message: '导出失败',
          duration: 2000
        })
        return reject(JSON.parse(JSON.stringify(text)))
      }
    }
  })
}

/**
 * @desc jsonp
 * @param {String} url 请求url
 * @param {Object} data 请求参数
 * @param {String} callback 后端解析 callback 识别需要返回给前台的参数
 */
export function jsonp({ url = '', data = {}, callback = 'callback' }) {
  return new Promise(((resolve, reject) => { // eslint-disable-line
    try {
      if (!url) return reject(new Error('请求错误'));

      const callbackFn = `jsonp_${Date.now()}`;
      data[callback] = callbackFn;

      const oHead = document.querySelector('head');
      const oScript = document.createElement('script');

      window[callbackFn] = function(res) {
        resolve(res);

        oHead.removeChild(oScript);
        window[callbackFn] = null;
      };

      const src = `${url}?${_data2Url(data)}`;
      oScript.src = src;

      oHead.appendChild(oScript);
    } catch (error) {
        reject(error);
    }
  }));
}

/**
 * @desc 获取 url
 * @param {String} url
 * @param {Object} opts
 * @returns {String}
 */
function _getUrl (url, opts) {
  const { isApiHost, isApiMock } = opts
  if (!url.startsWith('/')) {
    url = `/${url}`
  }
  if (!isApiHost) {
    return url
  }

  if (isApiHost && isApiMock) {
    return `${API_HOST_MOCK}${url}`
  }

  if (isApiHost) {
    return `${API_HOST}${url}`
  }
}

/**
 * @desc 处理参数
 * @param {Object} params
 * @param {Object} opts
 * @returns {Object}
 */
function _getParams (params = {}, opts) {
  const { isRemoveField, removeFields } = opts
  if (!isRemoveField) {
    return params
  }

  const copyParams = JSON.parse(JSON.stringify(params))

  let arrField = removeFields
  if (!removeFields.length) {
    arrField = Object.keys(params)
  }

  arrField.forEach(key => {
    const val = copyParams[key]
    if (!val && val !== 0) {
      delete copyParams[key]
    }
  })

  return copyParams
}

/**
 * @desc json 2 url
 */
function _data2Url(json = {}) {
  return Object.keys(json)
    .reduce((acc, cur) => {
      const val = json[cur] === undefined ? '' : json[cur];

      acc.push(`${cur}=${val}`);
      return acc;
    }, [])
    .join('&');
}

```

## api

每个模块下面的 `api.js` 然后在你具体的业务代码中引入具体的接口即可

```js
// xxx/api.js
import { get, post, put } from 'http'

// 活动列表  
// 比如我这个接口不想展示全局loading就设置 isLoading: fasle
// 不想展示后台的错误提示，想自定义错误提示 就设置 isAutoMsg: false
export const getActivityList = (params = {}) => get('/tf_activity/list', params, { isLoading: false, isAutoMsg: false });

// 新建活动
export const addActivity = (params = {}) => post('/tf_activity/activity', params);

// 更新活动
export const editActivity = (params = {}) => put('/tf_activity/activity', params);

```
