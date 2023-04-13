<template>
    <v-container>
        <div>
            <notice-board-read-form v-if="noticeBoard" :noticeBoard="noticeBoard" />
            <p v-else> 로딩중...</p>
        </div>
    </v-container>
</template>


<script>

import NoticeBoardReadForm from '@/components/noticeBoard/NoticeBoardReadForm.vue';
import {mapActions, mapState} from 'vuex'
const noticeBoardModule ='noticeBoardModule'

export default {
    name: "NoticeBoardReadPage",
    components: {
       NoticeBoardReadForm
    },
    props: {
        boardId: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState(noticeBoardModule,['noticeBoard']),
},
    methods: {
        ...mapActions(noticeBoardModule,[
            'requestNoticeBoardToSpring',
    ]),
},
    created () {
        console.log('boardId : ' + this.boardId)
        this.requestNoticeBoardToSpring(this.boardId)
       },

}
</script>
