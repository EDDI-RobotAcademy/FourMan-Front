<template>
   <div class="d-flex">
      <my-page-side-bar-form />

      <v-container style="width: 1000px">
         <member-my-info-form v-if="myInfo" :myInfo="myInfo" />
      </v-container>
   </div>
</template>

<script>
import MemberMyInfoForm from '@/components/myPage/memberMyPage/MemberMyInfoForm.vue'
import MyPageSideBarForm from '@/components/myPage/MyPageSideBarForm.vue'
import { mapActions, mapState } from 'vuex'
const myPageModule= 'myPageModule'

export default {
   name: "MemberMyPage",
   components: {
      MemberMyInfoForm,
      MyPageSideBarForm
   },
   computed: {
      ...mapState(myPageModule,[
        'myInfo',
      ]),
    },
   created () {
      this.requestMyInfoToSpring(JSON.parse(localStorage.getItem('userInfo')).id)
   },
   methods: {
      ...mapActions(myPageModule,[
         'requestMyInfoToSpring'
      ]),
   }
}
</script>

<style>

</style>