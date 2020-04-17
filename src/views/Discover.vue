<template>
	<v-content class="home-page">
		<v-container
			class=""
			fluid
		>

			<h2 class="section-title ml-2 font-weight-bold">Discover</h2>


			<v-card
				class="filters-card mx-2 my-5 pa-3"
			>
				<h4 class="text--white">Filters</h4>


				<v-row>

					<!--			Input			-->
					<v-col cols="12" md="3" sm="6">
						<v-text-field
							label="Release Year"
							type="number"
							v-model="filters.releaseYear"
						></v-text-field>
					</v-col>

					<!--			Sort			-->
					<v-col cols="12" md="3" sm="6">
						<v-select
							:items="sortByOptions"
							label="Sort By"
							v-model="filters.sortBy"
						></v-select>
					</v-col>

					<!--			Vote			-->
					<v-col cols="12" md="3" sm="6">
						<v-slider
							class="mt-4"
							label="Vote"
							max="10"
							min="0"
							thumb-label
							v-model="filters.vote"
						></v-slider>
					</v-col>

					<!--				Submit				-->
					<v-col cols="12" md="3" sm="6">
						<div class="my-2">
							<v-btn
								@click="filtersChanged()"
								block
								class="mt-3"
								color="primary"
							>
								Filter
							</v-btn>
						</div>
					</v-col>

				</v-row>

			</v-card>

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
					<v-card
						href="#"
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

							<!--							<v-btn icon>
															<v-icon>mdi-share-variant</v-icon>
														</v-btn>-->
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
    name: "Discover",
	  data(){
      return{
        apiKey: 'fd5b76318bc43e4aec9f492e27f9bf16',
        movies: [],
        currentPage: 1,
        buttonLoading: false,
        favouriteMovies: [],
        myStorage: window.localStorage,
        sortByOptions: [
          {
            value: 'popularity.asc',
            text: 'Popularity(asc)'
          },
          {
            value: 'popularity.desc',
            text: 'Popularity(desc)'
          },
          {
            value: 'revenue.asc',
            text: 'Revenue(asc)'
          },
          {
            value: 'revenue.desc',
            text: 'Revenue(desc)'
          },
          {
            value: 'primary_release_date.asc',
            text: 'Release Date(asc)'
          },
          {
            value: 'primary_release_date.desc',
            text: 'Release Date(desc)'
          },
          {
            value: 'original_title.asc',
            text: 'Title (asc)'
          },
          {
            value: 'original_title.desc',
            text: 'Title (desc)'
          },
          {
            value: 'vote_average.asc',
            text: 'Vote avg(asc)'
          },
          {
            value: 'vote_average.desc',
            text: 'Vote avg(desc)'
          },
          {
            value: 'vote_count.asc',
            text: 'Vote Count (asc)'
          },
          {
            value: 'vote_count.desc',
            text: 'Vote Count (desc)'
          }
        ],
        filters: {
          text: '',
          sortBy: 'popularity.desc',
          releaseYear: '',
          vote: '',
        }
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
      loadMore() {
        this.buttonLoading = true;
        axios(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&page=${this.currentPage}&sort_by=${this.filters.sortBy}&vote_average.gte=${this.filters.vote}&primary_release_year=${this.filters.releaseYear}`)
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
      },
      filtersChanged() {
        console.log(this.filters);
        this.currentPage = 1;
        this.movies = [];
        this.loadMore()
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