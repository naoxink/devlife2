<template>
  <ul v-if="!shopItem.bought" class="alert" :class="[ canAfford(shopItem) ? 'alert-info' : 'alert-secondary', quickshop ? 'quickshop' : 'shop-item' ]">
    <li><strong>{{ shopItem.label }}</strong></li>
    <li v-if="!quickshop">{{ shopItem.description }}</li>
    <li><strong>Price:</strong> {{ numberFormat(actualPrice(shopItem)) }}</li>
    <li v-if="shopItemsOwned[shopItem.id]"><strong>Owned:</strong> {{ shopItemsOwned[shopItem.id] }}</li>
    <li><button class="shop-buy-button btn" :class="[ canAfford(shopItem) ? 'btn-success' : '', 'btn-secondary' ]" :disabled="!canAfford(shopItem)" @click="buy">Buy</button></li>
  </ul>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    'props': [ 'shopItem', 'quickshop' ],
    'computed': {
      ...mapState([
        'currency',
        'projects',
        'shopItemsOwned'
      ]),
    },
    'methods': {
      'buy': function(){
        if(!this.canAfford(this.shopItem)) return false
        if(typeof this.shopItem.requirements === 'function' && !this.shopItem.requirements(this.$store.state)){
          return false
        }
        this.$store.commit('decrementCurrency', this.actualPrice(this.shopItem))
        if(!this.shopItem.infinite){
          this.shopItem.bought = true
        }
        if(!this.shopItemsOwned[this.shopItem.id]) this.shopItemsOwned[this.shopItem.id] = 0
        this.shopItemsOwned[this.shopItem.id]++
        this.shopItem.effect(this.$store)
        this.checkAchievements()
      }
    }
  }
</script>

<style scoped>
  .shop-item {
    list-style: none;
    position: relative;
    padding: 10px;
    padding-right: 70px;
    margin: 2px;
    border: 1px solid rgba(0, 0, 0, .05);
    float: left;
    width: 32.5%;
    height: 140px;
  }
  .shop-buy-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  /* quickshop */
  .quickshop {
    list-style: none;
    margin: 2px;
    background-color: transparent;
    border: 0;
    padding: 5px;
  }
</style>