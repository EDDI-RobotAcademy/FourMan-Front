<template>
    <v-container>
        <h2 class="mt-5 mb-5 text-center">자유게시판</h2>
        <free-board-list-form :boards="boards"/>
        <div class="text-right">
          <v-btn class="mt-5 me-3" @click="loginCheck">
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