<template>
      <div>
    <h2>댓글</h2>
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
    props : {
        comments : {
            type: Array,

        }
    }

}
</script>