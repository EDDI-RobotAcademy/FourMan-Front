<template>
    <v-container>
      <div align="center">
        <h2>게시물 수정</h2>
        <review-board-modify-form v-if="reviewBoard" :reviewBoard="reviewBoard" @submit="onSubmit"/>
        <p v-else>로딩중 ........</p>
      </div>
    </v-container>
  </template>
  
  <script>
  import ReviewBoardModifyForm from '@/components/reviewBoard/ReviewBoardModifyForm.vue'
  import { mapActions, mapState } from 'vuex'
  export default {
      components: { ReviewBoardModifyForm },
      name: "ReviewBoardModifyPage",
      props: {
            reviewBoardId: {
              type: String,
              required: true,
          }
      },
      computed: {
          ...mapState(['reviewBoard'])
      },
      methods: {
          ...mapActions([
              'requestReviewBoardToSpring',
              'requestReviewBoardModifyToSpring',
          ]),
          async onSubmit (payload) {
              const { title, content, rating } = payload
              const reviewBoardId = this.reviewBoardId
              await this.requestReviewBoardModifyToSpring(
                  { reviewBoardId, title, content, rating })
              await this.$router.push({
                  name: 'ReviewBoardReadPage',
                  params: { reviewBoardId: this.reviewBoardId }
              })
          }
      },
      created () {
          this.requestReviewBoardToSpring(this.reviewBoardId)
      }
  }
  </script>
  
  <style>
  </style>