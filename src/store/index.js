import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'gpgugu', name: 'gugu meri' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ],
    events: [
      { id: 1, title: '...', organizer: true },
      { id: 2, title: '...', organizer: false },
      { id: 3, title: '...', organizer: true },
      { id: 4, title: '...', organizer: false }
    ],
    count: 1
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value
    }
  },
  actions: {
    updateCount({ state, commit }, value) {
      if (state.user) {
        commit('INCREMENT_COUNT', value)
      }
    }
  },
  modules: {},
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: state => {
      // return state.todos.length - getters.doneTodos.length
      return state.todos.filter(todo => !todo.done).length
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
