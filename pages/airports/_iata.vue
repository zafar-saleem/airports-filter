<template>
  <Layout>
    <h1 class="text-2xl">
      Airport: {{ airport ? airport.name : 'loading..' }}
    </h1>
    <pre class="mt-10 text-gray-500 text-sm">{{ JSON.stringify(airport, undefined, 2) }}</pre>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { findAirportByIata } from '~/models/airport'

import Airport from '~/types/airport'

interface Data {
  airport?: Airport
}

export default Vue.extend({
  data (): Data {
    return {
      airport: undefined
    }
  },
  mounted () {
    this.loadAirport()
  },
  methods: {
    async loadAirport () {
      this.airport = await findAirportByIata(this.$route.params.iata)
    }
  }
})
</script>
