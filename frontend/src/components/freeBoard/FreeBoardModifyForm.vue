<template>
    <div>
      <form @submit.prevent="onSubmit">
        <table class="mt-5 mb-5">
          <tr>
              <td>
                  <v-text-field label="제목" type="text" v-model="title" required />
              </td>
          </tr>
          <tr>
            <td>
                <v-text-field label="작성자" type="text" :value="freeBoard.writer" disabled />
            </td>
         </tr>
          <tr>
              <td>
                  <v-textarea label="내용" cols="50" rows="15" v-model="content" required />
              </td>
          </tr>
        </table>
  
        <div>
          <v-btn type="submit" variant="primary" class="brown lighten-1 white--text">수정 완료</v-btn>
          <router-link :to="{ name: 'FreeBoardReadPage', params: { boardId: freeBoard.boardId.toString() } }">
            <v-btn class="brown lighten-1 white--text">
                취소
            </v-btn>
          </router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
      name: "FreeBoardModifyForm",
      props: {
          freeBoard: {
              type: Object,
              required: true,
          }
      },
      data () {
          return {
              title: '',
              content: '',
              writer: '',
              regDate: '',
          }
      },
      created () {
          this.title = this.freeBoard.title
          this.writer = this.freeBoard.writer
          this.content = this.freeBoard.content
          this.regDate = this.freeBoard.regDate
      },
      methods: {
          onSubmit () {
              const { title, content, writer } = this
              this.$emit('submit', { title, content, writer })
          }
      }
  }
  </script>
  
  <style>
  </style>