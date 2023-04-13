<template>
  <v-container>
    <div class="EULJIRO mt-5 mb-5 text-center">
            <h1>리뷰 게시판 <v-icon>mdi-camera</v-icon></h1>
        </div>
    <review-board-list-form class="mt-5" :reviewBoards="reviewBoards"/>
    <v-btn v-if="this.$store.state.isAuthenticated" class="mb-10 me-10 brown darken-2 white--text" style="float:right;" @click="loginCheck">
      <h4>리뷰 등록</h4>
    </v-btn>
  </v-container>
</template>

<script>
import ReviewBoardListForm from '@/components/reviewBoard/ReviewBoardListForm.vue'
import { mapActions, mapState } from 'vuex'
const reviewBoardModule= 'reviewBoardModule'

export default {
  components: { ReviewBoardListForm },
  name: "ReviewBoardListPage",
  computed: {
    ...mapState(reviewBoardModule,[
      'reviewBoards'
    ]),
  },
  mounted () {
    this.requestReviewBoardListToSpring()
  },
  methods: {
    ...mapActions(reviewBoardModule,[
      'requestReviewBoardListToSpring'
    ]),
    loginCheck() {
        const userInfo = localStorage.getItem('userInfo');
        if(userInfo != null) {
          this.$router.push({ name: 'ReviewBoardRegisterPage' })
        } else {
          alert('로그인 후 글을 작성할 수 있습니다.')
          this.$router.push({ name: 'SignInPage' })
        }
      }
  },
}
</script>

<style>

</style>
