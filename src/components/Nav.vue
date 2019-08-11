<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#" @click="$store.commit('changeSection', 'home')">devlife 2</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" :class="section === 'home' ? 'active' : ''">
            <a class="nav-link" href="#" @click="$store.commit('changeSection', 'home')"><font-awesome-icon icon="home" /> Home</a>
          </li>
          <li class="nav-item" :class="section === 'shop' ? 'active' : ''">
            <a class="nav-link" href="#" @click="$store.commit('changeSection', 'shop')"><font-awesome-icon icon="cogs" /> Upgrades
              <span class="badge badge-success" v-if="canAffordCount() > 0">{{ canAffordCount() }}</span>
            </a>
          </li>
          <li class="nav-item" :class="section === 'achievements' ? 'active' : ''">
            <a href="#" class="nav-link" @click="$store.commit('changeSection', 'achievements')"><font-awesome-icon icon="trophy" /> Achievements</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" disabled href="#"><font-awesome-icon icon="question-circle" /> Help</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" disabled href="#"><font-awesome-icon icon="code-branch" /> GitHub</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-danger" href="#" @click="hardReset"><font-awesome-icon icon="exclamation-triangle" /> Hard reset</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" disabled href="#"><font-awesome-icon icon="heart" /> by naoxink</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'section',
        'items'
      ])
    }
  }
</script>