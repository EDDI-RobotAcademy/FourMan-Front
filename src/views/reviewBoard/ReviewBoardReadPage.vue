<template>
  <v-container>
    <div>
      <review-board-read-form v-if="reviewBoard" :reviewBoard="reviewBoard" :reviewBoardImages="reviewBoardImages" />
      <p v-else>로딩중 .......... </p>
    </div>
  </v-container>
</template>

<script>
import ReviewBoardReadForm from '@/components/reviewBoard/ReviewBoardReadForm.vue'
import { mapActions, mapState } from 'vuex'
const reviewBoardModule= 'reviewBoardModule'

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
        ...mapState(reviewBoardModule,['reviewBoard', 'reviewBoardImages'])
    },
    methods: {
        ...mapActions(reviewBoardModule,[
            'requestReviewBoardToSpring',
            'requestDeleteReviewBoardToSpring',
            'requestReviewBoardImageToSpring',
        ]),
        loginCheck() {
          if(JSON.parse(localStorage.getItem('userInfo'))) {
            const loginId = JSON.parse(localStorage.getItem('userInfo')).id
            const memberId = this.reviewBoard.memberId
            const authorityName = JSON.parse(localStorage.getItem('userInfo')).authorityName

            if(loginId === memberId  || authorityName === "MANAGER") {
              return true
            } else {
              return false
            }
          }

          if(!JSON.parse(localStorage.getItem('userInfo'))) {
            return false
          }
        },
        async onDelete () {
          await this.requestDeleteReviewBoardToSpring(this.reviewBoardId)
          await this.$router.push({ name: 'ReviewBoardListPage' })
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
