<template>
    <v-container>
      <div>
        <free-board-read-form v-if="freeBoard" :freeBoard="freeBoard"/>
        <p v-else>로딩중 .......... </p>
      </div>
    </v-container>
  </template>
  
  <script>

  import FreeBoardReadForm from '@/components/freeBoard/FreeBoardReadFrom.vue'
  import { mapActions, mapState } from 'vuex'
  const freeBoardModule= 'freeBoardModule'

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
          ...mapState(freeBoardModule,['freeBoard'])
      },
      methods: {
          ...mapActions(freeBoardModule,[
              'requestFreeBoardToSpring',
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
      },
      created () {
          console.log('boardId: ' + this.boardId)
          this.requestFreeBoardToSpring(this.boardId)
      }
  }
  </script>
  
  <style>
  </style>