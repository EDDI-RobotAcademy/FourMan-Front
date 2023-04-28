<template>
<v-container>
    <question-board-register-form :parent-board-id="parentBoardId" @submit="onSubmit"/>
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
    data() {
        return {
            parentBoardId: null,
        }
    },
    created() {
    if (this.$route.params.parentBoardId) {
        this.parentBoardId = this.$route.params.parentBoardId;
    }
    },
    mounted() {
    console.log('부모 보드아이디 확인' + this.parentBoardId)
    },
    methods: {
        ...mapActions (questionBoardModule,[
            'requestCreateQuestionBoardToSpring',
            'requestCreateReplyToSpring'
        ]),
        async onSubmit (payload) {
            if(this.parentBoardId) {
                await this.requestCreateReplyToSpring(payload)
            } else {
                await this.requestCreateQuestionBoardToSpring(payload)
            }
                await this.$router.push({
                    name: 'QuestionBoardListPage',
                })
        },
      }
  }
</script>