<template>
  <div id="panel-stats" class="panel">
    <h3>Stats</h3>
    <ul class="alert-info">
      <li><strong>Currency:</strong> {{ numberFormat(currency) }}</li>
      <li><strong>Projects sold:</strong> {{ projectsCount }}</li>
      <li>
        <strong>Automation: </strong>
        <span v-if="autostartProjects" class="text-success">Active</span>
        <span v-else class="text-secondary">Inactive</span>
      </li>
      <li v-if="projects.normal.total"><strong>Normal projects slots:</strong> {{ projects.normal.total }}</li>
      <li v-if="projects.big.total"><strong>Big projects slots:</strong> {{ projects.big.total }}</li>
      <li v-if="projects.huge.total"><strong>Huge projects slots:</strong> {{ projects.huge.total }}</li>
      <li v-if="projects.normal.total"><strong>Normal projects time range:</strong> {{ projectTimes('normal') }}</li>
      <li v-if="projects.big.total"><strong>Big projects time range:</strong> {{ projectTimes('big') }}</li>
      <li v-if="projects.huge.total"><strong>Huge projects time range:</strong> {{ projectTimes('huge') }}</li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    'computed': {
      ...mapState([
        'currency',
        'projectsCount',
        'autostartProjects',
        'projects'
      ])
    },
    'methods': {
      projectTimes(type){
        return `${this.projects[type].minMaxTime.map(n => this.numberFormat(n)).join(' - ')} seconds ${(this.projectsCount ? `+${this.projects[type].total}s` : '')}`
      }
    }
  }
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, .05);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
  }
  li {
    padding: 5px;
  }
</style>