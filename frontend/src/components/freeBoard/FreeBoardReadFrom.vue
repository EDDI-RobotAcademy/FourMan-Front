<template>
  <div style="margin-left: 100px; margin-right: 100px;">
    <div class="mt-5 mb-5" style="border: 1px solid #ccc; height: 700px">
      <div style="margin: 20px">
        <div>
          <span class="HANNA">
            <h1>{{ freeBoard.title }}</h1>
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
        <div>
          {{ freeBoard.content }}
        </div>
      </div>
    </div>
    <div>
      <v-btn class="brown darken-2 white--text mb-5" :to="{ name: 'FreeBoardListPage' }" style="float: right;">
        목록
      </v-btn>
    </div>
  </div>
  </template>
  
  <script>

import { mapActions } from 'vuex'

  export default {
      name: "FreeBoardReadForm",
      props: {
          freeBoard: {
              type: Object,
              required: true,
          }
      },
      methods: {
        ...mapActions([
            'requestDeleteFreeBoardToSpring',
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
          async onDelete () {
            await this.requestDeleteFreeBoardToSpring(this.freeBoard.boardId)
            await this.$router.push({ name: 'FreeBoardListPage' })
          },
          async onModify () {
            await this.$router.push({ name: 'FreeBoardModifyPage', params: this.freeBoard.boardId  })
          }
      }
  }
  </script>
  
  <style scoped>
  </style>