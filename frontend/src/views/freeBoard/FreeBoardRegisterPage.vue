<template>
    <v-container>
      <h2 class="mt-5 mb-5 text-center">게시물 작성</h2>
      <free-board-register-form @submit="onSubmit"/>
    </v-container>
  </template>

  <script>

  import FreeBoardRegisterForm from '@/components/freeBoard/FreeBoardRegisterForm.vue'

  import { mapActions } from 'vuex'
  export default {
      components: { FreeBoardRegisterForm },
      name: "FreeBoardRegisterPage",
      methods: {
          ...mapActions ([
              'requestCreateFreeBoardToSpring'
          ]),
          async onSubmit (payload) {
              const board = await this.requestCreateFreeBoardToSpring(payload)
              await this.$router.push({
                  name: 'FreeBoardListPage',
              })
          }
      }
  }
  </script>

  <style>
  </style>