<template>
  <div style="margin-left: 100px; margin-right: 100px;">
    <div class="mt-5 mb-5" style="border: 1px solid #ccc; min-height: 700px">
      <div style="margin: 20px">
        <div>
          <span class="HANNA">
            <h1>{{ freeBoard.title }}</h1> <h4 class="text-right">조회수: {{ freeBoard.viewCnt }}</h4>
          </span>
        </div>
        <div>
          <span>{{ freeBoard.writer }}</span>
        </div>
        <div>
          <span v-if="freeBoard.regDate" style="color: gray; font-size: 13px;">{{ freeBoard.regDate.slice(0, 10) }} {{ freeBoard.regDate.slice(11, 16) }}</span>
          <span style="float: right;">
            <v-btn v-if="loginCheck()" @click="onModify" icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn v-if="loginCheck()" @click="onDelete" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </span>
        </div>
        <v-divider class="mt-3 mb-3"></v-divider>
        <div class="ms-4 mt-10 mb-10" v-if="freeBoardImages.length != 0">
          <!-- AWS s3 사용을 위한 주석 처리 -->
          <!-- <img v-for="(imagePath, idx) in freeBoardImages" :key="idx" :src="require(`@/assets/freeBoardImages/${imagePath.freeBoardImageResourcePath}`)" :style="{ maxWidth: '600px' }"> -->
          <img v-for="(imagePath, idx) in freeBoardImages" :key="idx" :src="`https://vue-s3-test-fourman.s3.ap-northeast-2.amazonaws.com/${imagePath.freeBoardImageResourcePath}`" :style="{ maxWidth: '600px' }">
        </div>
        <div v-html="compiledMarkdown"></div>
      </div>
    </div>
    <div class="d-flex justify-center align-center">
      <!-- 눌렀을때 -->
      <v-btn v-if="this.$store.state.memberModule.isAuthenticated && freeBoard.incRecommendationStatus"
              class="primary white--text mb-1 mx-2"
              @click="incRecommendation(freeBoard.boardId)">
        <v-icon size="20" left>mdi-thumb-up</v-icon> {{ freeBoard.recommendation }}
      </v-btn>
       <!-- 안 눌렀을때 -->
       <v-btn v-else-if="this.$store.state.memberModule.isAuthenticated"
              class="mb-1 mx-2 border-blue"
              @click="incRecommendation(freeBoard.boardId)">
        <v-icon size="20" left>mdi-thumb-up</v-icon> {{ freeBoard.recommendation }}
      </v-btn>
      <!-- 비로그인일때 -->
      <v-btn v-else-if="this.$store.state.memberModule.isAuthenticated===false"
              class="mb-1 mx-2 border-blue"
              @click="goLogin()">
        <v-icon size="20" left>mdi-thumb-up</v-icon> {{ freeBoard.recommendation }}
      </v-btn>
      <!-- 눌렀을때 -->
        <v-btn v-if="this.$store.state.memberModule.isAuthenticated && freeBoard.decRecommendationStatus"
          class="error white--text mb-1 mx-2"
          @click="decRecommendation(freeBoard.boardId)">
          <v-icon size="20" left>mdi-thumb-down</v-icon> {{ freeBoard.unRecommendation }}
        </v-btn>
        <!-- 안 눌렀을때 -->
        <v-btn v-else-if="this.$store.state.memberModule.isAuthenticated"
          class="mb-1 mx-2 border-red"
          @click="decRecommendation(freeBoard.boardId)">
          <v-icon size="20" left>mdi-thumb-down</v-icon> {{ freeBoard.unRecommendation }}
        </v-btn>
        <!-- 비로그인 일때 -->
        <v-btn v-else-if="this.$store.state.memberModule.isAuthenticated===false"
          class="mb-1 mx-2 border-red"
          @click="goLogin()">
          <v-icon size="20" left>mdi-thumb-down</v-icon> {{ freeBoard.unRecommendation }}
        </v-btn>
    </div>
    <div>
      <v-btn class="brown darken-2 white--text mb-5" :to="{ name: 'FreeBoardListPage' }" style="float: right;">
        목록
      </v-btn>
    </div>
  </div>
