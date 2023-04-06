<template>
    <v-container>
      <div class="EULJIRO mt-5 mb-5 text-center">
        <h1>Q&A 게시판 <v-icon>mdi-bulletin-board</v-icon></h1>
      </div>
        <search-bar-form class="mb-2 me-7" style="float: right;" v-model="searchText" @search="onSearch" />
        <div v-if="searchBoards.length === 0">
        <question-board-list-form :questionBoards="questionBoards"/>
        </div>
        <div v-else>
          <search-result-form :searchBoards="searchBoards" />
        </div>
        <div class="text-right">
          <v-btn v-if="this.$store.state.isAuthenticated" class="mb-5 me-6 brown darken-2 white--text" @click="loginCheck">
            게시물 작성
        </v-btn>
      </div>
    </v-container>
</template>



<script>

import QuestionBoardListForm from '@/components/questionBoard/QuestionBoardListForm.vue';
import SearchBarForm from '@/components/searchBoard/SearchBarForm.vue'
import SearchResultForm from '@/components/searchBoard/SearchResultForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
    name: "QuestionBoardListPage",
    data () {
      return {
        searchText: '',
      }
    },
    components : {
      QuestionBoardListForm,
      SearchBarForm,
      SearchResultForm,
     },

    computed: {
      ...mapState([
        'questionBoards', 'searchBoards'
      ]),
    },
      mounted () {
        this.requestQuestionBoardListToSpring()
        this.requestSearchBoardToSpring()
  },
    methods: {
        ...mapActions([
         'requestQuestionBoardListToSpring',
         'requestSearchBoardToSpring'

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
      onSearch(searchText) {
        console.log('searchText 내용 :' + searchText)
        if(searchText !== '') {
          this.requestSearchBoardToSpring(searchText)
      }
    }
  }
}

</script>