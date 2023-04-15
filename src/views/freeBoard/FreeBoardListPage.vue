<template>
    <v-container>
      <div class="EULJIRO mt-5 mb-5 text-center">
        <h1>자유 게시판 <v-icon>mdi-bulletin-board</v-icon></h1>
    </div>
        <search-bar-form class="mb-2 me-7" style="float: right;" v-model="searchText" @search="onSearch" />
        <div v-if="searchBoards.length === 0">
        <free-board-list-form :freeBoards="freeBoards"/>
        </div>
        <div v-else>
          <free-board-search-result-form :searchBoards="searchBoards" />
        </div>
        <div class="text-right">
          <v-btn v-if="this.$store.state.memberModule.isAuthenticated" class="mb-5 me-6 brown darken-2 white--text">
            게시물 작성
        </v-btn>
        </div>
    </v-container>
  </template>

  <script>

  import SearchBarForm from '@/components/searchBoard/SearchBarForm.vue'
  import FreeBoardListForm from '@/components/freeBoard/FreeBoardListForm.vue'
  import FreeBoardSearchResultForm from '@/components/freeBoard/FreeBoardSearchResultForm.vue'
  import { mapActions, mapState } from 'vuex'
  const freeBoardModule= 'freeBoardModule'

  export default {
    components: {
      FreeBoardListForm,
      SearchBarForm,
      FreeBoardSearchResultForm
     },
    name: "FreeBoardListPage",
    data () {
      return {
        searchText : '',
      }
    },
    computed: {
      ...mapState(freeBoardModule,[
        'freeBoards', 'searchBoards'
      ]),
    },
    mounted () {
      this.requestFreeBoardListToSpring()
      this.requestSearchFreeBoardListToSpring()
    },
    methods: {
      ...mapActions(freeBoardModule,[
        'requestFreeBoardListToSpring',
        'requestSearchFreeBoardListToSpring'
      ]),
      // loginCheck() {
      //   const userInfo = localStorage.getItem('userInfo');
      //   if(userInfo != null) {
      //     this.$router.push({ name: 'FreeBoardRegisterPage' })
      //   } else {
      //     alert('로그인 후 글을 작성할 수 있습니다.')
      //     this.$router.push({ name: 'SignInPage' })
      //   }
      // },
      async onSearch(searchText) {
        console.log('searchText 내용 :' + searchText)
        if(searchText !== '') {
          await this.requestSearchFreeBoardListToSpring(searchText)
      }
    }
    }
  }
  </script>

  <style>
  </style>