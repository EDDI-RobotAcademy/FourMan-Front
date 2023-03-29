<template>
    <div class="main-container">
        <v-container>
          <v-row>
            <v-col
              v-for="reviewBoard in reversedPosts"
              :key="reviewBoard.reviewBoardId"
              cols="8"
              sm="3"
              md="3"
              >
                <v-card class="text-center" :to="{ name: 'ReviewBoardReadPage' }">
                <v-img
                  :src="reviewBoard.firstPhoto ? getImagePath(reviewBoard.firstPhoto) : ''"
                  aspect-ratio="1"
                  class="grey lighten-3"
                  ></v-img>
                  
                  {{ reviewBoard.cafeName }}

                  <v-rating
                    v-model=reviewBoard.rating
                    bg-color="orange-lighten-1"
                    color="blue"
                    readonly
                    />

                  <h3>{{ reviewBoard.title }}</h3>
                    {{ reviewBoard.writer }}

                  <v-card-actions>
                    
                  </v-card-actions>
                </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
</template>

<script>
export default {
    name: "ReviewBoardListForm",
    props: {
        reviewBoards: {
            type: Array
        }
    },
    methods: {
        getImagePath(imageData) {
            console.log('imageData:', imageData);
            return require(`@/assets/reviewImage/${imageData}`);
        },
    },
    computed: {
    reversedPosts() {
      return this.reviewBoards.slice().reverse();
    },
  },
}
</script>

<style>

</style>