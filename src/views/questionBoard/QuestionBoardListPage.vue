<template>
    <v-container>
      <div class="EULJIRO mt-5 mb-5 text-center">
        <h1>Q&A 게시판 <v-icon>mdi-bulletin-board</v-icon></h1>
      </div>
        <search-bar-form class="mb-2 me-7" style="float: right;" v-model="searchText" @search="onSearch" />
        <div v-if="searchBoards.length === 0">
        <question-board-list-form :questionBoards="questionBoards" @check-secret="checkSecret"/>
        </div>
        <div v-else>
          <question-board-search-result-form :searchBoards="searchBoards" />
        </div>
        <div class="text-right">
          <v-btn v-if="this.$store.state.memberModule.isAuthenticated" class="mb-5 me-6 brown darken-2 white--text" @click="loginCheck">
            게시물 작성
        </v-btn>
      </div>
    </v-container>
</template>



<script>

import QuestionBoardListForm from '@/components/questionBoard/QuestionBoardListForm.vue';
import SearchBarForm from '@/components/searchBoard/SearchBarForm.vue'
import QuestionBoardSearchResultForm from '@/components/questionBoard/QuestionBoardSearchResultForm.vue'
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
      SearchBarForm,
      QuestionBoardSearchResultForm,
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
      checkSecret (index, questionBoard) {

        if(JSON.parse(localStorage.getItem('userInfo'))){
          const loginId = JSON.parse(localStorage.getItem('userInfo')).id
          const memberId = this.$store.state.questionBoardModule.questionBoards[index].memberId
          const authorityName = JSON.parse(localStorage.getItem('userInfo')).authorityName

            if(loginId === memberId || authorityName === 'MANAGER') {
              this.$router.push({
                name: 'QuestionBoardReadPage',
                params: { boardId : questionBoard.boardId.toString()}
              })
            } else {
              alert('작성자만 확인 가능한 게시물 입니다')
            }
          }

            if(!JSON.parse(localStorage.getItem('userInfo'))) {
              if(confirm('글을 확인하려면 로그인이 필요합니다. 로그인 하시겠습니까?')) {
                this.$router.push({
                  name: 'SignInPage'
                })
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