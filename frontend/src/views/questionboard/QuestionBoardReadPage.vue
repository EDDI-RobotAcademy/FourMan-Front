<template>
    <v-container>
        <div align="center">
            <question-board-read-form v-if="queistonBoard" :questionBoard="questionBoard" />
            <p v-else> 로딩중...</p>
            <router-link :to="{ name: 'QuestionBoardModifyPage' }">
                <v-btn> 수정 </v-btn>
            </router-link>
            <router-link :to="{ name: 'QuestionBoardDeletePage' }">
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
    mounted: {
        ...mapState [('questionBoard')]
    },
    methods: {
        ...mapActions[(
            'requestQuestionBoardToSpring'
        )]
    },
    async onDelete () {
        await this.requestDeleteQuestionBoardToSpring(this.boardId)
        await this.$router.push({ name: 'QuestionBoardListPage'})
    },
    create () {
        this.requestQuestionBoardToSpring(this.boardId)
    }

}
</script>