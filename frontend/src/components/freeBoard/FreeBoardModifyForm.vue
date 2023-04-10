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
          }
      },
      created () {
          this.title = this.freeBoard.title
          this.writer = this.freeBoard.writer
          this.content = this.freeBoard.content
      },
      methods: {
          onSubmit () {
              const { title, content, writer } = this
              this.$emit('submit', { title, content, writer })
          }
      },
      mounted() {
        this.editor = new Editor({
          el: document.querySelector('#editor'),
          height: '500px',
          initialEditType: 'wysiwyg',
          previewStyle: 'vertical',
          placeholder: '내용을 입력하세요.',
          initialValue: this.content,
        });
        this.editor.on('change', () => {
          this.content = this.editor.getMarkdown();
        });
      }
  }
  </script>
  
  <style>
  </style>