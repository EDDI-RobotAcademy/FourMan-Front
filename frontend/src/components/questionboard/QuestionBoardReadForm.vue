<template>
    <table>
      <tr>
        <td>
          <v-text-field :value="questionBoard.questionType" readonly/>
        </td>
      </tr>
      <tr>
        <td>
          <v-text-field type="text" :value="questionBoard.title" readonly/>
        </td>
      </tr>
      <tr>
        <td>
          <v-text-field type="text" :value="questionBoard.writer" readonly/>
        </td>
      </tr>
      <tr>
        <td>
          <v-textarea cols="50" rows="20" :value="questionBoard.content" readonly/>
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