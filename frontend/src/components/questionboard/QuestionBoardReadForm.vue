<template>
    <table>
      <h2 class="mt-5 mb-5 text-center">Q&A 게시판</h2>
      <tr>
        <td>
          <v-text-field label="질문 유형" :value="questionBoard.questionType" readonly/>
        </td>
      </tr>
      <tr>
        <td>
          <v-text-field label="제목" type="text" :value="questionBoard.title" readonly/>
        </td>
      </tr>
      <tr>
        <td>
          <v-text-field label="작성자" type="text" :value="questionBoard.writer" readonly/>
        </td>
      </tr>
      <tr>
        <td>
          <v-textarea label="본문" cols="50" rows="20" :value="questionBoard.content" readonly/>
        </td>
      </tr>
    </table>
</template>

<script>
export default {
  name: 'QuestionBoardReadForm',
  props: {
    questionBoard: {
      type : Object,
      required: true,
    }
  }
}
</script>