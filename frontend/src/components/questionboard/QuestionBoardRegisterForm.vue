<template>
  <form @submit.prevent="onSubmit" style="display: flex; justify-content: center;">
    <table>

      <tr>
        <td>
          <v-select label="질문 유형"
                    :items="['예약 방법', '시설 문의', '문의 사항']" v-model="questionType">
          </v-select>
        </td>
      </tr>
      <tr>
        <td>
          <v-text-field label="제목" type="text" v-model="title"/>
        </td>
      </tr>
      <tr>
        <td>
          <v-text-field label="작성자" type="text" v-model="writer"/>
        </td>
      </tr>
      <tr>
        <td>
          <v-textarea label="내용" cols="50" rows="20" v-model="content"/>
        </td>
      </tr>
      <tr>
        <td style="text-align: center;">
          <router-link :to="{ name: 'QuestionBoardListPage' }">
            <v-btn class="me-2">
              취소
            </v-btn>
          </router-link>
          <v-btn type="submit">등록</v-btn>
        </td>
      </tr>
    </table>
  </form>
</template>

<script>
export default {
    name: "QuestionBoardRegisterForm",
    data () {
        return {
            title: '',
            questionType : '',   //select 내역인 questionType v-model 로 바인딩
            writer: '',
            content: ''
        }
    },
    methods: {
        onSubmit () {
            const { title, questionType, writer, content } = this
            this.$emit('submit', { title, questionType, writer, content })
        }
        // form으로 emit
    }
}
</script>

<style>
</style>