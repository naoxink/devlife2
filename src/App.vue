<template>
  <div id="app">
    <Nav></Nav>

    <PanelAchievements></PanelAchievements>
    <PanelShop></PanelShop>

    <div class="container" v-show="section === 'home'">
      <div class="row">
        <div class="col-sm-6">
          <PanelStats></PanelStats>
          <QuickShop v-if="$store.state.shopItemsOwned.quickshop"></QuickShop>
        </div>
        <div class="col-sm-6">
          <PanelProjects></PanelProjects>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PanelProjects from './components/Panel-projects.vue'
  import PanelStats from './components/Panel-stats.vue'
  import PanelShop from './components/Panel-shop.vue'
  import PanelAchievements from './components/Panel-achievements.vue'
  import QuickShop from './components/QuickShop.vue'
  import Nav from './components/Nav.vue'
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'app',
    computed: {
      ...mapState([
        'section',
        'shopItemsOwned'
      ])
    },
    components: {
      PanelProjects,
      PanelStats,
      PanelShop,
      PanelAchievements,
      Nav,
      QuickShop
    }
  }
</script>

<style>
  @import './assets/styles/main.css';
  @import './assets/styles/notifit.min.css';
</style>