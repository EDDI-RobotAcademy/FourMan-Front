<template>
    <div style="margin-left: 100px; margin-right: 100px;">
      <div class="mt-5 mb-5" style="border: 1px solid #ccc; min-height: 700px">
        <div style="margin: 20px">
          <div style="color: #00C73C;">
            [{{ noticeBoard.notice }}]
          </div>
          <div>
            <span class="HANNA">
              <h1>{{ noticeBoard.title }}</h1>
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

  export default {
    name: 'NoticeBoardReadForm',
    props: {
        noticeBoard: {
            type : Object,
            required: true,
      }
    },
    methods: {
          loginCheck() {
              if(JSON.parse(localStorage.getItem('userInfo'))) {
                const loginId = JSON.parse(localStorage.getItem('userInfo')).id
                const memberId = this.noticeBoard.memberId
                const authorityName = JSON.parse(localStorage.getItem('userInfo')).authorityName

                if(loginId === memberId  || authorityName === "MANAGER") {
                  return true
                } else {
                  return false
                }
              }

              if(!JSON.parse(localStorage.getItem('userInfo'))) {
                return false
              }
            },
        }
  }
  </script>