<template>
	<v-content class="home-page">
		<v-container
			class=""
			fluid
		>

			<v-row no-gutters>
				<v-col
					v-for="movie in movies"
					:key="movie.id"
					xs="12"
					sm="6"
					md="4"
					lg="3"
					class="pa-2"
					data-aos="slide-up"
					data-aos-easing="ease-out-back"
					data-aos-offset="100"
				>
					<v-card>
						<v-img
							:src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
							class="white--text align-end"
							gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
						>
							<v-card-title v-text='movie.title'></v-card-title>

							<v-card-subtitle>

								<span
									class="rating-badge red darken-4 white--text"
								>
									<i class="v-icon mdi mdi-star"></i>
									{{movie.vote_average}}
								</span>
							</v-card-subtitle>

						</v-img>


						<v-card-actions>
							<v-spacer></v-spacer>

							<v-btn @click="addToFav(movie,$event)" icon>
								<div :is-active="movie.fav" class="heart"></div>
							</v-btn>

							<v-btn icon>
								<v-icon>mdi-share-variant</v-icon>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>

			<!--	 Load More		-->
			<div class="text-center my-5">
				<v-btn
					:loading="buttonLoading"
					@click="loadMore"
					color="dark"
					dark
					large
					rounded
				>
					Load More
				</v-btn>
			</div>


		</v-container>
	</v-content>
</template>

<script>
  import axios from 'axios';


  export default {
    name: "Movies",
	  data(){
      return{
        apiKey: 'fd5b76318bc43e4aec9f492e27f9bf16',
        movies: [],
        currentPage: 1,
        buttonLoading: false,
        favouriteMovies: [],
        myStorage: window.localStorage
      }
	  },
    methods: {
      addToFav(movie, event) {
        // add to fav
        if (!movie.fav) {
          movie.fav = true;
          let x = JSON.parse(JSON.stringify(movie));
          this.favouriteMovies.push(x)
        }
        // // remove from favorite
        else {
          movie.fav = false;

          // finding the current movie and removing from favourite
          this.favouriteMovies = this.favouriteMovies.filter(e => {
            return e.id !== movie.id
          })
        }

        console.log('fav movie ', JSON.parse(JSON.stringify(this.favouriteMovies)));

        this.myStorage.setItem('favourite-movies', JSON.stringify(this.favouriteMovies));

        console.log(JSON.parse(this.myStorage.getItem('favourite-movies')))


      },
      loadMore() {
        this.buttonLoading = true;
        axios(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&page=${this.currentPage}`)
          .then(response => {
            this.buttonLoading = false;
            let res = response.data.results;

            // add heart icon if the movie was added before to favourite
            if (this.favouriteMovies.length > 0) {
              for (let m = 0; m < res.length; m++) {
                res[m].fav = false;

                for (let f = 0; f < this.favouriteMovies.length; f++) {
                  if (res[m].id === this.favouriteMovies[f].id) {
                    res[m].fav = true
                  }
                }
                this.movies.push(res[m])
              }

            } else {
              res.forEach(m => {
                m.fav = false;
                this.movies.push(m)
              })
            }

            this.currentPage++
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    mounted () {
      this.loadMore();
      // Infinite Scrolling calculation
      window.onscroll = () => {
        let bottmOfWindow = document.documentElement.scrollTop +
          window.innerHeight === document.documentElement.offsetHeight;

        bottmOfWindow ? this.loadMore() : ''
      };

      // get fav movies from local storage
      if (localStorage.getItem('favourite-movies').length) {
        this.favouriteMovies =
          JSON.parse(localStorage.getItem('favourite-movies'))
      }

    }

  }

</script>

<style scoped>

</style>