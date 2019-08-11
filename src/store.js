import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import AllAchievements from './components/achievements.js'
import AllShopItems from './components/shop-items.js'
import Notifit from './assets/js/notifit.min.js'

const vuexPersist = new VuexPersist({
  'key': 'devlife2',
  'storage': localStorage
})

Vue.use(Vuex)

Vue.mixin({
  'methods': {
    'numberFormat': function(number){
      return (Math.round(number * 100) / 100).toLocaleString()
    },
    'random': function(min, max){
      return Math.floor((Math.random() * max) + min)
    },
    'objTimeleftToStr': function(timeleft){
      timeleft.seconds++
      return [
        timeleft.hours < 10 ? `0${timeleft.hours}` : timeleft.hours,
        timeleft.minutes < 10 ? `0${timeleft.minutes}` : timeleft.minutes,
        timeleft.seconds < 10 ? `0${timeleft.seconds}` : timeleft.seconds
      ].join(':')
    },
    'capitalize': function(str){
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    'checkAchievements': function(){
      if(!this.$store.state.achievements){
        throw new Error('Missing achievements!')
      }
      for(let id in this.$store.state.achievements){
        const a = this.$store.state.achievements[id]
        if(a.check(this.$store.state) && !this.hasAchievement(id)){
          this.$store.commit('unlockAchievement', id)
          this.success(`Achievement unlocked! <strong>${a.label}</strong>`)
        }
      }
    },
    'hasAchievement': function(id){
      return !!this.$store.state.achievements[id].unlocked
    },
    'success': function(msg){
      Notifit({
        'type': 'success',
        'position': 'center',
        'timeout': 1500,
        msg
      })
    },
    'canAfford': function(item){
      if(typeof item.requirements === 'function'){
        return this.$store.state.currency >= this.actualPrice(item) && item.requirements(this.$store.state)
      }else{
        return this.$store.state.currency >= this.actualPrice(item)
      }
    },
    'actualPrice': function(item){
      if(this.$store.state.shopItemsOwned[item.id]){
        return item.price + (item.price * (0.1 * this.$store.state.shopItemsOwned[item.id]))
      }else{
        return item.price
      }
    },
    'canAffordCount': function(){
      let count = 0
      for(let id in this.$store.state.items){
        if(this.$store.state.items[id].bought) continue
        if(this.canAfford(this.$store.state.items[id])){
          count++
        }
      }
      return count
    },
    'hardReset': function(){
      if(confirm('Al progress WILL BE ERASED, do you want to continue?')){
        localStorage.removeItem('devlife2')
        location.reload()
      }
    }
  }
})

export default new Vuex.Store({

  'state': {
    'currency': 0,
    'projectsCount': 0,
    'autostartProjects': false,
    'projects': {
      'normal': {
        'total': 1,
        'sold': 0,
        'increment': 0.01,
        'minMaxTime': [ 5, 10 ] // 5-10 segundos
      },
      'big': {
        'total': 0,
        'sold': 0,
        'increment': 0.01,
        'minMaxTime': [ 25, 50 ] // 25-50 segundos
      },
      'huge': {
        'total': 0,
        'sold': 0,
        'increment': 0.02,
        'minMaxTime': [ 60, 180 ] // 1-3 minutos
      }
    },
    'shopItemsOwned': {  },
    'section': 'home',
    ...AllAchievements,
    ...AllShopItems
  },

  'mutations': {
    incrementProjectsCount(state, data){
      state.projectsCount += data.qty
      state.projects[data.type].sold += data.qty
    },
    incrementCurrency(state, qty = 0){
      state.currency += qty
    },
    decrementCurrency(state, qty = 0){
      state.currency -= qty
    },
    changeSection(state, section){
      state.section = section
    },
    unlockAchievement(state, id){
      state.achievements[id].unlocked = new Date()
      if(state.achievements[id].hidden){
        state.achievements[id].hidden = false
      }
    },
    reduceProjectTime(state, projectType){
      state.projects[projectType].minMaxTime = state.projects[projectType].minMaxTime.map(x => {
        let r = x - 0.05
        if(r <= 1) r = 1
        return r
      })
    },
    incrementProjectEarnings(state, data){
      state.projects[data.type].increment += state.projects[data.type].increment * data.increment
    }
  },

  'actions': {  },

  'plugins': [ vuexPersist.plugin ]

})
