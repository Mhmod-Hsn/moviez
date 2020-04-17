<template>
	<v-content>
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
				>
					<v-card>
						<v-img
							:src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
							class=""
							gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
						>
							<v-card-title v-text='movie.title'></v-card-title>
						</v-img>

						<v-card-actions>
							<v-spacer></v-spacer>

							<v-btn icon>
								<v-icon>mdi-heart</v-icon>
							</v-btn>

							<v-btn icon>
								<v-icon>mdi-bookmark</v-icon>
							</v-btn>

							<v-btn icon>
								<v-icon>mdi-share-variant</v-icon>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>


		</v-container>
	</v-content>
</template>

<script>
  export default {
    name: "Movies",
	  data(){
      return{
        apiKey: 'fd5b76318bc43e4aec9f492e27f9bf16',
        movies: []

      }
	  },
    mounted () {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=fd5b76318bc43e4aec9f492e27f9bf16`)
        .then(async response => {
          await response.json()
            .then(items=>{
              this.movies.push(...items.results)
            })
        })
        .catch(err => {
          console.log(err);
        });
    }

  }
</script>

<style scoped>

</style>