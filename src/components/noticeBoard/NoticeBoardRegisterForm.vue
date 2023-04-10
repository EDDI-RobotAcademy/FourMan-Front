<template>
    <form @submit.prevent="onSubmit" style="display: flex; justify-content: center;">
      <table>

        <tr>
          <td>
            <v-text-field label="공지사항" type="text" v-model="notice" readonly/>
          </td>
        </tr>
        <tr>
          <td>
            <v-text-field label="제목" type="text" v-model="title"/>
          </td>
        </tr>
        <tr>
          <td>
            <v-text-field label="작성자" type="text" v-model="writer" readonly/>
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
              <v-btn class="me-2 brown lighten-1 white--text">
                취소
              </v-btn>
            </router-link>
            <v-btn type="submit" class="brown lighten-1 white--text">등록</v-btn>
          </td>
        </tr>
      </table>
    </form>
  </template>

  <script>
  export default {
      name: "NoticeBoardRegisterForm",
      data () {
          return {
              title: '',
              notice : '공지사항',
              writer: JSON.parse(localStorage.getItem('userInfo')).nickName,
              content: '',
              memberId: JSON.parse(localStorage.getItem('userInfo')).id
          }
      },
      methods: {
          onSubmit () {
              const { title, notice, writer, content, memberId } = this
              this.$emit('submit', { title, notice, writer, content, memberId })
          }
          // form으로 emit
      }
  }
  </script>

  <style>
  </style>