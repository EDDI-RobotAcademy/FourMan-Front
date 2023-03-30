<template>
    <form @submit.prevent="onSubmit" style="display: flex; justify-content: center;">
        <table>
          <tr>
            <td>
              <v-autocomplete
                label="카페를 선택하세요"
                :items="cafeList"
                v-model="cafeName"
                required />
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
            <td>
                <input label="이미지 등록" type="file" id="files" ref="files" accept="image/*"
                multiple @change="handleFileUpload" />
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
              <v-btn class="me-2 brown darken-2 white--text" :to="{ name: 'ReviewBoardListPage' }">
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
    data() {
      return {
        cafeName: '',
        title: '',
        writer: JSON.parse(localStorage.getItem('userInfo')).nickName,
        content: '',
        files: '',
        memberId: JSON.parse(localStorage.getItem('userInfo')).id,
        rating: 3,
        cafeList: ['스타벅스', '이디야', '할리스', '탐앤탐스'],
      };
    },
    methods: {
        handleFileUpload () {
              this.files = this.$refs.files.files
        },
        onSubmit () {
          let formData = new FormData()
          let reviewBoardInfo = {
            cafeName: this.cafeName,
            title: this.title,
            writer: this.writer,
            content: this.content,
            rating: this.rating,
            memberId: this.memberId,
        }
        // 사진
        for (let idx = 0; idx < this.files.length; idx++) {
          formData.append('fileList', this.files[idx])
        }
        // 글자
        formData.append(
          "reviewBoardInfo",
          new Blob([JSON.stringify(reviewBoardInfo)], { type: "application/json" })
        )
        
        this.$emit('submit', formData)
        },
    },
  };
  </script>
  
  <style>
  </style>