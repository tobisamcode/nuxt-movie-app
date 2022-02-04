<template>
  <div class="home">
    <hero />
  </div>
</template>

<script>
import axios from 'axios'
import Hero from '~/components/Hero.vue'
export default {
  components: { Hero },
  name: 'IndexPage',
  data() {
    return {
      movies: [],
    }
  },
  async fetch() {
    await this.getMovies()
  },
  methods: {
    async getMovies() {
      const data = axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=0d7dff136b435e9f4b7c27f0b18ceabf&language=en-US&append_to_response=videos,images`);
      const result = await data;
      result.data.results.forEach((movie) => {
        this.movies.push(movie)
      })
      console.log(this.movies);
    }
  }
}
</script>
