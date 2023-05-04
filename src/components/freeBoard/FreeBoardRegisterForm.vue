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
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'

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
              awsBucketName: 'vue-s3-test-fourman',
              awsBucketRegion: 'ap-northeast-2',
              awsIdentityPoolId: "ap-northeast-2:ce9c61fa-af5d-4ed1-8e3d-9b8d460ee927",
              s3: null,
          }
      },
      methods: {
          // AWS s3 사용을 위한 주석 처리  
          // onSubmit () {
          //   let formData = new FormData()
          //   let freeBoardInfo = {
          //       title: this.title,
          //       writer: this.writer,
          //       content: this.content,
          //       memberId: this.memberId,
          //   }

          //   const editor = document.getElementById('editor'); // HTML 요소 가져오기
          //   const html = editor.innerHTML;

          //   const regex = /data:image\/.*?;base64,([^\"]+)/g; // Base64 코드 추출을 위한 정규표현식
          //   const matches = html.match(regex);

          //   if(matches != null) {
          //     matches.forEach((match, index) => {
          //       const base64Data = match.split(',')[1]; // Base64 문자열 추출
          //       const blob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], { type: 'image/png' }); // Blob 생성
          //       const file = new File([blob], `image_${index}.png`, { type: 'image/png' }); // File 객체 생성
          //       formData.append('fileList', file); // Form 데이터에 File 객체 추가
          //     });
          //   }
          //   formData.append(
          //     "freeBoardInfo",
          //     new Blob([JSON.stringify(freeBoardInfo)], { type: "application/json" })
          //   )
            
          //   this.$emit('submit', formData)
          // },
          async onSubmit () {
            let formData = new FormData()
            let freeBoardInfo = {
                title: this.title,
                writer: this.writer,
                content: this.content,
                memberId: this.memberId,
            }

            const editor = document.getElementById('editor'); // HTML 요소 가져오기
            const html = editor.innerHTML;

            const regex = /data:image\/.*?;base64,([^\"]+)/g; // Base64 코드 추출을 위한 정규표현식
            const matches = html.match(regex);

            const uploadedFileNames = [];

            if(matches != null) {
              for (const match of matches) {
                const base64Data = match.split(',')[1]; // Base64 문자열 추출
                const blob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], { type: 'image/png' }); // Blob 생성
                const file = new File([blob], `image_${uploadedFileNames.length}.png`, {type: "image/png",}); // File 객체 생성

                const uploadedFileName = await this.uploadAwsS3(file);
                uploadedFileNames.push(uploadedFileName);
              }
            }

            formData.append(
              "ImageFileNameList",
              new Blob([JSON.stringify(uploadedFileNames)], { type: "application/json" })
            )

            formData.append(
              "freeBoardInfo",
              new Blob([JSON.stringify(freeBoardInfo)], { type: "application/json" })
            )
            
            this.$emit('submit', formData)
          },
            awsS3Config () {
              AWS.config.update({
                  region: this.awsBucketRegion,
                  credentials: new AWS.CognitoIdentityCredentials({
                      IdentityPoolId: this.awsIdentityPoolId
                  })
              })

              this.s3 = new AWS.S3({
                  apiVersion: '2006-03-01',
                  params: {
                      Bucket: this.awsBucketName
                  }
              })
            },
            async uploadAwsS3(file) {
              this.awsS3Config()

              const fileExtension = file.name.split('.').pop()
              const fileName = `freeBoard/${uuidv4()}.${fileExtension}`

              return new Promise((resolve, reject) => {
                  this.s3.upload({
                      Key: fileName,
                      Body: file,
                      ACL: 'public-read',
                  }, (err, data) => {
                      if (err) {
                          console.log(err)
                          reject(err.message)
                      } else {
                          resolve(fileName)
                      }
                  })
              })
            },

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