<template>
  <div>
<h4>댓글 : {{ commentSize }} 개</h4>
<ul>
  <li v-for="comment in comments" :key="comment.commentId">
    <div> {{ comment.commentWriter }} |  {{ comment.comment }}
      <!-- 댓글 수정 버튼-->
      <v-btn class="small-button" @click="openDialog(comment.commentId)" icon>
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
      <v-btn class="small-button" @click="deleteComment(comment.commentId)" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>

  </li>
</ul>
</div>

</template>

<script>

import {mapActions} from 'vuex'

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

},
props : {
    comments : {
        type: Array,
    },

},
methods: {
  ...mapActions([
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
  }
  }
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
