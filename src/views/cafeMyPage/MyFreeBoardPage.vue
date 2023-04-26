<template>
  <div class="d-flex">
    <my-page-side-bar-form/>
    <v-container>
      <div class="EULJIRO mt-5 mb-5 text-center">
        <h1>내가 쓴 게시물 <v-icon>mdi-bulletin-board</v-icon></h1>
    </div>
        <my-free-board-form :myFreeBoards="myFreeBoards"/>
    </v-container>
    </div>
  </template>

  <script>

  import MyFreeBoardForm from '@/components/cafeMyPage/MyFreeBoardForm.vue'
  import { mapActions, mapState } from 'vuex'
  import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'

  const myPageModule = 'myPageModule'

  export default {
    components: { MyFreeBoardForm, MyPageSideBarForm },
    name: "MyFreeBoardPage",
    computed: {
      ...mapState(myPageModule,[
        'myFreeBoards'
      ]),
    },
    mounted () {
      const memberId = JSON.parse(localStorage.getItem('userInfo')).id
      console.log('memberId : ' + memberId)
      this.requestMyFreeBoardListToSpring(memberId)
    },
    methods: {
      ...mapActions(myPageModule,[
        'requestMyFreeBoardListToSpring'
      ]),
    },
  }
  </script>

  <style>
  </style>