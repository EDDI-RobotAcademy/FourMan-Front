<template>
    <div class="d-flex">
        <my-page-side-bar-form />

        <v-container style="width: 1000px">
            <my-cafe-modify-form :myCafeInfo="myCafeInfo" @submit="onSubmit" />
        </v-container>
</div>
</template>

<script>
import MyCafeModifyForm from '@/components/myPage/cafeMyPage/MyCafeModifyForm.vue'
import MyPageSideBarForm from '@/components/myPage/MyPageSideBarForm.vue'

import { mapActions, mapState } from 'vuex'
const myPageModule= 'myPageModule'

export default {
    name: "MyCafeModifyPage",
    components: {
        MyCafeModifyForm,
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
            'requestMyCafeInfoToSpring',
            'requestCafeInfoModifyToSpring'
        ]),
        async onSubmit (payload) {
            const { cafeId, cafeAddress, cafeTel, startTime, endTime, subTitle, description } = payload
            await this.requestCafeInfoModifyToSpring(
                { cafeId, cafeAddress, cafeTel, startTime, endTime, subTitle, description })

            await this.$router.push({
                name: 'MyCafeManagementPage',
            })
        },
    }
}
</script>

<style>

</style>