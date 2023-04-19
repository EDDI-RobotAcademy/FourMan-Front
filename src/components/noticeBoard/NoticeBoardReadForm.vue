<template>
    <div style="margin-left: 100px; margin-right: 100px;">
      <div class="mt-5 mb-5" style="border: 1px solid #ccc; min-height: 700px">
        <div style="margin: 20px">
          <div style="color: #00C73C;">
            [{{ noticeBoard.notice }}]
          </div>
          <div>
            <span class="HANNA">
              <h1>{{ noticeBoard.title }}</h1> <h4 class="text-right">조회수: {{ noticeBoard.viewCnt }}</h4>
            </span>
          </div>
          <div>
            <span>{{ noticeBoard.writer }}</span>
          </div>
          <div>
            <span v-if="noticeBoard.regDate" style="color: gray; font-size: 13px;">{{ noticeBoard.regDate.slice(0, 10) }} {{ noticeBoard.regDate.slice(11, 16) }}</span>
            <span style="float: right;">
              <v-btn v-if="loginCheck()" @click="onModify" icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn v-if="loginCheck()" @click="onDelete" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </span>
          </div>
          <v-divider class="mt-3 mb-3"></v-divider>
          <div>
            {{ noticeBoard.content }}
          </div>
        </div>
      </div>
      <div>
        <v-btn class="brown darken-2 white--text mb-5" :to="{ name: 'NoticeBoardListPage' }" style="float: right;">
          목록
        </v-btn>
      </div>
    </div>
  </template>

  <script>

  import {mapActions} from 'vuex'

  export default {
    name: 'NoticeBoardReadForm',
    props: {
        noticeBoard: {
            type : Object,
            required: true,
      }
    },
    methods: {
          ...mapActions([
            'requestNoticeBoardDeleteToSpring'
          ]),

          loginCheck() {
              if(JSON.parse(localStorage.getItem('userInfo'))) {
                const authorityName = JSON.parse(localStorage.getItem('userInfo')).authorityName

                if(authorityName === "MANAGER") {
                  return true
                }
              }

              if(!JSON.parse(localStorage.getItem('userInfo'))) {
                return false
              }
            },

            async onModify () {
            await this.$router.push({ name: 'NoticeBoardModifyPage', params: this.noticeBoard.boardId  })
          },

            async onDelete () {
              if(confirm('정말 삭제하시겠습니까?')) {
                  //No 버튼을 누르면 페이지를 이동하지않고 그대로 보여줌
                  await this.requestNoticeBoardDeleteToSpring(this.noticeBoard.boardId)
                  await this.$router.push({ name: 'NoticeBoardListPage' })
              }
          },
        }
  }
  </script>