</template>

<script>
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'

import { mapActions } from 'vuex'
import { marked } from 'marked'
const freeBoardModule= 'freeBoardModule'


  export default {
      name: "FreeBoardReadForm",
      data() {
        return {
          awsBucketName: 'vue-s3-test-fourman',
          awsBucketRegion: 'ap-northeast-2',
          awsIdentityPoolId: "ap-northeast-2:ce9c61fa-af5d-4ed1-8e3d-9b8d460ee927",
          s3: null,
        }
      },
      props: {
          freeBoard: {
              type: Object,
              required: true,
          },
          freeBoardImages: {
              type: Array,
          },
      },
      methods: {
        ...mapActions(freeBoardModule,[
            'requestDeleteFreeBoardToSpring',
            'requestFreeBoardIncRecommendationToSpring',
            'requestFreeBoardDecRecommendationToSpring',
        ]),
        loginCheck() {
            if(JSON.parse(localStorage.getItem('userInfo'))) {
              const loginId = JSON.parse(localStorage.getItem('userInfo')).id
              const memberId = this.freeBoard.memberId
              const authorityName = JSON.parse(localStorage.getItem('userInfo')).authorityName

              if(loginId === memberId  || authorityName === "MANAGER") {
                return true
              } else {
                return false
              }
            }

            if(!JSON.parse(localStorage.getItem('userInfo'))) {
              return false
            }
          },
          goLogin(){
            if(confirm('로그인이 필요한 서비스 입니다. 로그인 하시겠습니까?')) {
              this.router.push({
                name: 'SignInPage'
              })
            }
          },
          // AWS s3 사용을 위한 주석 처리
          // async onDelete () {

          //   await this.requestDeleteFreeBoardToSpring(this.freeBoard.boardId)
          //   await this.$router.push({ name: 'FreeBoardListPage' })
          // },

          async onDelete () {

            if (this.freeBoardImages.length > 0) {
            for (const imagePath of this.freeBoardImages) {
              await this.deleteImageFromS3(imagePath.freeBoardImageResourcePath);
            }
          }

            await this.requestDeleteFreeBoardToSpring(this.freeBoard.boardId)
            await this.$router.push({ name: 'FreeBoardListPage' })
          },
          async onModify () {
            await this.$router.push({ name: 'FreeBoardModifyPage', params: this.freeBoard.boardId  })
          },
          async incRecommendation (boardId) {
            const memberId = JSON.parse(localStorage.getItem('userInfo')).id
            console.log('추천 check :' +boardId +'id 체크 : ' + memberId)
            await this.requestFreeBoardIncRecommendationToSpring({boardId, memberId})
            await this.$router.go((this.$router.currentRoute))
          },
          async decRecommendation(boardId) {
            const memberId = JSON.parse(localStorage.getItem('userInfo')).id
            console.log('추천 check :' +boardId +'id 체크 : ' + memberId)
            await this.requestFreeBoardDecRecommendationToSpring({boardId, memberId})
            await this.$router.go((this.$router.currentRoute))
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
          async deleteImageFromS3(imagePath) {
            try {

                this.awsS3Config()

                // 삭제할 객체의 키를 생성
                const objectKey = imagePath;

                // 객체 삭제
                const deleteParams = {
                Bucket: this.awsBucketName,
                Key: objectKey
                };

                await this.s3.deleteObject(deleteParams).promise();

                console.log("이미지가 S3에서 삭제되었습니다.");
            } catch (error) {
                console.error("S3에서 이미지를 삭제하는 데 실패했습니다.", error);
            }
          },
      },
      computed: {
        compiledMarkdown: function () {
          return marked(this.freeBoard.content || '');
        }
      },
  }
</script>

 <style scoped>
.border-blue {
  border: 2px solid blue;
}
.border-red {
  border: 2px solid red;
}
</style>