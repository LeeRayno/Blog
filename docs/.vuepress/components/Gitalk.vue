<template>
  <div id="gitalk-container" ref="gitalk" class="gitalk-container"></div>
</template>

<script>
export default {
  watch: {
    '$route.path'(nevVal, oldVal) {
      const container = this.$refs.gitalk
      container && (container.innerHTML = '')

     this.createGitalk()
    }
  },

  mounted() {
    this.createGitalk()
  },

  methods: {
    createGitalk() {
      const gitalk = new Gitalk({
        clientID: 'ed19269c8e16a19c36f4',
        clientSecret: 'f8f853be52544d0b75552d4adf89de67158bfd71',
        repo: 'Blog',
        owner: 'LeeRayno',
        admin: ['LeeRayno'],
        id: location.pathname,      // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
      })

      gitalk.render('gitalk-container')
    }
  }
}
</script>

<style>
.gitalk-container {
  max-width: 740px;
  margin: 0 auto;
}
</style>