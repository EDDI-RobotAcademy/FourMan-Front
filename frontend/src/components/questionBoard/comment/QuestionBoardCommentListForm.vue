<template>
      <div>
    <h4>댓글 : {{ commentSize }} 개</h4>
    <ul>
      <li v-for="comment in comments" :key="comment.commentId">
        <div> {{ comment.commentWriter }} |  {{ comment.comment }}
          <v-btn class="small-button" icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
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
        comment : JSON.stringify(comments),
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
        comment: {
          type: Object
        }
    },
    methods: {
      ...mapActions([
      'requestQuestionBoardCommentDeleteToSpring',
      ]),

      async deleteComment(commentId) {
        console.log('commentid : ' + commentId)
        await this.requestQuestionBoardCommentDeleteToSpring(commentId)
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