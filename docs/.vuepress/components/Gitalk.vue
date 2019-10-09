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
        clientSecret: '33924f3394e3ae3d4006ed7fefa4e2248b9be9b3',
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