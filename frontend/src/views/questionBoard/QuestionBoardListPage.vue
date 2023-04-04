<template>
    <v-container>
      <div class="EULJIRO mt-5 mb-5 text-center">
        <h1>Q&A 게시판 <v-icon>mdi-forum</v-icon></h1>
      </div>
      <question-board-list-form :questionBoards="questionBoards"/>
      <div class="text-right">
        <v-btn v-if="this.$store.state.isAuthenticated" class="mb-10 me-10 brown darken-2 white--text" :to="{ name: 'QuestionBoardRegisterPage' }">
          게시물 작성
        </v-btn>
      </div>
    </v-container>
</template>



<script>

import QuestionBoardListForm from '@/components/questionBoard/QuestionBoardListForm.vue';
import { mapActions, mapState } from 'vuex'
export default {
    name: "QuestionBoardListPage",
    components : { QuestionBoardListForm },

    computed: {
      ...mapState([
        'questionBoards'
      ]),
    },
      mounted () {
        this.requestQuestionBoardListToSpring()
  },
    methods: {
        ...mapActions([
         'requestQuestionBoardListToSpring',

      ]),
      loginCheck () {
          const userInfo = localStorage.getItem('userInfo');
          if(userInfo == null) {
              alter("로그인이 필요 합니다");
              this.$router.push({name: 'SignInPage'})
          } else {
              this.$router.push({ name: 'QuestionBoardRegisterPage'})
          }
      },
   },
    }
</script>