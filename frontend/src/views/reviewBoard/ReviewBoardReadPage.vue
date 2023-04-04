<template>
  <v-container>
    <div align="center">
      <review-board-read-form v-if="reviewBoard" :reviewBoard="reviewBoard" :reviewBoardImages="reviewBoardImages" />
      <p v-else>로딩중 .......... </p>
      <v-btn v-if="loginCheck()" class="me-2 brown darken-2 white--text" @click="onDelete">
        <h4>삭제</h4>
      </v-btn>
      <v-btn v-if="loginCheck()" class="me-2 brown darken-2 white--text" :to="{ name: 'ReviewBoardModifyPage', params: { reviewBoardId } }">
        <h4>수정</h4>
      </v-btn>
      <v-btn class="brown darken-2 white--text" width="10%" height="40px" :to="{ name: 'ReviewBoardListPage' }">
        <h4>돌아가기</h4>
      </v-btn>
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
