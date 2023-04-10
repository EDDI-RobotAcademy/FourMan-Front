<template>
<v-container>
    <question-board-register-form @submit="onSubmit" />
</v-container>
</template>

<script>

import QuestionBoardRegisterForm from '@/components/questionBoard/QuestionBoardRegisterForm.vue';
import { mapActions } from 'vuex'


export default {
    name: 'QuestionBoardRegisterPage',
    components: {
        QuestionBoardRegisterForm
    },

    methods: {
        ...mapActions ([
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