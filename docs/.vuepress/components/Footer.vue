<template>
  <footer class="footer">
    MIT Licensed | Copyright © 2019 - {{now}} LeeRayno &nbsp;&nbsp;
    👀: <span id="busuanzi_value_site_pv"></span> &nbsp;&nbsp;
    👣: <span id="busuanzi_value_site_uv"></span>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      now: new Date().getFullYear()
    }
  },
  
  mounted() {
    const _hmt = _hmt || []
    (function() {
      // 百度
      const hm = document.createElement("script")
      hm.src = "https://hm.baidu.com/hm.js?f1661a9d96dfacbfa0cd47b35701e6d9"
      const s = document.getElementsByTagName("script")[0]
      s.parentNode.insertBefore(hm, s)

      // 不蒜子
      const busuanzi = document.createElement("script")
      busuanzi.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
      s.parentNode.insertBefore(busuanzi, s)

    })()
  }
}
</script>
<style>
.global-ui {
  padding-left: 20rem;
}

.footer {
  color: #4e6e8e;
  border-top: 1px solid #eaecef;
  text-align: center;
  line-height: 40px;
  max-width: 740px;
  margin: 0 auto;
}
</style>