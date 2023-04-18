<template>
  <div style="margin-left: 100px; margin-right: 100px;">
    <div class="mt-5 mb-5" style="border: 1px solid #ccc; min-height: 700px">
      <div style="margin: 20px">
        <div style="color: #00C73C;">
          [{{ questionBoard.questionType }}]
        </div>
        <div>
          <span class="HANNA">
            <h1>{{ questionBoard.title }}</h1> <h4 class="text-right">조회수:{{ questionBoard.viewCnt }}</h4>
          </span>
        </div>
        <div>
          <span>{{ questionBoard.writer }}</span>
        </div>
        <div>
          <span v-if="questionBoard.regDate" style="color: gray; font-size: 13px;">{{ questionBoard.regDate.slice(0, 10) }} {{ questionBoard.regDate.slice(11, 16) }}</span>
          <span style="float: right;">
            <v-btn v-if="loginCheck()" @click="onModify" icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn v-if="loginCheck()" @click="onDelete" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </span>
        </div>
        <v-divider class="mt-3 mb-3"></v-divider>
        <div v-html="compiledMarkdown"></div>
      </div>
    </div>
    <div>
      <v-btn class="brown darken-2 white--text mb-5" :to="{ name: 'FreeBoardListPage' }" style="float: right;">
        목록
      </v-btn>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import { marked } from 'marked'
const questionBoardModule = 'questionBoardModule'

export default {
  name: 'QuestionBoardReadForm',
  props: {
    questionBoard: {
      type : Object,
      required: true,
    }
  },
  methods: {
        ...mapActions(questionBoardModule,[
            'requestQuestionBoardDeleteToSpring',
        ]),
        loginCheck() {
            if(JSON.parse(localStorage.getItem('userInfo'))) {
              const loginId = JSON.parse(localStorage.getItem('userInfo')).id
              const memberId = this.questionBoard.memberId
              const authorityName = JSON.parse(localStorage.getItem('userInfo')).authorityName

              if(loginId === memberId  || authorityName === "MANAGER") {
                return true
              } else {
                return false
              }
            }

            if(!JSON.parse(localStorage.getItem('userInfo'))) {
              return false
            }
          },
          async onDelete () {
            if(confirm('정말 삭제하시겠습니까?')) {
                //No 버튼을 누르면 페이지를 이동하지않고 그대로 보여줌
                await this.requestQuestionBoardDeleteToSpring(this.questionBoard.boardId)
                await this.$router.push({ name: 'QuestionBoardListPage' })
            }
          },
          async onModify () {
            await this.$router.push({ name: 'QuestionBoardModifyPage', params: this.questionBoard.boardId  })
          }
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.questionBoard.content || '');
    }
  }
}
</script>