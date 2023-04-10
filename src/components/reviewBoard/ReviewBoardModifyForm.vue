<template>
    <form @submit.prevent="onSubmit" style="display: flex; justify-content: center;">
        <table>
          <tr>
            <td>
                <v-text-field label="카페를 선택하세요" v-model="cafeName" disabled />
            </td>
          </tr>
          <tr>
            <td>
              <v-text-field label="제목" type="text" v-model="title" required />
            </td>
          </tr>
          <tr>
            <td>
              <v-text-field label="작성자" type="text" v-model="writer" disabled/>
            </td>
          </tr>
          <tr>
            <td>
              <v-textarea label="내용" cols="50" rows="10" v-model="content" required/>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;">
                <v-rating
                    v-model="rating"
                    bg-color="orange-lighten-1"
                    color="blue"
                    required />
            </td>
          </tr>
          <tr>
            <td style="text-align: center;">
              <v-btn class="me-2 brown darken-2 white--text" :to="{ name: 'ReviewBoardReadPage',
                    params: { reviewBoardId: reviewBoard.reviewBoardId.toString() }}">
                <h4>취소</h4>
              </v-btn>
              <v-btn class="brown darken-2 white--text" type="submit">
                <h4>등록</h4>
              </v-btn>
            </td>
          </tr>
        </table>
      </form>
  </template>
  
  <script>
  export default {
      name: "ReviewBoardModifyForm",
      props: {
          reviewBoard: {
              type: Object,
              required: true,
          }
      },
      data () {
          return {
            cafeName: '',
            title: '',
            writer: JSON.parse(localStorage.getItem('userInfo')).nickName,
            content: '',
            memberId: JSON.parse(localStorage.getItem('userInfo')).id,
            rating: 3,
            }
      },
      created () {
          this.cafeName = this.reviewBoard.cafeName
          this.title = this.reviewBoard.title
          this.writer = this.reviewBoard.writer
          this.content = this.reviewBoard.content
          this.memberId = this.reviewBoard.memberId
          this.rating = this.reviewBoard.rating
      },
      methods: {
          onSubmit () {
              const { title, content, rating } = this
              this.$emit('submit', { title, content, rating })
          }
      }
  }
  </script>
  
  <style>
  </style>