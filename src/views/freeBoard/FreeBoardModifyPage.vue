<template>
    <v-container>
        <free-board-modify-form v-if="freeBoard" :freeBoard="freeBoard" @submit="onSubmit"/>
        <p v-else>로딩중 ........</p>
    </v-container>
  </template>
  
  <script>
  import FreeBoardModifyForm from '@/components/freeBoard/FreeBoardModifyForm.vue'
  import { mapActions, mapState } from 'vuex'
  const freeBoardModule= 'freeBoardModule'

  export default {
      components: { FreeBoardModifyForm },
      name: "FreeBoardModifyPage",
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
              'requestFreeBoardModifyToSpring',
          ]),
          async onSubmit (payload) {
              const { title, content, writer } = payload
              const boardId = this.boardId
              await this.requestFreeBoardModifyToSpring({ boardId, title, content, writer })
              await this.$router.push({
                  name: 'FreeBoardReadPage',
                  params: { boardId: this.boardId }
              })
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