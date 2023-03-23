<template>
    <v-container>
      <div align="center">
        <free-board-read-form v-if="freeBoard" :freeBoard="freeBoard"/>
        <p v-else>로딩중 .......... </p>
        <v-btn>수정</v-btn>
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
              await this.requestDeleteFreeBoardToSpring(this.boardId)
              await this.$router.push({ name: 'FreeBoardListPage' })
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