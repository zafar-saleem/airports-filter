<template>
  <Layout>
    <h1 class="text-2xl font-bold">
      Code Challenge: Airports
    </h1>

    <input
    	type="text"
    	name="airport"
    	v-on:input="filter"
    	class="mt-10 px-4 py-4 bg-gray-100 border shadow-sm border-gray-300
    	placeholder-gray-400 focus:outline-none focus:border-sky-500
    	focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
    	placeholder="Start typing..."
    />

    <h2 class="mt-10 text-xl font-bold">
      All Airports <span
				class="inline-flex items-center justify-center
					px-2 py-1 mr-2 text-xs font-bold leading-none
					text-blue-100 bg-blue-600 rounded-full">
				{{ airports.length || `loading...` }}
			</span>
    </h2>

    <div class="grid grid-cols-2 gap-4">
    	<p v-if="airports.length === 0">Nothing found yet...</p>
      <a
      	v-for="airport in airports"
      	:key="airport.iata"
      	:href="`/airports/${airport.iata.toLowerCase()}`"
      	class="mt-5 items-center shadow p-5 border rounded-md">
        <div>
          {{ airport.name }}, {{ airport.city }}
        </div>
        <p class="ml-auto text-mono text-gray-500">
          {{ airport.country }}
        </p>
      </a>
      <!-- <InfiniteScroll @intersect="loadAirports"/> -->
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'

import axios from '~/utils/axios';
import Layout from '~/components/Layout.vue';
import Airport from '~/types/airport';
// import InfiniteScroll from '~/components/InfiniteScroll.vue';

interface Data {
  airports: Airport[],
  cache: Airport[],
  $debounce: any,
  page: number,
}

export default Vue.extend({
  components: {
    Layout,
    // InfiniteScroll,
  },
  data (): Data {
    return {
      airports: [],
      cache: [],
      page: 1,
      $debounce: null,
    }
  },
  mounted () {
    this.loadAirports();
  },
  methods: {
    async loadAirports () {
      const response = await axios
      	.get<Airport[]>(`/api/airports?page=${this.page}&limit=50`)
      	.catch(err => err.response);

      this.page++;
      this.airports = response.data;
    },

    filter (event: any) {
    	const userSearchString = event.target.value;
    	
    	if (this.cache.length === 0) {
    		this.cache = this.airports;
    	}

    	this.$debounce.trigger(() => {
    		if (userSearchString.length > 0) {
    			// this.airports = await axios
    			// 	.get(`/api/airports/search?query=${userSearchString}&page=${this.page}&limit=50`)
    			// 	.catch(err => err.response);
    			this.airports = this.cache
						.filter(airport =>
							airport.name.toLowerCase()
							.includes(userSearchString.toLowerCase()) ||
							airport.city.toLowerCase()
							.includes(userSearchString.toLowerCase()) ||
							airport.country.toLowerCase()
							.includes(userSearchString.toLowerCase())
					);
    		} else {
    			this.airports = this.cache;
    			this.cache = [];
    		}
    	}, 100)();
    },
  }
})
</script>
