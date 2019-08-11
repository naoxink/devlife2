<template>
  <ul class="project-stats alert" :class="[ active ? 'alert-success running' : 'alert-secondary faded stopped' ]">
    <transition name="fade">
      <li class="result" v-if="result">{{ result }}</li>
    </transition>
    <li><strong>{{ (active ? 'Running project' : 'Project') }}</strong></li>
    <li><hr></li>
    <li><strong>Project type: </strong> {{ capitalize(projectType) }}</li>
    <li><strong>Earned: </strong> {{ projectStats.earned }}</li>
    <li><strong>Time left:</strong> {{ projectStats.timeleft }}</li>
    <button v-if="!active" class="project-start btn btn-info" :class="projectType" @click="start">Start project</button>
  </ul>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import Timer from './timer.js'

  export default {
    'props': [ 'projectType' ],
    'data': function(){
      return {
        'earned': 0,
        'timer': null,
        'active': false,
        'timeleft': null,
        'timeStr': '',
        'result': ''
      }
    },
    'computed': {
      ...mapState([
        'currency',
        'projects'
      ]),
      'projectStats': function(){
        return {
          'earned': this.numberFormat(this.earned),
          'timeleft': this.timeleft ? this.objTimeleftToStr(this.timeleft) : this.timeStr
        }
      }
    },
    'methods': {
      'calculateProjectTime': function(){
        return this.random(...this.projects[this.projectType].minMaxTime) + this.projects[this.projectType].total
      },
      'start': function(){
        const store = this.$store
        const _this = this
        this.active = true
        this.timer = new Timer({
          'duration': this.timeStr,
          'onTick': (timeleft, diff) => {
            _this.incrementEarned(diff)
            this.timeleft = timeleft
          },
          'onEnd': () => {
            store.commit('incrementProjectsCount', {
              'type': this.projectType,
              'qty': 1
            })
            store.commit('incrementCurrency', _this.earned)
            this.showResult()
            _this.active = false
            _this.timer = null
            _this.earned = 0
            _this.timeleft = null
            this.checkAchievements()
            this.setTimeStr()
            if(this.canAutorun()){
              this.start()
            }
            this.canAffordCount()
          }
        })
      },
      'stop': function(){
        if(this.timer) this.timer.stop()
        this.active = false
        this.timer = null
        this.earned = 0
        this.timeleft = null
        this.setTimeStr()
      },
      'canAutorun': function(){
        return this.$store.state.autostartProjects
      },
      'incrementEarned': function(multiplier){
        this.earned += this.projects[this.projectType].increment * multiplier
      },
      'secondsToString': function(seconds){
        return new Date(seconds * 1000).toISOString().slice(11, -1).replace(/\.\d+/, '')
      },
      'setTimeStr': function(){
        let time = this.calculateProjectTime()
        this.timeStr = '00:00:' + (time < 10 ? '0' + time : time)
      },
      'showResult': function(){
        this.result = `Project finished. +${this.numberFormat(this.earned)}`
        setTimeout(() => this.result = '', 1000)
      }
    },
    'mounted': function(){
      this.setTimeStr()
    },
    'beforeDestroy': function(){
      this.$store.commit('incrementCurrency', this.earned)
      this.canAffordCount()
      this.stop()
    }
  }
</script>

<style scoped>
  .project-stats {
    list-style: none;
    margin: 5px;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, .05);
    position: relative;
  }
  .project-stats .result {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, .8);
    color: rgba(0, 0, 0, .8);
    text-align: center;
    padding: 20px;
    z-index: 1;
    line-height: 90px;
  }
  .project-start {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .faded {
    background-color: rgba(0, 0, 0, .05);
    color: rgba(0, 0, 0, .3);
  }
  hr {
    margin: 5px 0;
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
