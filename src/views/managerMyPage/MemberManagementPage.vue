<template>
    <div>
    <my-page-side-bar-form />
    
    <v-container style="width: 1000px">
        <member-management-form :memberInfoList="memberInfoList" />
    </v-container>
</div>
</template>

<script>
import MemberManagementForm from '@/components/managerMyPage/MemberManagementForm.vue'
import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'

import { mapActions, mapState } from 'vuex'
const myPageModule= 'myPageModule'

export default {
    name: "MemberManagementPage",
    components: {
        MemberManagementForm,
        MyPageSideBarForm
    },
    computed: {
        ...mapState(myPageModule,[
            'memberInfoList',
        ]),
    },
    created () {
        this.requestMemberInfoListToSpring()
    },
    methods: {
        ...mapActions(myPageModule,[
            'requestMemberInfoListToSpring'
        ]),
    }
}
</script>

<style>

</style>