<template>
<v-container>
    <h2 class="mt-5 mb-5 text-center">Q&A 작성</h2>
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