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
          <img class="align-end" :src="require(`@/assets/reviewImage/${imagePath.reviewBoardImageResourcePath}`)" style="object-fit: contain; width: 100%; height: 100%; color: white;">
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
