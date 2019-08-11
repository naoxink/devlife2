<template>
  <div id="panel-shop" class="panel" v-show="section === 'shop'">
    <div class="container">
      <h3>Upgrades</h3>
      <ShopItem v-for="(item, key) in items" :shopItem="item"></ShopItem>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import ShopItem from './shop-item.vue'

  export default {
    computed: {
      ...mapState([
        'items',
        'section'
      ])
    },
    components: {
      ShopItem
    }
  }
</script>

<style scoped>

</style>
