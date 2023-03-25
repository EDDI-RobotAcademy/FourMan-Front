<template>
    <v-container>
      <div align="center">
        <free-board-read-form v-if="freeBoard" :freeBoard="freeBoard"/>
        <p v-else>로딩중 .......... </p>
        <v-btn @click="onModify">
          게시물 수정
        </v-btn>
        <v-btn @click="onDelete">삭제</v-btn>
        <router-link :to="{ name: 'FreeBoardListPage' }">
          <v-btn>
            돌아가기
          </v-btn>
        </router-link>
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
          async onDelete () {
            if(JSON.parse(localStorage.getItem('userInfo'))) {
              const loginId = JSON.parse(localStorage.getItem('userInfo')).id
              const memberId = this.freeBoard.memberId

              if(loginId != memberId) {
                alert("작성자만 해당 게시글을 삭제할 수 있습니다.")
              } else {
                await this.requestDeleteFreeBoardToSpring(this.boardId)
                await this.$router.push({ name: 'FreeBoardListPage' })
              }
            }

            if(!JSON.parse(localStorage.getItem('userInfo'))) {
              alert("작성자만 해당 게시글을 삭제할 수 있습니다.")
            }
          },
          async onModify () {
            if(JSON.parse(localStorage.getItem('userInfo'))) {
              const loginId = JSON.parse(localStorage.getItem('userInfo')).id
              const memberId = this.freeBoard.memberId

              if(loginId != memberId) {
                alert("작성자만 해당 게시글을 수정할 수 있습니다.")
              } else {
                await this.$router.push({ name: 'FreeBoardModifyPage', params: this.boardId  })
              }
            }

            if(!JSON.parse(localStorage.getItem('userInfo'))) {
              alert("작성자만 해당 게시글을 수정할 수 있습니다.")
            }
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