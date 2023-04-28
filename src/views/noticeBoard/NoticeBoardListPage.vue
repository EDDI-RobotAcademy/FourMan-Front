<template>
    <v-container>
        <div style="margin:0 150px;">
            <div class="NanumGothic mt-10 mb-14">
                <h2> 공지사항 <v-icon>mdi-bullhorn</v-icon></h2>
            </div>
            <div>
                <notice-board-list-form :noticeBoards="noticeBoards"></notice-board-list-form>
            </div>
            <div class="text-right">
                <v-btn v-if="manager == 'MANAGER'">
                    게시물 작성
                </v-btn>
            </div>
        </div>
    </v-container>
</template>

<script>

import NoticeBoardListForm from '@/components/noticeBoard/NoticeBoardListForm.vue';
import {mapState, mapActions} from 'vuex'
const noticeBoardModule = 'noticeBoardModule'
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
        ...mapState(noticeBoardModule,[
            'noticeBoards'
        ])
    },
    mounted () {
        this.requestNoticeBoardListToSpring()
    },
    methods: {
        ...mapActions (noticeBoardModule,[
            'requestNoticeBoardListToSpring'
        ]),
    }
}
</script>