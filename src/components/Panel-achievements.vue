<template>
  <div id="panel-achievements" v-show="section === 'achievements'">
    <div class="container">
      <h3>Achievements</h3>
      <p>Completed {{ completed }} of {{ total }}</p>
      <Achievement v-for="(item, key) in achievements" :achievement="item" :achievementID="key"></Achievement>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import Achievement from './Achievement.vue'

  export default {
    computed: {
      ...mapState([
        'section',
        'achievements'
      ]),
      'completed': function(){
        return Object.values(this.achievements).filter(a => !!a.unlocked).length
      },
      'total': function(){
        return Object.keys(this.achievements).length
      }
    },
    components: {
      Achievement
    }
  }
</script>

<style scoped>
  #panel-achievements {
    padding: 20px;
  }
</style>
