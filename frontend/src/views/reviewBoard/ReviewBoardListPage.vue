<template>
  <v-container>
    <h2 class="mt-5 mb-5 text-center">리뷰 게시판</h2>
    <review-board-list-form :reviewBoards="reviewBoards"/>
    <v-btn @click="loginCheck">
        리뷰 등록
    </v-btn>
  </v-container>
</template>

<script>
import ReviewBoardListForm from '@/components/reviewBoard/ReviewBoardListForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: { ReviewBoardListForm },
  name: "ReviewBoardListPage",
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