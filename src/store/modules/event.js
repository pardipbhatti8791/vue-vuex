import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: [],
  count: 0,
  event: {}
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_TOTAL_COUNT(state, count) {
    state.count = count
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'You event has been created!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(e => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event' + e.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_TOTAL_COUNT', response.headers['x-total-count'])
        commit('SET_EVENTS', response.data)
      })
      .catch(e => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events' + e.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    let event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id) // <--- Send the prop id to our EventService
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(e => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event' + e.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  }
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
