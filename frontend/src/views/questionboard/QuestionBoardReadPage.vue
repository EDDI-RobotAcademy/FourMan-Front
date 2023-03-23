<template>
    <v-container>
        <question-board-read-form :questionBoard="questionBoard" />
        <router-link :to="{ name: 'QuestionBoardModifyPage' }">
            <v-btn> 수정 </v-btn>
        </router-link>
        <router-link :to="{ name: 'QuestionBoardDeletePage' }">
            <v-btn @click="onDelete"> 삭제 </v-btn>
        </router-link>
    </v-container>
</template>


<script>

import QuestionBoardReadForm from '@/components/questionBoard/QuestionBoardReadForm.vue';

export default {
    name: "QuestionBoardReadPage",
    components: {
        QuestionBoardReadForm
    },
    props: {
        questionBoard: {
            type: String,
            required: true,
        }
    },

}
</script>