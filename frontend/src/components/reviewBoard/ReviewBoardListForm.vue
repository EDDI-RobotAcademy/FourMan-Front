<template>
  <div class="main-container">
    <v-container>
      <v-row>
        <v-col
          v-for="(reviewBoard, index) in calData"
          :key="index"
          cols="8"
          sm="3"
          md="3"
          >
            <v-card class="text-center" :to="{ name: 'ReviewBoardReadPage', params: { reviewBoardId: reviewBoard.reviewBoardId.toString() }}">
            <v-img
              :src="reviewBoard.firstPhoto ? getImagePath(reviewBoard.firstPhoto) : ''"
              aspect-ratio="1"
              class="grey lighten-3"
              ></v-img>
              
              <v-card-subtitle class="pb-0">{{ reviewBoard.cafeName }}</v-card-subtitle>
              <v-rating
                    :value=reviewBoard.rating
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>

              <v-card-text class="text--primary">
                <div>{{ reviewBoard.title }}</div>
          
                <div>
                  {{reviewBoard.writer }}
                </div>
              </v-card-text>
            </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-pagination
      v-model="curPageNum"
      :length="numOfPages"
      color="#2c4636"
      class="mt-10"
      flat
    ></v-pagination>

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
    data() {
      return {
        dataPerPage: 8,
        curPageNum: 1,
      };
    },
    methods: {
        getImagePath(imageData) {
            console.log('imageData:', imageData);
            return require(`@/assets/reviewImage/${imageData}`);
        },
    },
    computed: {
      startOffset() {
        return (this.curPageNum - 1) * this.dataPerPage;
      },
      endOffset() {
        return this.startOffset + this.dataPerPage;
      },
      numOfPages() {
        return Math.ceil(this.reviewBoards.length / this.dataPerPage);
      },
      calData() {
        return this.reviewBoards.slice(this.startOffset, this.endOffset);
      },
  },
}
</script>

<style>

</style>