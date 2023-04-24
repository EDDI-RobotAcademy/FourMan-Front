<template>
  <div>
    <my-page-side-bar-form />
    <v-container>
      <div class="EULJIRO mt-5 mb-5 text-center">
              <h1>내가 쓴 리뷰 <v-icon>mdi-camera</v-icon></h1>
          </div>
      <my-review-board-form class="mt-5" :myReviewBoards="myReviewBoards"/>
    </v-container>
    </div>
  </template>

  <script>
  import MyReviewBoardForm from '@/components/cafeMyPage/MyReviewBoardForm.vue'
  import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'
  import { mapActions, mapState } from 'vuex'
  const myPageModule = 'myPageModule'

  export default {
    components: {
      MyReviewBoardForm,
      MyPageSideBarForm
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
