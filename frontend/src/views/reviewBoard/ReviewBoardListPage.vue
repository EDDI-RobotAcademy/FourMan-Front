<template>
  <v-container>
    <h2 class="mt-5 mb-5 text-center">리뷰 게시판</h2>
    <review-board-list-form class="mt-5 mb-5" :reviewBoards="reviewBoards"/>
    <v-btn class="mt-5 mb-5 me-5 brown darken-2 white--text" style="float:right;" @click="loginCheck">
      <h4>리뷰 등록</h4>
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
