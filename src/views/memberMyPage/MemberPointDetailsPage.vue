<template>
    <div>
    <my-page-side-bar-form />
    
    <v-container style="width: 1000px">
        <member-point-details-form :PointDetails="PointDetails" />
    </v-container>
</div>
</template>

<script>
import MemberPointDetailsForm from '@/components/memberMyPage/MemberPointDetailsForm.vue'
import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'

import { mapActions, mapState } from 'vuex'
const myPageModule= 'myPageModule'

export default {
    name: "MemberPointDetailsPage",
    components: {
        MemberPointDetailsForm,
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