<template>
    <div class="d-flex">
        <my-page-side-bar-form />
        
        <v-container style="width: 1000px">
            <my-cafe-management-form :myCafeInfo="myCafeInfo"/>
        </v-container>
</div>
</template>

<script>
import MyCafeManagementForm from '@/components/cafeMyPage/MyCafeManagementForm.vue'
import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'

import { mapActions, mapState } from 'vuex'
const myPageModule= 'myPageModule'

export default {
    name: "MyCafeManagementPage",
    components: {
        MyCafeManagementForm,
        MyPageSideBarForm
    },
    computed: {
        ...mapState(myPageModule,[
            'myCafeInfo',
        ]),
    },
    created () {
        const cafeId = JSON.parse(localStorage.getItem('userInfo')).cafeId
        console.log('cafeId: ' + cafeId)
        this.requestMyCafeInfoToSpring({ cafeId })
    },
    methods: {
        ...mapActions(myPageModule,[
            'requestMyCafeInfoToSpring'
        ]),
    }
}
</script>

<style>

</style>