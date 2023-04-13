<template>
    <v-container>
      <div class="EULJIRO mt-5 mb-5 text-center">
        <h1>내가 쓴 게시물 <v-icon>mdi-bulletin-board</v-icon></h1>
    </div>
        <my-free-board-form :myFreeBoards="myFreeBoards"/>
    </v-container>
  </template>

  <script>

  import MyFreeBoardForm from '@/components/cafeMyPage/MyFreeBoardForm.vue'
  import { mapActions, mapState } from 'vuex'
  const myPageModule = 'myPageModule'

  export default {
    components: { MyFreeBoardForm },
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