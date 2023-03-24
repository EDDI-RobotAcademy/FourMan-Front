<template>
    <v-container>
        <div align="center">
            <question-board-read-form v-if="questionBoard" :questionBoard="questionBoard" />
            <p v-else> 로딩중...</p>
            <router-link :to="{ name: 'QuestionBoardModifyPage', params: {boardId} }">
                <v-btn> 수정 </v-btn>
            </router-link>
            <router-link :to="{ name: 'QuestionBoardListPage' }">
                <v-btn @click="onDelete"> 삭제 </v-btn>
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
        QuestionBoardReadForm
    },
    props: {
        boardId: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState(['questionBoard'])
    },
    methods: {
        ...mapActions([
            'requestQuestionBoardToSpring',
            'requestQuestionBoardDeleteToSpring'
    ]),
    async onDelete () {
        alert
        await this.requestQuestionBoardDeleteToSpring(this.boardId)
        await this.$router.push({ name: 'QuestionBoardListPage'})
    }
},
    created () {
        console.log('boardId : ' + this.boardId)
        this.requestQuestionBoardToSpring(this.boardId)
    }

}
</script>