<template>
    <v-container>
      <div align="center">
        <free-board-modify-form v-if="freeBoard" :freeBoard="freeBoard" @submit="onSubmit"/>
        <p v-else>로딩중 ........</p>
      </div>
    </v-container>
  </template>
  
  <script>
  import FreeBoardModifyForm from '@/components/freeBoard/FreeBoardModifyForm.vue'
  import { mapActions, mapState } from 'vuex'
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
          ...mapState(['freeBoard'])
      },
      methods: {
          ...mapActions([
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