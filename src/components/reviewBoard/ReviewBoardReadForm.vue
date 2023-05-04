<template>
  <div class="mt-10 mb-10" style="margin-left: 100px; margin-right: 100px;">
    <v-card
      class="mx-auto"
      max-width="600"
    >
      <v-toolbar
        elevation="0">
        <v-toolbar-title class="NanumGothic">
          <h4>[{{ reviewBoard.cafeName }}] {{ reviewBoard.title }}</h4>
        </v-toolbar-title>
      </v-toolbar>
      <v-carousel hide-delimiters v-if="reviewBoardImages.length != 0">
        <v-carousel-item
        v-for="(imagePath, idx) in reviewBoardImages" :key="idx"
        cover>
          <!-- AWS s3 사용을 위한 주석 처리 -->
          <!-- <img class="align-end" :src="require(`@/assets/reviewImage/${imagePath.reviewBoardImageResourcePath}`)" style="object-fit: contain; width: 100%; height: 100%; color: white;"> -->
          <img class="align-end" :src="`https://vue-s3-test-fourman.s3.ap-northeast-2.amazonaws.com/${imagePath.reviewBoardImageResourcePath}`" style="object-fit: contain; width: 100%; height: 100%; color: white;">
        </v-carousel-item>
      </v-carousel>
        
  
      <v-card-subtitle class="pt-4">
        <div>
          <span>{{ reviewBoard.writer }}</span>
        </div>
        <div>
          <span>
            <v-rating
              :value=reviewBoard.rating
              color="amber"
              dense
              half-increments
              readonly
              size="14"
              background-color="gray"
            ></v-rating>
          </span>
        </div>
        <div>
          <span v-if="reviewBoard.regDate" style="color: gray; font-size: 13px;">{{ reviewBoard.regDate.slice(0, 10) }} {{ reviewBoard.regDate.slice(11, 16) }}</span>
          <span style="float: right;">
            <v-btn v-if="loginCheck()" @click="onModify" icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn v-if="loginCheck()" @click="onDelete" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </span>
        </div>
      </v-card-subtitle>
  
      <v-card-text>
        <div v-html="compiledMarkdown"></div>
      </v-card-text>
      
    </v-card>
  </div>
</template>
  
<script>
import AWS from 'aws-sdk'
import { mapActions } from 'vuex'
import { marked } from 'marked'
const reviewBoardModule= 'reviewBoardModule'

export default {
    name: "ReviewBoardReadForm",
    data() {
      return {
        awsBucketName: 'vue-s3-test-fourman',
        awsBucketRegion: 'ap-northeast-2',
        awsIdentityPoolId: "ap-northeast-2:ce9c61fa-af5d-4ed1-8e3d-9b8d460ee927",
        s3: null,
      }
    },
    props: {
        reviewBoard: {
            type: Object,
            required: true,
        },
        reviewBoardImages: {
            type: Array,
        }
    },
    methods: {
      ...mapActions(reviewBoardModule,[
          'requestDeleteReviewBoardToSpring',
      ]),
      loginCheck() {
          if(JSON.parse(localStorage.getItem('userInfo'))) {
            const loginId = JSON.parse(localStorage.getItem('userInfo')).id
            const memberId = this.reviewBoard.memberId
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

        // AWS s3 사용을 위한 주석 처리
        // async onDelete () {
        //   await this.requestDeleteReviewBoardToSpring(this.reviewBoard.reviewBoardId)
        //   await this.$router.push({ name: 'ReviewBoardListPage' })
        // },

        async onDelete () {

          if (this.reviewBoardImages.length > 0) {
            for (const imagePath of this.reviewBoardImages) {
              await this.deleteImageFromS3(imagePath.reviewBoardImageResourcePath);
            }
          }

          await this.requestDeleteReviewBoardToSpring(this.reviewBoard.reviewBoardId)
          await this.$router.push({ name: 'ReviewBoardListPage' })
        },

        
        async onModify () {
          await this.$router.push({ name: 'ReviewBoardModifyPage', params: this.reviewBoard.reviewBoardId  })
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
    created() {
        console.log('reviewBoardImages: ' + this.reviewBoardImages)
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.reviewBoard.content || '');
      }
    }
}
</script>

<style>
</style>
