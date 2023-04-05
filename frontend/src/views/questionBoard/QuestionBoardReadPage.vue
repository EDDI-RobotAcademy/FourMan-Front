<template>
    <v-container>
        <div align="center">
            <question-board-read-form v-if="questionBoard" :questionBoard="questionBoard" />
            <p v-else> 로딩중...</p>
            <v-btn v-if="loginCheck()" class="brown darken-2 white--text me-2" :to="{ name: 'QuestionBoardModifyPage', params: {boardId} }">
                <h4>수정</h4>
              </v-btn>
            <v-btn v-if="loginCheck()" class="me-2 brown darken-2 white--text" @click="showConfirm">
                <h4>삭제</h4>
            </v-btn>
            <v-btn class="brown darken-2 white--text" :to="{ name: 'QuestionBoardListPage' }">
                돌아가기
            </v-btn>
        </div>
        <v-divider></v-divider>
        <question-board-comment-list-form
            :comments="comments"
            :dialog="dialog"/>
        <!-- 댓글 등록 form -->
        <v-divider></v-divider>
        <div align="center">
            <question-board-comment-form @submit="onSubmitComment"></question-board-comment-form>
        </div>
    </v-container>
</template>


<script>

import QuestionBoardReadForm from '@/components/questionBoard/QuestionBoardReadForm.vue';
import QuestionBoardCommentForm from '@/components/questionBoard/comment/QuestionBoardCommentForm.vue'
import QuestionBoardCommentListForm from '@/components/questionBoard/comment/QuestionBoardCommentListForm.vue';
import {mapActions, mapState} from 'vuex'

export default {
    name: "QuestionBoardReadPage",
    data () {
        return {
            dialog : false,
        }
    },
    components: {
        QuestionBoardReadForm,
        QuestionBoardCommentForm,
        QuestionBoardCommentListForm,
    },

    props: {
        boardId: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState(['questionBoard','comments']),
},
    methods: {
        ...mapActions([
            'requestQuestionBoardToSpring',
            'requestQuestionBoardDeleteToSpring',
            'requestQuestionBoardCommentRegisterToSpring',
            'requestQuestionBoardCommentListToSpring',
            'requestQuestionBoardCommentDeleteToSpring',
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
    async showConfirm() {
        if(confirm('정말 삭제하시겠습니까?')) {
            await this.requestQuestionBoardDeleteToSpring(this.boardId)
            await this.$router.push({ name: 'QuestionBoardListPage' })
        }
        //No 버튼을 누르면 페이지를 이동하지않고 그대로 보여줌
    },
    async onSubmitComment(payload) {
        const { comment, commentWriter, memberId} = payload
        const boardId = this.boardId
        console.log("댓글 등록할 boardId:" + boardId +"memberId check" + memberId)
        await this.requestQuestionBoardCommentRegisterToSpring( {comment, boardId, commentWriter, memberId})
        await this.$router.go((this.$router.currentRoute))
    },
},
    created () {
        console.log('boardId : ' + this.boardId)
        this.requestQuestionBoardToSpring(this.boardId)
        this.requestQuestionBoardCommentListToSpring(this.boardId)
       },

}
</script>
