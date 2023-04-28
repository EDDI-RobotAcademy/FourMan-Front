<template>
  <div class="d-flex">
    <my-page-side-bar-form/>
    <v-container class="ms-16 me-16">
      <div class="NanumGothic mt-10 mb-4">
        <h2>내가 쓴 게시물 <v-icon>mdi-bulletin-board</v-icon></h2>
    </div>
      <free-board-list-form
            :freeBoards="myFreeBoards" />
        <!-- <my-free-board-form :myFreeBoards="myFreeBoards"/> -->
    </v-container>
    </div>
  </template>

  <script>

  import FreeBoardListForm from '@/components/freeBoard/FreeBoardListForm.vue'
  // import MyFreeBoardForm from '@/components/cafeMyPage/MyFreeBoardForm.vue'
  import { mapActions, mapState } from 'vuex'
  import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'

  const myPageModule = 'myPageModule'

  export default {
    components: { MyPageSideBarForm, FreeBoardListForm },
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