<template>
    <form @submit.prevent="onSubmit" style="justify-content: center; margin-left: 100px; margin-right: 100px;">
      <div class="mt-10">
        <span class="HANNA" style="font-size: 30px; font-weight: 800;" bold>리뷰 글쓰기</span>
        <span style="float: right;"><v-btn type="submit" class="brown darken-2 white--text">등록</v-btn></span>
      </div>
      <v-divider class="mt-3 mb-3"></v-divider>
      <div style="display: flex;">
        <div class="me-5" style="width: 35%; position: relative; z-index: 9999;">
          <v-text-field v-model="cafeName" disabled />
        </div>
        <div class="mb-5" style="border: 1px solid #ccc; clear: both; width: 100%">
          <input type="text" placeholder="제목을 입력하세요." style="box-sizing: border-box; width: 100%; padding: 10px; outline: none;" v-model="title" required>
        </div>
      </div>
      <div class="text-center mb-2">
        <v-rating
          v-model="rating"
          bg-color="orange-lighten-1"
          color="blue"
          required />
      </div>
      <div class="mb-10">
        <div id="editor" />
        <textarea v-model="content" style="display: none;"/>
      </div>
    </form>
  </template>
<script>

import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style

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
      },
      mounted() {
        this.editor = new Editor({
          el: document.querySelector('#editor'),
          height: '500px',
          initialEditType: 'wysiwyg',
          previewStyle: 'vertical',
          placeholder: '내용을 입력하세요.',
          usageStatistics: false,
          initialValue: this.content
        });
        this.editor.on('change', () => {
          this.content = this.editor.getMarkdown();
        });
      }
  }
  </script>
  
  <style>
  </style>