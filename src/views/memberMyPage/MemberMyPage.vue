<template>
   <div>
      <my-page-side-bar-form />
      
      <v-container style="width: 1000px">
         <member-my-info-form v-if="myInfo" :myInfo="myInfo" />
      </v-container>
   </div>
</template>

<script>
import MemberMyInfoForm from '@/components/memberMyPage/MemberMyInfoForm.vue'
import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'
import { mapActions, mapState } from 'vuex'

export default {
   name: "MemberMyPage",
   components: {
      MemberMyInfoForm,
      MyPageSideBarForm
   },
   computed: {
      ...mapState([
        'myInfo',
      ]),
    },
   created () {
      this.requestMyInfoToSpring(JSON.parse(localStorage.getItem('userInfo')).id)
   },
   methods: {
      ...mapActions([
         'requestMyInfoToSpring'
      ]),
   }
}
</script>

<style>

</style>