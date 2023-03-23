<template>
    <table>
      <tr>
        <td>
          <v-select label="질문 유형"
                    :items="['예약 방법', '시설 문의', '문의 사항']" :value="questionBoard.questionType">
          </v-select>
        </td>
      </tr>
      <tr>
        <td>
          <v-text-field type="text" :value="questionBoard.title"/>
        </td>
      </tr>
      <tr>
        <td>
          <v-text-field type="text" :value="questionBoard.writer"/>
        </td>
      </tr>
      <tr>
        <td>
          <v-textarea cols="50" rows="20" :value="questionBoard.content"/>
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