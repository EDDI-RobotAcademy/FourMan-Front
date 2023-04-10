<template>
    <v-container>
        <div class="EULJIRO mt-5 mb-5 text-center">
             <h1>공지사항 작성 <v-icon>mdi-bulletin-board</v-icon></h1>
        </div>
        <notice-board-register-form @submit="onSubmitNotice" />
    </v-container>
</template>

<script>

import NoticeBoardRegisterForm from '@/components/noticeBoard/NoticeBoardRegisterForm.vue'
import {mapActions} from 'vuex'
export default {
    name: "NoticeBoardRegisterPage",
    components : {
        NoticeBoardRegisterForm
    },
    methods: {
        ...mapActions ([
            'requestNoticeBoardRegisterToSpring'
        ]),
        async onSubmitNotice(payload) {
            await this.requestNoticeBoardRegisterToSpring(payload)
            await this.$router.push({
                name: 'NoticeBoardListPage',
            })
        }
    }

}
</script>