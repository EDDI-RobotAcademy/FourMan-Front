<template>
    <div>
    <my-page-side-bar-form />
    
    <v-container style="width: 1000px">
        <cafe-management-form :cafeInfoList="cafeInfoList" />
    </v-container>
</div>
</template>

<script>
import CafeManagementForm from '@/components/managerMyPage/CafeManagementForm.vue'
import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'

import { mapActions, mapState } from 'vuex'
const myPageModule= 'myPageModule'

export default {
    name: "CafeManagementPage",
    components: {
        CafeManagementForm,
        MyPageSideBarForm
    },
    computed: {
        ...mapState(myPageModule,[
            'cafeInfoList',
        ]),
    },
    created () {
        this.requestCafeInfoListToSpring()
    },
    methods: {
        ...mapActions(myPageModule,[
            'requestCafeInfoListToSpring'
        ]),
    }
}
</script>

<style>

</style>