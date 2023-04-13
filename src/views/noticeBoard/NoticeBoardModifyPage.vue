<template>
    <v-container>
        <div class="EULJIRO mt-5 mb-5 text-center">
            <h1> 공지사항 <v-icon>mdi-bullhorn</v-icon></h1>
            <notice-board-modify-form v-if="noticeBoard" :noticeBoard="noticeBoard" @submit="onSubmitNotice" />
            <p v-else> 로딩중 </p>
        </div>
    </v-container>
</template>



<script>

import NoticeBoardModifyForm from '@/components/noticeBoard/NoticeBoardModifyForm.vue'
import {mapActions, mapState} from 'vuex'
const noticeBoardModule = 'noticeBoardModule'

export default {
    name: "NoticeBoardModifyPage",
    components: {
        NoticeBoardModifyForm
    },
    props: {
        boardId: {
            type: String,
            required: true,
        }
    },
    created () {
        this.requestNoticeBoardToSpring(this.boardId)
    },
    computed: {
        ...mapState(noticeBoardModule,['noticeBoard'])
    },
    methods: {
        ...mapActions(noticeBoardModule,[
            'requestNoticeBoardToSpring',
            'requestNoticeBoardModifyToSpring'
        ]),
        async onSubmitNotice (payload) {
              const {title, content } = payload
              const boardId = this.boardId

              await this.requestNoticeBoardModifyToSpring({ boardId, title, content })
              await this.$router.push({
                  name: 'NoticeBoardReadPage',
                  params: { boardId: this.boardId }
              })
          }
    },

    }


</script>