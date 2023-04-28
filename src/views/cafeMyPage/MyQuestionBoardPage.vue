<template>
  <div class="d-flex">
    <my-page-side-bar-form />
    <v-container class="ms-16 me-16">
      <div class="NanumGothic mt-10 mb-4">
        <h2>내가 쓴 게시물 <v-icon>mdi-bulletin-board</v-icon></h2>
      </div>
        <question-board-list-form :questionBoards="myQuestionBoards" @check-secret="checkSecret"/>
        <!-- <my-question-board-form :myQuestionBoards="myQuestionBoards"/> -->
    </v-container>
    </div>
  </template>

  <script>

  // import MyQuestionBoardForm from '@/components/cafeMyPage/MyQuestionBoardForm.vue'
  import QuestionBoardListForm from '@/components/questionBoard/QuestionBoardListForm.vue';
  import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'
  import { mapActions, mapState } from 'vuex'
  const myPageModule ='myPageModule'
  const questionBoardModule= 'questionBoardModule'

  export default {
    components: {
      MyPageSideBarForm,
      QuestionBoardListForm
     },
    name: "MyQuestionBoardPage",
    computed: {
      ...mapState(myPageModule,[
        'myQuestionBoards',
      ]),
      ...mapState(questionBoardModule,[
        'questionBoards',
      ]),
    },
    mounted () {
      const memberId = JSON.parse(localStorage.getItem('userInfo')).id
      console.log('memberId : ' + memberId)
      this.requestMyQuestionBoardListToSpring(memberId)
      this.requestQuestionBoardListToSpring()
    },
    methods: {
      ...mapActions(myPageModule,[
        'requestMyQuestionBoardListToSpring'
      ]),
      ...mapActions(questionBoardModule,[
         'requestQuestionBoardListToSpring',
      ]),
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
    },
  }
  </script>

  <style>
  </style>