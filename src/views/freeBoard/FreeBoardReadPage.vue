<template>
    <v-container>
      <div>
        <free-board-read-form v-if="freeBoard" :freeBoard="freeBoard"/>
        <p v-else>로딩중 .......... </p>
      </div>
      <div align="center">
            <free-board-comment-form @submit="onSubmitComment" />
        </div>
        <free-board-comment-list-form
            :comments="comments"
            :dialog="dialog"/>
    </v-container>
  </template>

  <script>

  import FreeBoardReadForm from '@/components/freeBoard/FreeBoardReadFrom.vue'
  import FreeBoardCommentForm from '@/components/freeBoard/comment/FreeBoardCommentForm.vue'
  import FreeBoardCommentListForm from '@/components/freeBoard/comment/FreeBoardCommentListForm.vue'
  import { mapActions, mapState } from 'vuex'
  const freeBoardModule= 'freeBoardModule'

  export default {
    components: {
      FreeBoardReadForm,
      FreeBoardCommentForm,
      FreeBoardCommentListForm
     },
      name: "FreeBoardReadPage",
      data () {
        return {
        dialog: false,
        }
      },
      props: {
          boardId: {
              type: String,
              required: true,
          }
      },
      computed: {
          ...mapState(freeBoardModule,[
            'freeBoard',
            'comments'
          ])
      },
      methods: {
          ...mapActions(freeBoardModule,[
              'requestFreeBoardToSpring',
              'requestFreeBoardCommentRegisterToSpring',
              // 'requestFreeBoardCommentListToSpring',
          ]),
          async onSubmitComment(payload) {
            const { comment, commentWriter, memberId} = payload
            const boardId = this.boardId
            console.log("댓글 등록할 boardId:" + boardId +"memberId check" + memberId)
            console.log('댓글 내용 확인 :' + comment)
            await this.requestFreeBoardCommentRegisterToSpring( {comment, boardId, commentWriter, memberId})
            await this.$router.go((this.$router.currentRoute))
         },
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
      },
      created () {
          console.log('boardId: ' + this.boardId)
          this.requestFreeBoardToSpring(this.boardId)
          // this.requestFreeBoardListToSpring(this.boardId)
      }
  }
  </script>

  <style>
  </style>