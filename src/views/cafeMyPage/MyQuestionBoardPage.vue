<template>
    <v-container>
      <div class="EULJIRO mt-5 mb-5 text-center">
        <h1>내가 쓴 게시물 <v-icon>mdi-bulletin-board</v-icon></h1>
    </div>
        <my-question-board-form :myQuestionBoards="myQuestionBoards"/>
    </v-container>
  </template>

  <script>

  import MyQuestionBoardForm from '@/components/cafeMyPage/MyQuestionBoardForm.vue'
  import { mapActions, mapState } from 'vuex'
  const myPageModule ='myPageModule'

  export default {
    components: { MyQuestionBoardForm },
    name: "MyQuestionBoardPage",
    computed: {
      ...mapState(myPageModule,[
        'myQuestionBoards'
      ]),
    },
    mounted () {
      const memberId = JSON.parse(localStorage.getItem('userInfo')).id
      console.log('memberId : ' + memberId)
      this.requestMyQuestionBoardListToSpring(memberId)
    },
    methods: {
      ...mapActions(myPageModule,[
        'requestMyQuestionBoardListToSpring'
      ]),
    },
  }
  </script>

  <style>
  </style>