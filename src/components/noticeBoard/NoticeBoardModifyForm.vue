a<template>
    <form @submit.prevent="onSubmit" style="display: flex; justify-content: center;">
        <table>
          <tr>
            <td>
              <v-text-field type="text" :value="noticeBoard.notice" readonly />
            </td>
          </tr>
          <tr>
            <td>
              <v-text-field label="제목" type="text" v-model="title" required/>
            </td>
          </tr>
          <tr>
            <td>
              <v-text-field label="작성자" type="text" :value="noticeBoard.writer" readonly/>
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
              <router-link :to="{name: 'NoticeBoardReadPage', params: {boardId: noticeBoard.boardId.toString()} }">
                <v-btn class="me-2 brown lighten-1 white--text">뒤로가기</v-btn>
              </router-link>
            </td>
          </tr>
        </table>
      </form>
    </template>

    <script>
    export default {
        name: "NoticeBoardModifyForm",
        data () {
            return {
                title: '',
                content: '',
            }
        },
        props: {
            noticeBoard: {
                type: Object,
                required: true,
            }
        },
        created () {
            this.title = this.noticeBoard.title
            this.content = this.noticeBoard.content
        },
        methods: {
            onSubmit () {
                const { title, content } = this
                this.$emit('submit', { title, content})
            }
        }
    }
    </script>