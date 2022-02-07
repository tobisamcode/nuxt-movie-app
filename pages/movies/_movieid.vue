<template>
    <Loading v-if="$fetchState.pending"/>
  <div v-else class="container single-movie">
      <NuxtLink class="button" :to="{ name: 'index' }">Back</NuxtLink>
      <div class="movie-info">
          <div class="movie-img">
              <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="">
          </div>
          <div class="movie-content">
              <h1>Title: {{ movie.title }}</h1>
              <p class="movie-fact tagline">
                  <span>Tagline:</span> {{ movie.tagline }}
              </p>
              <p class="movie-fact">
                  <span>Released:</span>
                  {{ 
                      new Date(movie.release_date).toLocaleString('en-us', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                   })
                  }}
              </p>
              <p class="movie-fact">
                  <span>Duration:</span> {{ movie.runtime }} minutes
              </p>
              <p class="movie-fact">
                  <span>Revenue:</span>
                  {{
                      movie.revenue.toLocaleString('en-us', {
                        style: 'currency',
                        currency: 'USD',
                      })
                   }}
                </p>
                <p class="movie-fact"><span>Overview:</span>{{ movie.overview }}</p>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'single-movie',
    head() {
        return {
            title: this.movie.title,
        }   
    },
    data() {
        return{
            movie: '',
        }
    },
    async fetch() {
        await this.getSingleMovie()
    },
    fetchDelay: 1000,
    methods: {
        async getSingleMovie() {
            const data = axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.movieid}?api_key=0d7dff136b435e9f4b7c27f0b18ceabf&language=en-US&page=1`)
            const result = await data
            this.movie = result.data
        }
    }
}
</script>

<style lang="scss" scoped>
.single-movie {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 10px;
  @media (min-width: 800px) {
      padding: 52px 60px;
    }
  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }
  .movie-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 45px;
    color: #fff;
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-start;
    }
    .movie-img {
      img {
        max-height: 500px;
        width: 100%;
        @media (min-width: 800px) {
          max-height: 500px;
          width: initial;
        }
      }
    }
    .movie-content {
      h1 {
        font-size: 36px;
        font-weight: 400;
      }
      .movie-fact {
        margin-top: 8px;
        font-size: 16px;
        line-height: 1.5;
        span {
          font-weight: 600;
          text-decoration: underline;
        }
      }
      .tagline {
        font-style: italic;
        span {
          font-style: normal;
        }
      }
    }
  }
}
</style>