<template>
    <v-container>
        <div class="EULJIRO mt-5 mb-5 text-center">
            <h1> 공지사항 <v-icon>mdi-bullhorn</v-icon></h1>
        </div>
        <div>
            <notice-board-list-form :noticeBoards="noticeBoards"></notice-board-list-form>
        </div>
        <div class="text-right">
            <v-btn v-if="manager == 'MANAGER'">
                게시물 작성
            </v-btn>
        </div>
    </v-container>
</template>

<script>

import NoticeBoardListForm from '@/components/noticeBoard/NoticeBoardListForm.vue';
import {mapState, mapActions} from 'vuex'
export default {
    name: "NoticeBoardListPage",
    components: {
        NoticeBoardListForm
    },
    data () {
        return {
            manager : JSON.parse(localStorage.getItem('userInfo')).authorityName
        }
    },
    computed: {
        ...mapState([
            'noticeBoards'
        ])
    },
    mounted () {
        this.requestNoticeBoardListToSpring()
    },
    methods: {
        ...mapActions ([
            'requestNoticeBoardListToSpring'
        ]),
    }
}
</script>