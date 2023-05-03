<template>
  <div class="d-flex">
    <my-page-side-bar-form />
    <v-container class="ms-16 me-16">
      <div class="NanumGothic mt-10 mb-4">
          <h2>내가 쓴 리뷰 <v-icon>mdi-camera</v-icon></h2>
      </div>
      <review-board-list-form class="mt-5" :reviewBoards="myReviewBoards"/>
      <!-- <my-review-board-form class="mt-5" :myReviewBoards="myReviewBoards"/> -->
    </v-container>
  </div>
  </template>

  <script>
  // import MyReviewBoardForm from '@/components/memberMyPage/MyReviewBoardForm.vue'
  import ReviewBoardListForm from '@/components/reviewBoard/ReviewBoardListForm.vue'
  import MyPageSideBarForm from '@/components/myPage/MyPageSideBarForm.vue'
  import { mapActions, mapState } from 'vuex'
  const myPageModule = 'myPageModule'

  export default {
    components: {
      MyPageSideBarForm,
      ReviewBoardListForm
    },
    name: "MyReviewBoardPage",
    computed: {
      ...mapState(myPageModule,[
        'myReviewBoards'
      ]),
    },
    mounted () {
      const memberId = JSON.parse(localStorage.getItem('userInfo')).id
      console.log('memberId : ' + memberId)
      this.requestMyReviewBoardListToSpring(memberId)
    },
    methods: {
      ...mapActions(myPageModule,[
        'requestMyReviewBoardListToSpring'
      ]),
    },
  }
  </script>

  <style>

  </style>
