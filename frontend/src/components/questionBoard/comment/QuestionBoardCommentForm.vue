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
                        <td>
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
                            <v-btn type="submit"> 등록하기 </v-btn>
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
    commentWriter : JSON.parse(localStorage.getItem('userInfo')).nickName,
    comment: '',
        }
    },
    methods: {
        onSubmitComment() {
            const {comment, commentWriter} = this
            this.$emit('submit', {comment, commentWriter})
        }
    },

}
</script>