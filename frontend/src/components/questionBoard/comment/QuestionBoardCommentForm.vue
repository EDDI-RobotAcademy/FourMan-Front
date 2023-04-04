<template>
    <v-container>
        <form @submit.prevent="onSubmitComment" >
            <table>
                <tbody>
                    <br>
                    <tr>
                        <th scope="row">
                            {{ commentWriter }}
                        </th>
                        <td v-if="!this.$store.state.isAuthenticated">
                            <textarea
                            class="justify-center"
                            style="border: solid thin"
                            cols="60" rows="3" v-model="comment"
                            placeholder="로그인 후 댓글을 작성할 수 있습니다."
                            onfocus="this.placeholder=''"
                            onblur="this.placeholder='내용을 입력해 주세요
                            .'"
                            disabled />
                        </td>
                        <td v-if="this.$store.state.isAuthenticated">
                            <textarea
                            class="justify-center"
                            style="border: solid thin"
                            cols="60" rows="3" v-model="comment"
                            placeholder="내용을 입력해 주세요."
                            onfocus="this.placeholder=''"
                            onblur="this.placeholder='내용을 입력해 주세요
                            .'" />
                        </td>
                        <td>
                            <v-btn v-if="this.$store.state.isAuthenticated" type="submit"> 등록하기 </v-btn>
                        </td>
                    </tr>
                </tbody>
            </table>
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
        }
    },
    created() {
        if(JSON.parse(localStorage.getItem('userInfo'))) {
            this.commentWriter = JSON.parse(localStorage.getItem('userInfo')).nickName,
            this.memberId = JSON.parse(localStorage.getItem('userInfo')).id
        }
    }
}
</script>