<template>
    <v-container>
      <free-board-register-form @submit="onSubmit"/>
    </v-container>
  </template>

  <script>

  import FreeBoardRegisterForm from '@/components/freeBoard/FreeBoardRegisterForm.vue'
  import { mapActions } from 'vuex'
  const freeBoardModule= 'freeBoardModule'

  export default {
      components: { FreeBoardRegisterForm },
      name: "FreeBoardRegisterPage",
      methods: {
          ...mapActions (freeBoardModule,[
              'requestCreateFreeBoardToSpring'
          ]),
          async onSubmit (formData) {
              const board = await this.requestCreateFreeBoardToSpring(formData)
              await this.$router.push({
                  name: 'FreeBoardListPage',
              })
          }
      }
  }
  </script>

  <style>
  </style>