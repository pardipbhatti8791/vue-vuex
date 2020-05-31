<template>
  <div>
    <h1>Event for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'eventList', query: { page: page - 1 } }"
        rel="prev"
        >Prev</router-link
      >
      |
    </template>

    <template v-if="totalCount">
      <router-link
        :to="{ name: 'eventList', query: { page: page + 1 } }"
        rel="prev"
        >Next</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3,
      page: this.page
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    totalCount() {
      return parseInt(this.event.count) > this.page * 3 ? true : false
    },
    ...mapState(['event', 'count', 'user'])
  }
}
</script>
