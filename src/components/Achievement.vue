<template>
  <div class="achievement" :class="[ isUnlocked() ? 'unlocked' : 'locked' ]">
    <template v-if="achievement.hidden">
      <p class="mistery-achievement">Mistery achievement</p>
    </template>
    <template v-else>
      <p class="label">{{ achievement.label }}</p>
      <p class="clue">{{ (achievement.clue ? achievement.clue : '???') }}</p>
      <p class="status">{{ (isUnlocked() ? `Unlocked - ${achievementDate()}` : 'Locked') }}</p>
    </template>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    'props': [ 'achievement', 'achievementID' ],
    'computed': {
      ...mapState([
        'achievements'
      ])
    },
    'methods': {
      isUnlocked: function(){
        return this.hasAchievement(this.achievementID)
      },
      achievementDate: function(){
        const date = this.$store.state.achievements[this.achievementID].unlocked
        if(typeof date === 'string'){
          return new Date(date).toLocaleString()
        }else{
          return date.toLocaleString()
        }
      }
    }
  }
</script>

<style scoped>
  .achievement {
    padding: 10px;
    margin: 2px;
    border: 1px solid rgba(0, 0, 0, .05);
    float: left;
    width: 32.5%;
    height: 110px;
  }
  .achievement > p {
    margin: 5px;
  }
  .achievement .mistery-achievement {
    line-height: 82px;
    color: rgba(0, 0, 0, .3);
    text-align: center;
  }
  .achievement.locked {
    background-color: rgba(0, 0, 0, .05);
    color: rgba(0, 0, 0, .3);
  }
  .achievement.unlocked {
    background-color: rgba(65, 201, 0, .2);
    color: rgba(0, 99, 51, 1);
  }
  .achievement .label {
    font-weight: bold;
  }
  .achievement .clue {

  }
  .achievement .status {
    font-style: italic;
    font-size: .8rem;
  }
  @media (max-width: 991px) {
    .achievement {
      width: 49%;
      float: left;
    }
  }
  @media (max-width: 768px) {
    .achievement {
      width: 100%;
      float: none;
    }
  }
</style>
