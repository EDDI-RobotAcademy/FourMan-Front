<template>
    <div class="main-container ms-10 me-10 mt-10 mb-10">
      <v-container>
        <div class="EULJIRO mb-3">
            <h1>실시간 리뷰 <v-icon>mdi-camera</v-icon></h1>
        </div>
        <div class="EULJIRO mt-5 mb-5" style="height: 250px; display: flex; justify-content: center; align-items: center;" v-if="reviewBoards.length === 0">
          <h2>작성된 리뷰가 없습니다!</h2>
        </div>
        <v-row>
          <v-col
            v-for="(reviewBoard, index) in reviewBoards.slice(0, 4)"
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
        <div class="text-center mt-10">
            <v-btn class="me-2 brown darken-2 white--text" width="20%" :to="{ name: 'ReviewBoardListPage' }">
                <h4>리뷰로 이동</h4>
            </v-btn>
        </div>
      </v-container>
    </div>
  
    
  </template>
  
  <script>
  
import { mapActions, mapState } from 'vuex'

export default {
    name: "MainReviewForm",
    computed: {
        ...mapState([
        'reviewBoards'
        ]),
    },
    mounted () {
        this.requestReviewBoardListToSpring()
    },
    methods: {
        ...mapActions([
        'requestReviewBoardListToSpring'
        ]),
        getImagePath(imageData) {
            console.log('imageData:', imageData);
            return require(`@/assets/reviewImage/${imageData}`);
        },
    },
}

</script>
  
<style>

</style>