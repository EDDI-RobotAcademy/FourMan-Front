<template>
<v-container>
    <question-board-register-form @submit="onSubmit" />
</v-container>
</template>

<script>

import QuestionBoardRegisterForm from '@/components/questionBoard/QuestionBoardRegisterForm.vue';
import { mapActions } from 'vuex'
const questionBoardModule= 'questionBoardModule'

export default {
    name: 'QuestionBoardRegisterPage',
    components: {
        QuestionBoardRegisterForm
    },

    methods: {
        ...mapActions (questionBoardModule,[
            'requestCreateQuestionBoardToSpring'
        ]),
        async onSubmit (payload) {
            await this.requestCreateQuestionBoardToSpring(payload)
            await this.$router.push({
                name: 'QuestionBoardListPage',
            })
        }
      }
  }
</script>