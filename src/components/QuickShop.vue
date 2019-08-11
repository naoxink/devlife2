<template>
  <div id="panel-shop" class="panel">
    <h3>Quick upgrades</h3>
    <ShopItem v-for="(item, key) in items" v-if="item.quickshop" :shopItem="item" quickshop="true"></ShopItem>
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
      ]),
    },
    components: {
      ShopItem
    }
  }
</script>

<style scoped>

</style>
