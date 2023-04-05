<template>
    <v-container>
      <div align="center">
        <free-board-read-form v-if="freeBoard" :freeBoard="freeBoard"/>
        <p v-else>로딩중 .......... </p>
        <v-btn v-if="loginCheck()" @click="onModify" class="brown darken-2 white--text me-2">
          게시물 수정
        </v-btn>
        <v-btn v-if="loginCheck()" class="brown darken-2 white--text me-2" @click="onDelete">삭제</v-btn>
        <v-btn class="brown darken-2 white--text" :to="{ name: 'FreeBoardListPage' }">
          돌아가기
        </v-btn>
      </div>
    </v-container>
  </template>
  
  <script>

  import FreeBoardReadForm from '@/components/freeBoard/FreeBoardReadFrom.vue'
  import { mapActions, mapState } from 'vuex'

  export default {
    components: { FreeBoardReadForm },
      name: "FreeBoardReadPage",
      props: {
          boardId: {
              type: String,
              required: true,
          }
      },
      computed: {
          ...mapState(['freeBoard'])
      },
      methods: {
          ...mapActions([
              'requestFreeBoardToSpring',
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
            await this.requestDeleteFreeBoardToSpring(this.boardId)
            await this.$router.push({ name: 'FreeBoardListPage' })
          },
          async onModify () {
            await this.$router.push({ name: 'FreeBoardModifyPage', params: this.boardId  })
          }
      },
      created () {
          console.log('boardId: ' + this.boardId)
          this.requestFreeBoardToSpring(this.boardId)
      }
  }
  </script>
  
  <style>
  </style>