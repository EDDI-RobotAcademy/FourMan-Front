<template>
    <v-container>
        <question-board-modify-form v-if="questionBoard" :questionBoard="questionBoard" @submit="onSubmit" />
        <p v-else> 로딩중 </p>
    </v-container>
</template>



<script>

import QuestionBoardModifyForm from '@/components/questionBoard/QuestionBoardModifyForm.vue'
import {mapActions, mapState} from 'vuex'

export default {
    name: "QuestionBoardModifyPage",
    components: {
        QuestionBoardModifyForm
    },
    props: {
        boardId: {
            type: String,
            required: true,
        }
    },
    created () {
        this.requestQuestionBoardToSpring(this.boardId)
    },
    computed: {
        ...mapState(['questionBoard'])
    },
    methods: {
        ...mapActions([
            'requestQuestionBoardToSpring',
            'requestQuestionBoardModifyToSpring'
        ]),
        async onSubmit (payload) {
              const {title, content } = payload
              const boardId = this.boardId
              
              await this.requestQuestionBoardModifyToSpring({ boardId, title, content })
              await this.$router.push({
                  name: 'QuestionBoardReadPage',
                  params: { boardId: this.boardId }
              })
          }
    },

    }


</script>