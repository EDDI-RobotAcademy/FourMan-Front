<template>
    <div class="d-flex">
    <my-page-side-bar-form />
    
    <v-container style="width: 1000px">
        <point-details-form :PointDetailsList="PointDetailsList" />
    </v-container>
</div>
</template>

<script>
import PointDetailsForm from '@/components/managerMyPage/PointDetailsForm.vue'
import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'

import { mapActions, mapState } from 'vuex'
const myPageModule= 'myPageModule'

export default {
    name: "PointDetailsPage",
    components: {
        PointDetailsForm,
        MyPageSideBarForm
    },
    computed: {
        ...mapState(myPageModule,[
            'PointDetailsList'
        ]),
    },
    created () {
        this.requestPointDetailsListToSpring()
    },
    methods: {
        ...mapActions(myPageModule,[
            'requestPointDetailsListToSpring'
        ]),
    }
}
</script>

<style>

</style>