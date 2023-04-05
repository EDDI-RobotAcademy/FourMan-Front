<template>
    <v-container>
        <form @submit.prevent="onSubmitComment" >
            <div class="card shadow-lg comment-box">
                <div class="card-body">
          
                  <!-- 댓글 입력창 요소 -->
                  <div class="comment-area-field mb-5">
                    <p class="comment-count-txt">총 {{ commentSize }}개의 댓글</p>
                    <textarea
                      v-if="this.$store.state.isAuthenticated"
                      class="comment-area"
                      v-model="comment"
                      placeholder="댓글을 작성하세요."
                    />
                    <textarea
                      v-if="!this.$store.state.isAuthenticated"
                      class="comment-area"
                      style="cursor: pointer;"
                      placeholder="로그인 후 댓글을 작성할 수 있습니다."
                      readonly
                      @click="login"
                    />
                    <v-btn
                      type="submit"
                      class="brown darken-2 white--text"
                      width="30%"
                      height="40">
                      댓글등록
                      </v-btn>
                  </div>
                </div>
            </div>
        </form>
    </v-container>
</template>

<script>


export default {

    name: 'QuestionBoardCommentForm',
    data () {
        return {
            commentWriter : '',
            comment: '',
            memberId: ''
        }
    },
    methods: {
        onSubmitComment() {
            const {comment, commentWriter, memberId} = this
            this.$emit('submit', {comment, commentWriter, memberId})
        },
        login() {
            this.$router.push({ name: 'SignInPage' })
        }
    },
    created() {
        if(JSON.parse(localStorage.getItem('userInfo'))) {
            this.commentWriter = JSON.parse(localStorage.getItem('userInfo')).nickName,
            this.memberId = JSON.parse(localStorage.getItem('userInfo')).id
        }
    },
    computed: {
        commentSize() {
            return this.$store.state.comments.length;
        },
    }
}
</script>

<style scoped>
.comment-box {
  margin-top: 10px;
  padding-bottom: 30px;
}
.comment-area-field {
  width: 100%;
  height: auto;
  float: left;
}
.comment-list-field {
  padding-top: 20px;
  width: 100%;
  height: auto;
  float: left;
}
.comment-count-txt{
  color: rgba(78, 82, 78, 0.445);
}
.comment-area{
  height: 70px;
  resize: none;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid rgb(233, 236, 239);
  margin-bottom: 1rem;
  width: 100%;
  border-radius: 4px;
  min-height: 6.125rem;
  font-size: 1rem;
  color: rgb(33, 37, 41);
  line-height: 1.75;
}
.commentSubmitBtn {
  background-color:rgb(40, 41, 41); 
  color:#fff; 
  border:0; 
  border-radius:3px; 
  margin-top:5px;
  margin-bottom: 25px;
  padding:5px 15px 5px 15px;
}
.replySubmitBtn {
  background-color:rgb(173, 181, 189);
  color:#fff; 
  border:0; 
  border-radius:3px; 
  margin-top:5px;
  margin-bottom: 25px;
  padding:5px 15px 5px 15px;
}
.comment-row-head{
  padding: 10px;
  display:flex;
}
.comment-user-profile-img{
  width:50px; 
  height:70px; 
  float:left;
}
.comment-user-info{
  padding-left:15px; 
  float:left; 
  color:rgb(52, 58, 64);
}
.comment-user-info p:first-child {
  margin-bottom:0px; 
  font-weight: bold;
}
.comment-user-info p:last-child {
  font-size: 0.875rem;
}
.comment-row-body {
  color:rgb(52, 58, 64);
  padding: 10px;
  display: flex;
}
.comment-row-bottom {
  color:rgb(52, 58, 64);
  padding: 30px 10px 10px;
  display: flex;
  width: calc(100% - 50px);
  background-color: rgba(0, 0, 0, 0.016);
  margin: auto;
}
.replyShowBtn{ 
  display: block;
  padding: 15px;
}
.replyShowBtn button {
  background-color:#fff; 
  border:0px; 
  color:rgb(52, 58, 64);
}
.clear-both-width-100{
  clear:both;
  width: 100%;
}
.inner-comment-field-block {
  padding:0px 15px 0px 35px; 
  display:flex;
}
.bottom-gray-line {
  border-bottom: 1px solid #ebebeb;
}
</style>