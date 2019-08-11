<template>
  <div id="panel-projects" class="panel">
    <h3>Projects</h3>
    <Project projectType="normal" v-for="n in projects.normal.total"></Project>
    <Project projectType="big" v-for="n in projects.big.total"></Project>
    <Project projectType="huge" v-for="n in projects.huge.total"></Project>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import Project from './Project.vue'

  export default {
    computed: {
      ...mapState([
        'projects'
      ])
    },
    components: {
      Project
    }
  }
</script>

<style scoped>

</style>
