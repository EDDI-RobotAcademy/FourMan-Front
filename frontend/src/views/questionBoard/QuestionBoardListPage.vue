<template>
    <v-container>
        <h2 class="mt-5 mb-5 text-center">Q&A 게시판</h2>
        <question-board-list-form :questionBoards="questionBoards"/>
        <div class="text-right">
          <v-btn class="mt-5 me-3 brown lighten-1 white--text" @click="loginCheck">
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