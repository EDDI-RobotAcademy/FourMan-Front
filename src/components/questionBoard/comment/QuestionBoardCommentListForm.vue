<template>
  <div class="mt-2 me-15 ms-15">
    <div v-for="comment in reversedComments()" :key="comment.commentId">
      <div>
        <span class="HANNA" style="font-weight: bold;">{{ comment.commentWriter }}</span>
        <span style="float: right;">
          <!-- 댓글 수정 버튼-->
          <v-btn v-if="commentAuthorCheck(comment.memberId)" class="small-button mr-1" @click="openDialog(comment.commentId)" icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-dialog v-model="dialog" max-width="600">
            <v-card>
              <v-card-title class="brown darken-2 white--text mb-5 headline mb-0">댓글 수정</v-card-title>
              <v-card-text>
                <v-textarea label="댓글 수정 할 내용" v-model="commentModify" no-resize></v-textarea>
              </v-card-text>
              <v-card-actions class="d-flex justify-end">
                <v-btn color="error" text @click="dialog = false" class="mr-4">취소</v-btn>
                <v-btn color="primary" text @click="saveComment()">저장</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- 댓글 삭제 -->
          <v-btn v-if="commentAuthorCheck(comment.memberId)" class="small-button" @click="deleteComment(comment.commentId)" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </span>
      </div>

      <div>
        {{ comment.comment }}
      </div>

      <div>
        <span style="color: gray; font-size: 13px;">{{ comment.regDate.slice(5, 10) }} {{ comment.regDate.slice(11, 16) }}</span>
      </div>

      <v-divider class="mt-2 mb-2"></v-divider>
    </div>
</div>

</template>

<script>

import {mapActions} from 'vuex'
const questionBoardModule= 'questionBoardModule'

export default {
name: "QuestionBoardCommentListForm",
data () {
  return {
    commentModify: '',
    // comment : JSON.stringify(comments),
    dialog: false,
  }
},
computed: {
  commentSize() {
    return this.$store.state.comments.length;
  },

    // commentAuthorCheck() {
    //         const loginId = JSON.parse(localStorage.getItem('userInfo')).id
    //         const commentMemberId = this.comment.memberId
    //         console.log("pageMemberId : "  + commentMemberId)
    //         const authorityName = JSON.parse(localStorage.getItem('userInfo')).authorityName
    //         return loginId === commentMemberId || authorityName === "MANAGER";

    // },

},
props : {
    comments : {
        type: Array,
    },

},
methods: {
  ...mapActions(questionBoardModule, [
  'requestQuestionBoardCommentDeleteToSpring',
  'requestQuestionBoardCommentModifyToSpring'
  ]),
  openDialog (commentId) {
        this.dialog = !this.dialog;
        console.log('commentId :' + commentId)
        this.selectCommentId = commentId
    },

  async deleteComment(commentId) {
    console.log('commentId : ' + commentId)
    await this.requestQuestionBoardCommentDeleteToSpring(commentId)
    await this.$router.go((this.$router.currentRoute))
  },

  async saveComment() {
    const commentModify = this.commentModify
    const commentId = this.selectCommentId
    console.log('commentId : / ' + commentId + 'commentModify :' + this.commentModify)
    await this.requestQuestionBoardCommentModifyToSpring( { commentModify, commentId })
    await this.$router.go((this.$router.currentRoute))
  },

  commentAuthorCheck(memberId1) {
    if(JSON.parse(localStorage.getItem('userInfo'))) {
      const loginId = JSON.parse(localStorage.getItem('userInfo')).id
      const memberId = memberId1
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
      //작성자, 관리자만 댓글 삭제, 수정버튼이 나오도록 하는 권한체크
    },
    reversedComments() {
      const reversedComments = this.comments.slice().reverse()
      return reversedComments
    }
  },
}


</script>

<style scoped>
.small-button {
width: 5px;
height: 5px;
padding-right: 11px;
padding-left: 15px;
}
.v-dialog--active .v-card {
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
}

.v-card__title.headline {
  font-size: 24px;
  font-weight: bold;
  color: #3f51b5;
}

.v-divider {
  margin-top: 16px;
  margin-bottom: 16px;
}

.v-textarea {
  font-size: 14px;
  color: #333;
}

.v-btn {
  font-size: 14px;
  text-transform: none;
}

.v-btn--text {
  padding: 0;
}

.v-btn--text:hover {
  background-color: transparent;
  color: #3f51b5;
}

.v-btn--text.primary:hover {
  color: #3f51b5;
}

.v-btn--text.error:hover {
  color: #f44336;
}
.v-dialog--active .v-card {
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
}

.v-card__title.headline {
  font-size: 24px;
  font-weight: bold;
  color: #3f51b5;
}

.v-divider {
  margin-top: 16px;
  margin-bottom: 16px;
}

.v-textarea {
  font-size: 14px;
  color: #333;
}

.v-btn {
  font-size: 14px;
  text-transform: none;
  padding: 0 10px;
}

.v-btn--text {
  padding: 0;
}

.v-btn--text:hover {
  background-color: transparent;
  color: #3f51b5;
}

.v-btn--text.primary:hover {
  color: #3f51b5;
}

.v-btn--text.grey:hover {
  color: #757575;
}


</style>

