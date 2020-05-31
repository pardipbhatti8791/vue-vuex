<template>
  <div>
    <div>Create an event, {{ user.name }}</div>
    <p>This event is created by: {{ user.id }}</p>
    <p>There are {{ catLength }} categories</p>
    <p>{{ getEvent(1) }}</p>
    <input type="number" v-model.number="incrementBy" />
    <p>counter: {{ getCount }}</p>
    <button @click="incrementCount">Increment</button>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      incrementBy: 1
    }
  },
  // computed: mapState({
  //   user: 'user',
  //   categories: 'categories'
  // })
  methods: {
    incrementCount() {
      this.$store.dispatch('updateCount', this.incrementBy)
    }
  },
  computed: {
    catLength() {
      return this.$store.getters.catLength
    },
    ...mapState(['user', 'categories']),
    getEvent() {
      return this.$store.getters.getEventById
    },
    getCount() {
      return this.$store.state.count
    }
  }
}
</script>

<style scoped></style>
