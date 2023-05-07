<template>
    <v-container>
      <div style="margin:0 150px;">
        <div class="NanumGothic mt-10">
          <h2>Q&A 게시판 <v-icon>mdi-bulletin-board</v-icon></h2>
        </div>
          <!-- <search-bar-form class="mb-2" style="float: right;" v-model="searchText" @search="onSearch" /> -->
          <!-- <div v-if="searchBoards.length === 0"> -->
          <question-board-list-form :questionBoards="questionBoards" @check-secret="checkSecret"/>
          <!-- </div>
          <div v-else>
            <question-board-search-result-form :searchBoards="searchBoards" />
          </div> -->
          <div class="text-right">
            <v-btn v-if="this.$store.state.memberModule.isAuthenticated" class="mb-5 me-6 brown darken-2 white--text" @click="loginCheck">
              게시물 작성
          </v-btn>
        </div>
      </div>
    </v-container>
</template>



<script>

import QuestionBoardListForm from '@/components/questionBoard/QuestionBoardListForm.vue';
// import SearchBarForm from '@/components/searchBoard/SearchBarForm.vue'
// import QuestionBoardSearchResultForm from '@/components/questionBoard/QuestionBoardSearchResultForm.vue'
import { mapActions, mapState } from 'vuex'
const questionBoardModule= 'questionBoardModule'

export default {
    name: "QuestionBoardListPage",
    data () {
      return {
        searchText: '',
      }
    },
    components : {
      QuestionBoardListForm,
      // SearchBarForm,
      // QuestionBoardSearchResultForm,
     },

    computed: {
      ...mapState(questionBoardModule,[
        'questionBoards',
        'searchBoards',
      ]),
    },
      mounted () {
        this.requestQuestionBoardListToSpring()
        this.requestSearchBoardToSpring()
  },
      methods: {
        ...mapActions(questionBoardModule,[
         'requestQuestionBoardListToSpring',
         'requestSearchBoardToSpring'
      ]),

      loginCheck () {
          const userInfo = localStorage.getItem('userInfo');
          if(userInfo == null) {
              alert("로그인이 필요 합니다");
              this.$router.push({name: 'SignInPage'})
          } else {
              this.$router.push({ name: 'QuestionBoardRegisterPage'})
          }
      },
      checkSecret(index, questionBoard) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (questionBoard.secret === false && userInfo) {
          this.$router.push({
            name: 'QuestionBoardReadPage',
            params: { boardId: questionBoard.boardId.toString() },
          });
        } else if (userInfo) {
          const loginId = userInfo.id;
          const memberId = this.$store.state.questionBoardModule.questionBoards[index].memberId;
          const authorityName = userInfo.authorityName;

          if (loginId === memberId || authorityName === 'MANAGER') {
            this.$router.push({
              name: 'QuestionBoardReadPage',
              params: { boardId: questionBoard.boardId.toString() },
            });
          } else {
            alert('작성자만 확인 가능한 게시물 입니다');
          }
        } else {
          if (confirm('글을 확인하려면 로그인이 필요합니다. 로그인 하시겠습니까?')) {
            this.$router.push({
              name: 'SignInPage',
            });
          }
        }
      },
      async onSearch(searchText) {
        console.log('searchText 내용 :' + searchText)
        if(searchText !== '') {
          await this.requestSearchBoardToSpring(searchText)
      }
    },
    }
  }

</script>