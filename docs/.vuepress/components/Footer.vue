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
}
</script>
<style>
.page {
  padding-left: 0 !important;
}
.global-ui {
  /* padding-left: 20rem; */
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