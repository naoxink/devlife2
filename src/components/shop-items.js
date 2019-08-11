export default {
  'items': {

    'project': {
      'id': 'project',
      'quickshop': true,
      'infinite': true,
      'label': 'New project',
      'description': 'Adds another normal project.',
      'price': 500,
      'effect': (store) => store.state.projects.normal.total++
    },

    'bigProject': {
      'id': 'bigProject',
      'quickshop': true,
      'infinite': true,
      'label': 'Big project',
      'description': 'Merge two normal projects into a big one.',
      'price': 1000,
      'requirements': state => {
        return state.projects.normal.total > 1
      },
      'effect': store => {
        store.state.projects.normal.total -= 2
        store.state.projects.big.total += 1
      }
    },

    'hugeProjects': {
      'id': 'hugeProjects',
      'quickshop': true,
      'infinite': true,
      'label': 'Huge project',
      'description': 'Merge two big projects into a huge one.',
      'price': 5000,
      'requirements': state => {
        return state.projects.big.total > 1
      },
      'effect': store => {
        store.state.projects.big.total -= 2
        store.state.projects.huge.total += 1
      }
    },

    'frameworks': {
      'id': 'frameworks',
      'quickshop': true,
      'infinite': true,
      'label': 'Frameworks',
      'description': 'Build faster with frameworks.',
      'price': 3000,
      'effect': store => {
        store.commit('reduceProjectTime', 'normal')
        store.commit('incrementProjectEarnings', { 'type': 'normal', 'increment': 0.05 })

        store.commit('reduceProjectTime', 'big')
        store.commit('incrementProjectEarnings', { 'type': 'big', 'increment': 0.05 })

        store.commit('reduceProjectTime', 'huge')
        store.commit('incrementProjectEarnings', { 'type': 'huge', 'increment': 0.05 })
      }
    },

    'quickshop': {
      'id': 'quickshop',
      'quickshop': false,
      'infinite': false,
      'label': 'Quick upgrades panel',
      'description': 'Unlock an unpgrades panel in the main section.',
      'price': 5000,
      'effect': () => {}
    },

    'autostartProjects': {
      'id': 'autostartProjects',
      'quickshop': false,
      'infinite': false,
      'label': 'Auto projects',
      'description': 'Start projects automatically.',
      'price': 10000,
      'effect': store => {
        store.state.autostartProjects = true
      }
    },

    'imRichDiamondPlate': {
      'id': 'imRichDiamondPlate',
      'quickshop': false,
      'label': '"I\'m a rich b**ch" diamond plate',
      'description': 'Show them you aro SO RICH buying this useless plate.',
      'price': 10000000,
      'effect': () => {}
    }

  }
}