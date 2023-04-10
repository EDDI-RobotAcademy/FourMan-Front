<template>
    <form @submit.prevent="onSubmit" style="justify-content: center; margin-left: 100px; margin-right: 100px;">
      <div class="mt-10">
        <span class="HANNA" style="font-size: 30px; font-weight: 800;" bold>자유게시판 글쓰기</span>
        <span style="float: right;"><v-btn type="submit" class="brown darken-2 white--text">등록</v-btn></span>
      </div>
      <v-divider class="mt-3 mb-3"></v-divider>
      <div class="mb-5" style="border: 1px solid #ccc; clear: both;">
        <input type="text" placeholder="제목을 입력하세요." style="box-sizing: border-box; width: 100%; padding: 10px; outline: none;" v-model="title" required>
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
      name: "FreeBoardRegisterForm",
      components: {
        'editor': Editor,
      },
      data () {
          return {
              title: '',
              writer: JSON.parse(localStorage.getItem('userInfo')).nickName,
              content: '',
              memberId: JSON.parse(localStorage.getItem('userInfo')).id,
              editor: null,
          }
      },
      methods: {
          onSubmit () {
              const { title, writer, content, memberId } = this
              this.$emit('submit', { title, writer, content, memberId })
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
        });
        this.editor.on('change', () => {
          this.content = this.editor.getMarkdown();
        });
      }
  }
  </script>
  
  <style>
  </style>