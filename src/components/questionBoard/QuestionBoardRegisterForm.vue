<template>
  <form @submit.prevent="onSubmit" style="justify-content: center; margin-left: 100px; margin-right: 100px;">
    <div class="mt-10">
      <span class="HANNA" style="font-size: 30px; font-weight: 800;" bold>Q&A 글쓰기</span>
      <span style="float: right;"><v-btn type="submit" class="brown darken-2 white--text">등록</v-btn></span>
    </div>
    <v-divider class="mt-3 mb-3"></v-divider>
    <div style="display: flex;">
      <div class="me-5" style="width: 35%; position: relative; z-index: 9999;">
        <v-select label="질문 유형"
            :items="['예약 방법', '시설 문의', '문의 사항']" v-model="questionType">
        </v-select>
      </div>
      <div class="mb-5" style="border: 1px solid #ccc; clear: both; width: 100%">
        <input type="text" placeholder="제목을 입력하세요." style="box-sizing: border-box; width: 100%; padding: 10px; outline: none;" v-model="title" required>
      </div>
    </div>
    <div class="text-right">
        <v-checkbox label="비밀글로 작성" v-model="secret" @click="setSecret"></v-checkbox>
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
    name: "QuestionBoardRegisterForm",
    components: {
      'editor': Editor,
    },
    props:{
      parentBoardId: {
        type: Number,
        default: null,
      }
    },
    data () {
        return {
            title: '',
            questionType : '',   //select 내역인 questionType v-model 로 바인딩
            writer: JSON.parse(localStorage.getItem('userInfo')).nickName,
            content: '',
            memberId: JSON.parse(localStorage.getItem('userInfo')).id,
            secret: false, //비밀글 체크
        }
    },
    methods: {
        onSubmit () {
            const { title, questionType, writer, content, memberId, secret, parentBoardId } = this
            this.$emit('submit', { title, questionType, writer, content, memberId, secret, parentBoardId })
        },
        // form으로 emit
        setSecret () {
          console.log(this.secret)
          if(this.secret) {
            this.title = '비밀글 입니다'
          } else {
            this.title = this.editor.getMarkdown()
          }
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