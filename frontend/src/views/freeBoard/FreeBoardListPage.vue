<template>
    <v-container>
      <div class="EULJIRO mt-5 mb-5 text-center">
        <h1>자유 게시판 <v-icon>mdi-bulletin-board</v-icon></h1>
    </div>
        <free-board-list-form :freeBoards="freeBoards"/>
        <div class="text-right">
          <v-btn v-if="this.$store.state.isAuthenticated" class="mb-5 me-6 brown darken-2 white--text" @click="loginCheck">
            게시물 작성
        </v-btn>
        </div>
    </v-container>
  </template>
  
  <script>

  import FreeBoardListForm from '@/components/freeBoard/FreeBoardListForm.vue'
  import { mapActions, mapState } from 'vuex'

  export default {
    components: { FreeBoardListForm },
    name: "FreeBoardListPage",
    computed: {
      ...mapState([
        'freeBoards'
      ]),
    },
    mounted () {
      this.requestFreeBoardListToSpring()
    },
    methods: {
      ...mapActions([
        'requestFreeBoardListToSpring'
      ]),
      loginCheck() {
        const userInfo = localStorage.getItem('userInfo');
        if(userInfo != null) {
          this.$router.push({ name: 'FreeBoardRegisterPage' })
        } else {
          alert('로그인 후 글을 작성할 수 있습니다.')
          this.$router.push({ name: 'SignInPage' })
        }
      }
    }
  }
  </script>
  
  <style>
  </style>