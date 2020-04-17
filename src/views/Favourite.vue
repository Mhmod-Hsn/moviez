<template>
  <v-content class="favourite-page">
    <v-container
      class=""
      fluid
    >

      <h2 class="section-title ml-2 font-weight-bold">Favoutite</h2>
      <p class="">Here will show things that you liked!</p>

      <v-row
        no-gutters
        v-if="favouriteMovies.length">
        <v-col
          :key="movie.id"
          class="pa-2"
          data-aos="slide-up"
          data-aos-easing="ease-out-back"
          data-aos-offset="100"
          lg="3"
          md="4"
          sm="6"
          v-for="movie in favouriteMovies"
          xs="12"
        >
          <v-card
            href=""
          >
						<span
              class="rating-badge red darken-4 white--text"
            >
							<i class="v-icon mdi mdi-star"></i>
							{{movie.vote_average}}
						</span>
            <span class="adult red darken-4 white--text" v-if="movie.adult">
							+18
						</span>
            <v-img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >

              <v-card-title v-text='movie.title'></v-card-title>

              <v-card-subtitle>
                {{movie.release_date}}
              </v-card-subtitle>


            </v-img>


            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn @click="addToFav(movie)" icon>
                <div :is-active="movie.fav" class="heart"></div>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div
        class=""
        v-if="!favouriteMovies.length">
        <h3>there's nothing to show! make some liked first</h3>
      </div>
    </v-container>
  </v-content>
</template>

<script>

  export default {
    name: 'Favourite',
    data() {
      return {
        favouriteMovies: [],
        myStorage: window.localStorage
      }
    },
    methods: {
      addToFav(movie) {
        // add to fav
        if (!movie.fav) {
          movie.fav = true;
          this.favouriteMovies.push(JSON.parse(JSON.stringify(movie)))
        }
        // // remove from favorite
        else {
          movie.fav = false;

          // finding the current movie and removing from favourite
          this.favouriteMovies = this.favouriteMovies.filter(e => {
            return e.id !== movie.id
          })
        }
        this.myStorage.setItem('favourite-movies', JSON.stringify(this.favouriteMovies));
      },
    },
    mounted() {
      // get fav movies from local storage
      if (localStorage.getItem('favourite-movies').length) {
        this.favouriteMovies =
          JSON.parse(localStorage.getItem('favourite-movies'))
      }
    }

  }
</script>