<template>
<form @submit.prevent="onSubmit" style="display: flex; justify-content: center;">
    <table>
      <tr>
        <td>
          <v-text-field type="text" :value="questionBoard.questionType" readonly />
        </td>
      </tr>
      <tr>
        <td>
          <v-text-field label="제목" type="text" v-model="title" required/>
        </td>
      </tr>
      <tr>
        <td>
          <v-text-field label="작성자" type="text" :value="questionBoard.writer" readonly/>
        </td>
      </tr>
      <tr>
        <td>
          <v-textarea label="내용" cols="50" rows="20" v-model="content" required/>
        </td>
      </tr>
      <tr>
        <td style="text-align: center;">
          <v-btn class="me-2 brown lighten-1 white--text" type="submit">등록</v-btn>
          <router-link :to="{name: 'QuestionBoardReadPage', params: {boardId: questionBoard.boardId.toString()} }">
            <v-btn class="me-2 brown lighten-1 white--text">뒤로가기</v-btn>
          </router-link>
        </td>
      </tr>
    </table>
  </form>
</template>

<script>
export default {
    name: "QuestionBoardModifyForm",
    data () {
        return {
            title: '',
            content: '',
        }
    },
    props: {
        questionBoard: {
            type: Object,
            required: true,
        }
    },
    created () {
        this.title = this.questionBoard.title
        this.content = this.questionBoard.content
    },
    methods: {
        onSubmit () {
            const { title, content } = this
            this.$emit('submit', { title, content})
        }
    }
}
</script>