<template>
    <v-container>
        <h2 class="mt-5 mb-5 text-center">자유게시판</h2>
        <free-board-list-form :boards="boards"/>
        <router-link class="mt-5 me-3" :to="{ name: 'JpaBoardRegisterPage' }" style="display: flex;
                                                                                    justify-content: flex-end;">
            <v-btn>
                게시물 작성
            </v-btn>
        </router-link>
    </v-container>
  </template>
  
  <script>

  import FreeBoardListForm from '@/components/freeBoard/FreeBoardListForm.vue'
  import { mapActions, mapState } from 'vuex'

  export default {
    components: { FreeBoardListForm },
    name: "FreeBoardListPage",
    computed: {
      ...mapState([
        'freeBoards'
      ]),
    },
    mounted () {
      this.requestFreeBoardListToSpring()
    },
    methods: {
      ...mapActions([
        'requestFreeBoardListToSpring'
      ])
    }
  }
  </script>
  
  <style>
  </style>