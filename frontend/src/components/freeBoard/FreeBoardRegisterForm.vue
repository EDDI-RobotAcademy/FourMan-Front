<template>
    <form @submit.prevent="onSubmit" style="display: flex; justify-content: center;">
      <table>
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
            <router-link :to="{ name: 'FreeBoardListPage' }">
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
      name: "FreeBoardRegisterForm",
      data () {
          return {
              title: '',
              writer: '',
              content: ''
          }
      },
      methods: {
          onSubmit () {
              const { title, writer, content } = this
              this.$emit('submit', { title, writer, content })
          }
      }
  }
  </script>
  
  <style>
  </style>