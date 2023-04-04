<template>
    <v-container>
        <div align="center">
            <question-board-read-form v-if="questionBoard" :questionBoard="questionBoard" />
            <p v-else> 로딩중...</p>
            <router-link v-if="isAuthor" :to="{ name: 'QuestionBoardModifyPage', params: {boardId} }">
                <v-btn class="brown lighten-1 white--text"> 수정 </v-btn>
            </router-link>
            <router-link v-if="isAuthor" :to="{ name: 'QuestionBoardListPage' }">
                <v-btn @click="showConfirm" class="brown lighten-1 white--text"> 삭제 </v-btn>
            </router-link>
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

        isAuthor() {
            const writer = this.questionBoard.writer;
            const nickName = JSON.parse(localStorage.getItem('userInfo')).nickName
            const authorityName = JSON.parse(localStorage.getItem('userInfo')).authorityName
            return nickName === writer || authorityName === "MANAGER";
            //닉네임과 작성자가 일치하거나 매니저일경우에만 삭제, 수정버튼이 활성화됨
        },
},
    methods: {
        ...mapActions([
            'requestQuestionBoardToSpring',
            'requestQuestionBoardDeleteToSpring',
            'requestQuestionBoardCommentRegisterToSpring',
            'requestQuestionBoardCommentListToSpring',
            'requestQuestionBoardCommentDeleteToSpring',
    ]),
    showConfirm() {
        if(confirm('정말 삭제하시겠습니까?')) {
            this.requestQuestionBoardDeleteToSpring(this.boardId)
        } else {
            this.$router.go((this.$router.currentRoute))
            //No 버튼을 누르면 페이지를 이동하지않고 그대로 보여줌
        }
    },
    async onSubmitComment(payload) {
        const { comment, commentWriter } = payload
        const boardId = this.boardId
        console.log("댓글 등록할 boardId:" + boardId)
        await this.requestQuestionBoardCommentRegisterToSpring( {comment, boardId, commentWriter})
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
