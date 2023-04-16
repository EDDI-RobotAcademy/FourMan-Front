<template>
  <div style="margin-left: 100px; margin-right: 100px;">
    <div class="mt-5 mb-5" style="border: 1px solid #ccc; min-height: 700px">
      <div style="margin: 20px">
        <div style="color: #5D4037;">
          [{{ reviewBoard.cafeName }}]
        </div>
        <div>
          <span class="HANNA">
            <h1>{{ reviewBoard.title }}</h1>
          </span>
        </div>
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
        <v-divider class="mt-3 mb-3"></v-divider>
        <div class="mt-10 mb-10" v-if="reviewBoardImages.length != 0" style="margin-left: 100px; margin-right: 100px;">
          <v-carousel hide-delimiters>
            <v-carousel-item
            v-for="(imagePath, idx) in reviewBoardImages" :key="idx"
            cover>
              <img :src="require(`@/assets/reviewImage/${imagePath.reviewBoardImageResourcePath}`)" style="object-fit: contain; width: 100%; height: 100%;">
            </v-carousel-item>
          </v-carousel>
        </div>
        <div v-html="compiledMarkdown"></div>
      </div>
    </div>
    <div>
      <v-btn class="brown darken-2 white--text mb-5" :to="{ name: 'ReviewBoardListPage' }" style="float: right;">
        목록
      </v-btn>
    </div>
  </div>
  </template>
  
  <script>

import { mapActions } from 'vuex'
import { marked } from 'marked'
const reviewBoardModule= 'reviewBoardModule'

  export default {
      name: "ReviewBoardReadForm",
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
          async onDelete () {
            await this.requestDeleteReviewBoardToSpring(this.reviewBoard.reviewBoardId)
            await this.$router.push({ name: 'ReviewBoardListPage' })
          },
          async onModify () {
            await this.$router.push({ name: 'ReviewBoardModifyPage', params: this.reviewBoard.reviewBoardId  })
          }
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
