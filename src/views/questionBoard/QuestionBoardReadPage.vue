<template>
    <v-container>
        <div>
            <question-board-read-form v-if="questionBoard" :questionBoard="questionBoard" />
            <p v-else> 로딩중...</p>
        </div>
        <!-- 댓글 등록 form -->
        <div align="center">
            <question-board-comment-form @submit="onSubmitComment"></question-board-comment-form>
        </div>
        <question-board-comment-list-form
            :comments="comments"
            :dialog="dialog"/>
    </v-container>
</template>


<script>

import QuestionBoardReadForm from '@/components/questionBoard/QuestionBoardReadForm.vue';
import QuestionBoardCommentForm from '@/components/questionBoard/comment/QuestionBoardCommentForm.vue'
import QuestionBoardCommentListForm from '@/components/questionBoard/comment/QuestionBoardCommentListForm.vue';
import {mapActions, mapState} from 'vuex'
const questionBoardModule= 'questionBoardModule'

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
        ...mapState(questionBoardModule,
        ['questionBoard','comments']),
},
    methods: {
        ...mapActions(questionBoardModule,[
            'requestQuestionBoardToSpring',
            'requestQuestionBoardCommentRegisterToSpring',
            'requestQuestionBoardCommentListToSpring',
            'requestQuestionBoardCommentDeleteToSpring',
    ]),
    async onSubmitComment(payload) {
        const { comment, commentWriter, memberId} = payload
        const boardId = this.boardId
        console.log("댓글 등록할 boardId:" + boardId +"memberId check" + memberId)
        console.log('댓글 내용 확인 :' + comment)
        await this.requestQuestionBoardCommentRegisterToSpring( {comment, boardId, commentWriter, memberId})
        await this.$router.go((this.$router.currentRoute))
    },
},
    async created () {
        console.log('boardId : ' + this.boardId)
        await this.requestQuestionBoardToSpring(this.boardId)
        await this.requestQuestionBoardCommentListToSpring(this.boardId)
       },

}
</script>
