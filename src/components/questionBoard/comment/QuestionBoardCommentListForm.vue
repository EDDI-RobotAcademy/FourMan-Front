<template>
  <div class="mt-2 me-15 ms-15">
    <div v-for="comment in reversedComments()" :key="comment.commentId">
      <div>
        <span class="HANNA" style="font-weight: bold;">{{ comment.commentWriter }}</span>
        <span style="float: right;">
          <!-- 댓글 수정 버튼-->
          <v-btn v-if="commentAuthorCheck(comment.memberId)" class="small-button" @click="openDialog(comment.commentId)" icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-dialog
          v-model="dialog"
          @open-dialog="openDialog"
          width="auto">
          <!-- dialog에 나올 UI -->
            <v-card>
              <v-card-text>
                <form @submit="saveComment">
                  <v-textarea label="내용" cols="50"
                  v-model="commentModify"> 수정할 내용</v-textarea>
                </form>
              </v-card-text>
              <v-card-actions>
              </v-card-actions>
              <v-btn @click="dialog = false">취소</v-btn>
              <v-btn @click="saveComment(), dialog =false" >저장</v-btn>
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
</style>
