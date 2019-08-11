export default {
  'achievements': {

    'normal': {
      'label': 'So normal',
      'clue': 'Buy a normal project',
      'check': state => state.projects.normal.total > 1,
      'unlocked': null,
      'hidden': false
    },

    'firstoneI': {
      'label': 'The first one',
      'clue': 'Complete your first normal project',
      'check': state => state.projects.normal.sold > 0,
      'unlocked': null,
      'hidden': false
    },

    'firstoneII': {
      'label': 'The first one II',
      'clue': 'Complete your first big project',
      'check': state => state.projects.big.sold > 0,
      'unlocked': null,
      'hidden': false
    },

    'firstoneIII': {
      'label': 'The first one III',
      'clue': 'Complete your first huge project',
      'check': state => state.projects.huge.sold > 0,
      'unlocked': null,
      'hidden': false
    },

    'random': {
      'label': 'I\'m sooooooooo lucky',
      'check': state => Math.random() < 0.0001,
      'unlocked': null,
      'hidden': false
    },

    'millionaire': {
      'label': 'Millionaire!',
      'clue': `Save ${(1000000).toLocaleString()}`,
      'check': state => state.currency >= 1000000,
      'unlocked': null,
      'hidden': false
    },

    'serioussaver': {
      'label': 'Serious saver',
      'clue': `Save ${(100000000).toLocaleString()}`,
      'check': state => state.currency >= 100000000,
      'unlocked': null,
      'hidden': false
    },

    'hardworker': {
      'label': 'Hard worker',
      'clue': 'Complete 100 projects',
      'check': state => state.projectsCount >= 100,
      'unlocked': null,
      'hidden': false
    },

    'hardworkerII': {
      'label': 'Hard worker II',
      'clue': `Complete ${(1000).toLocaleString()} projects`,
      'check': state => state.projectsCount >= 1000,
      'unlocked': null,
      'hidden': false
    },

    'hardworkerIII': {
      'label': 'Hard worker III',
      'clue': `Complete ${(10000).toLocaleString()} projects`,
      'check': state => state.projectsCount >= 10000,
      'unlocked': null,
      'hidden': false
    },

    'automatization': {
      'label': 'Automatization',
      'check': state => state.shopItemsOwned['autostartProjects'] && state.shopItemsOwned['autostartProjects'] > 0,
      'unlocked': null,
      'hidden': false
    },

    'diamondPlate': {
      'label': 'Diamond worker',
      'clue': 'Get the diamond plate.',
      'check': state => state.shopItemsOwned['imRichDiamondPlate'] > 0,
      'unlocked': null,
      'hidden': false
    },

    // MISTERY ACHIEVEMENTS

    'iprefernormal': {
      'label': 'I prefer normal',
      'clue': 'Stay with 100 normal projects (normal only).',
      'check': state => state.projects.normal.total >= 100 && state.projects.big.total === 0 && state.projects.huge.total === 0,
      'unlocked': null,
      'hidden': true
    },

    'ipreferbig': {
      'label': 'I prefer big',
      'clue': 'Stay with 100 big projects (big only)',
      'check': state => state.projects.big.total >= 100 && state.projects.normal.total === 0 && state.projects.huge.total === 0,
      'unlocked': null,
      'hidden': true
    },

    'ipreferhuge': {
      'label': 'I prefer huge',
      'clue': 'Stay with 100 huge projects (huge only)',
      'check': state => state.projects.huge.total >= 100 && state.projects.normal.total === 0 && state.projects.big.total === 0,
      'unlocked': null,
      'hidden': true
    }

  }
}