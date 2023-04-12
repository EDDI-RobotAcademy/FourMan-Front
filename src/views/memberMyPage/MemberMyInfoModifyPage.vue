<template>
    <div>
       <my-page-side-bar-form />
       
       <v-container style="width: 1000px">
          <member-my-info-modify-form v-if="myInfo" :myInfo="myInfo" @submit="onSubmit"/>
       </v-container>
    </div>
 </template>
 
 <script>
 import MemberMyInfoModifyForm from '@/components/memberMyPage/MemberMyInfoModifyForm.vue'
 import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'
import axios from 'axios'
 import { mapActions, mapState } from 'vuex'
 
 export default {
    name: "MemberMyInfoModifyPage",
    components: {
      MemberMyInfoModifyForm,
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
         'requestMyInfoToSpring',
         'requestMemberInfoModifyToSpring'
      ]),
      async onSubmit (payload) {
         const { memberId, nickName, birthdate, phoneNumber, city, street, addressDetail, zipcode } = payload
         await this.requestMemberInfoModifyToSpring(
            { memberId, nickName, birthdate, phoneNumber, city, street, addressDetail, zipcode })

         await this.$router.push({
            name: 'MemberMyPage',
         })
      },
   }
 }
 </script>
 
 <style>
 
 </style>