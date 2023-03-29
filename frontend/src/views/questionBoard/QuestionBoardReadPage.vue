<template>
    <v-container>
        <div align="center">
            <question-board-read-form v-if="questionBoard" :questionBoard="questionBoard" />
            <p v-else> 로딩중...</p>
            <router-link :to="{ name: 'QuestionBoardModifyPage', params: {boardId} }">
                <v-btn> 수정 </v-btn>
            </router-link>
            <router-link :to="{ name: 'QuestionBoardListPage' }">
                <v-btn @click="showConfirm"> 삭제 </v-btn>
            </router-link>
        </div>
    </v-container>
</template>


<script>

import QuestionBoardReadForm from '@/components/questionBoard/QuestionBoardReadForm.vue';
import {mapActions, mapState} from 'vuex'

export default {
    name: "QuestionBoardReadPage",
    components: {
        QuestionBoardReadForm,
    },

    props: {
        boardId: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState(['questionBoard','questionBoardComments'])
    },
    methods: {
        ...mapActions([
            'requestQuestionBoardToSpring',
            'requestQuestionBoardDeleteToSpring',
            'requestQuestionBoardCommentRegisterToSpring'
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
    }
},
    created () {
        console.log('boardId : ' + this.boardId)
        this.requestQuestionBoardToSpring(this.boardId)
ㄴ    }

}
</script>