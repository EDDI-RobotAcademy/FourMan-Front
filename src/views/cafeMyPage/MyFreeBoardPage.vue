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

  export default {
    components: { MyFreeBoardForm },
    name: "MyFreeBoardPage",
    computed: {
      ...mapState([
        'myFreeBoards'
      ]),
    },
    mounted () {
      this.requestMyFreeBoardListToSpring()
    },
    methods: {
      ...mapActions([
        'requestMyFreeBoardListToSpring'
      ]),    }
  }
  </script>

  <style>
  </style>