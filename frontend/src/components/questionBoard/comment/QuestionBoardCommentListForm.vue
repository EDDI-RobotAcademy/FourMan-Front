<template>
      <div>
    <h4>댓글 : {{ commentSize }} 개</h4>
    <ul>
      <li v-for="comment in comments" :key="comment.commentId">
        <div> {{ comment.commentWriter }} |  {{ comment.comment }}</div>

      </li>
    </ul>
  </div>

</template>

<script>

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

        }
    }

}
</script>