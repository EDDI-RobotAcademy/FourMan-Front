<template>
    <v-container>
      <div align="center">
        <review-board-read-form v-if="reviewBoard" :reviewBoard="reviewBoard" :reviewBoardImages="reviewBoardImages" />
        <p v-else>로딩중 .......... </p>
        <button>수정</button>
        <button @click="onDelete">삭제</button>
        <router-link :to="{ name: 'ReviewBoardListPage' }">
          돌아가기
        </router-link>
      </div>
    </v-container>
  </template>
  
  <script>
  import ReviewBoardReadForm from '@/components/reviewBoard/ReviewBoardReadForm.vue'
  import { mapActions, mapState } from 'vuex'
  export default {
    components: { ReviewBoardReadForm },
      name: "ReviewBoardReadPage",
      props: {
          reviewBoardId: {
              type: String,
              required: true,
          }
      },
      computed: {
          ...mapState(['reviewBoard', 'reviewBoardImages'])
      },
      methods: {
          ...mapActions([
              'requestReviewBoardToSpring',
              'requestDeleteReviewBoardToSpring',
              'requestReviewBoardImageToSpring',
          ]),
          async onDelete () {
            if(JSON.parse(localStorage.getItem('userInfo'))) {
              const loginId = JSON.parse(localStorage.getItem('userInfo')).id
              const memberId = this.reviewBoard.memberId
              const authorityName = JSON.parse(localStorage.getItem('userInfo')).authorityName

              if(loginId === memberId  || authorityName === "MANAGER") {
                await this.requestDeleteReviewBoardToSpring(this.reviewBoardId)
                await this.$router.push({ name: 'ReviewBoardListPage' })
              } else {
                alert("작성자만 해당 게시글을 삭제할 수 있습니다.")
              }
            }

            if(!JSON.parse(localStorage.getItem('userInfo'))) {
              alert("작성자만 해당 게시글을 삭제할 수 있습니다.")
            }
          }
      },
      async created () {
          console.log('reviewBoardId: ' + this.reviewBoardId)
          await this.requestReviewBoardToSpring(this.reviewBoardId)
          await this.requestReviewBoardImageToSpring(this.reviewBoardId)
      }
  }
  </script>
  
  <style>
  </style>