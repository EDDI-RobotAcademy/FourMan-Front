<template>
    <v-container>
      <div style="margin:0 150px;">
        <div class="NanumGothic mt-10">
          <h2>자유 게시판 <v-icon>mdi-bulletin-board</v-icon></h2>
        </div>
          <!-- <search-bar-form class="mb-2" style="float: right;" v-model="searchText" @search="onSearch" /> -->
          <!-- <div v-if="searchBoards.length === 0"> -->
          <free-board-list-form
          :freeBoards="freeBoards"
          :bestFreeBoards="bestFreeBoards"/>
          <div class="text-right">
            <v-btn v-if="this.$store.state.memberModule.isAuthenticated" class="mb-5 me-6 brown darken-2 white--text" @click="loginCheck()">
              게시물 작성
          </v-btn>
          </div>
          <!-- <div v-else>
            <free-board-search-result-form :searchBoards="searchBoards" />
          </div> -->
          <!-- </div> -->
      </div>
    </v-container>
  </template>

  <script>

  import SearchBarForm from '@/components/searchBoard/SearchBarForm.vue'
  import FreeBoardListForm from '@/components/freeBoard/FreeBoardListForm.vue'
  // import FreeBoardSearchResultForm from '@/components/freeBoard/FreeBoardSearchResultForm.vue'
  import { mapActions, mapState } from 'vuex'
  const freeBoardModule= 'freeBoardModule'

  export default {
    components: {
      FreeBoardListForm,
      SearchBarForm,
      // FreeBoardSearchResultForm
     },
    name: "FreeBoardListPage",
    data () {
      return {
        searchText : '',
      }
    },
    computed: {
      ...mapState(freeBoardModule,[
        'freeBoards','bestFreeBoards', 'searchBoards'
      ]),
    },
    async mounted () {
      await this.requestFreeBoardListToSpring()
      await this.requestSearchFreeBoardListToSpring()
      await this.requestBestFreeBoardListToSpring()
      console.log(JSON.stringify(this.bestFreeBoards))
    },
    methods: {
      ...mapActions(freeBoardModule,[
        'requestFreeBoardListToSpring',
        'requestSearchFreeBoardListToSpring',
        'requestBestFreeBoardListToSpring'
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
      },
      loginCheck () {
          const userInfo = localStorage.getItem('userInfo');
          if(userInfo == null) {
              alter("로그인이 필요 합니다");
              this.$router.push({name: 'SignInPage'})
          } else {
              this.$router.push({ name: 'FreeBoardRegisterPage'})
          }
      },
    }

  }
  </script>

  <style>
  </style>