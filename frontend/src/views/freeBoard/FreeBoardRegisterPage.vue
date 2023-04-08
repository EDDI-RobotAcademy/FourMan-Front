<template>
    <v-container>
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