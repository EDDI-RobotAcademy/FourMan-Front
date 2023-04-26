<template>
    <div>
    <my-page-side-bar-form />
    
    <v-container style="width: 1000px">
        <point-details-form :PointDetailsList="PointDetails" />
    </v-container>
</div>
</template>

<script>
import PointDetailsForm from '@/components/managerMyPage/PointDetailsForm.vue'
import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'

import { mapActions, mapState } from 'vuex'
const myPageModule= 'myPageModule'

export default {
    name: "MemberPointDetailsPage",
    components: {
        PointDetailsForm,
        MyPageSideBarForm
    },
    computed: {
        ...mapState(myPageModule,[
            'PointDetails'
        ]),
    },
    created () {
        this.requestPointDetailsToSpring(JSON.parse(localStorage.getItem('userInfo')).id)
    },
    methods: {
        ...mapActions(myPageModule,[
            'requestPointDetailsToSpring'
        ]),
    }
}
</script>

<style>

</style>