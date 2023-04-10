<template>
  <div style="margin-left: 100px; margin-right: 100px;">
   <div class="mt-5 mb-5" style="border: 1px solid #ccc; border-radius: 10px;">
      <div style="margin: 20px">
         <div class="mb-5">
            <span class="HANNA">
               <h2>기본 정보</h2>
            </span>
         </div>
         <v-divider class="mt-3 mb-3"></v-divider>
         <div style="display: flex;">
            <span style="width: 30%; color: gray; font-size: 15px;">닉네임</span>
            <span>{{ myInfo.nickName }}</span>
         </div>
         
         <v-divider class="mt-3 mb-3"></v-divider>
         <div style="display: flex;">
            <span style="width: 30%; color: gray; font-size: 15px;">생년월일</span>
            <span>{{ myInfo.birthdate }}</span>
         </div>
      </div>
   </div>
   <div class="mt-5 mb-5" style="border: 1px solid #ccc; border-radius: 10px;">
      <div style="margin: 20px">
         <div class="mb-5">
            <span class="HANNA">
               <h2>연락처 정보</h2>
            </span>
         </div>
         <v-divider class="mt-3 mb-3"></v-divider>
         <div style="display: flex;">
            <span style="width: 30%; color: gray; font-size: 15px;">이메일</span>
            <span>{{ myInfo.email }}</span>
         </div>
         <v-divider class="mt-3 mb-3"></v-divider>
         <div style="display: flex;">
            <span style="width: 30%; color: gray; font-size: 15px;">휴대전화</span>
            <span>{{ myInfo.phoneNumber }}</span>
         </div>
      </div>
   </div>
   <div class="mt-5 mb-5" style="border: 1px solid #ccc; border-radius: 10px;">
      <div style="margin: 20px">
         <div class="mb-5">
            <span class="HANNA">
               <h2>주소 정보</h2>
            </span>
         </div>
         <v-divider class="mt-3 mb-3"></v-divider>
         <div style="display: flex;">
            <span style="width: 30%; color: gray; font-size: 15px;">주소</span>
            <span v-if="myInfo.address">{{ myInfo.address.city }} {{ myInfo.address.street }} {{ myInfo.address.addressDetail }} {{ myInfo.address.zipcode }}</span>
         </div>
      </div>
   </div>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
   name: "MemberMyInfoForm",
   computed: {
      ...mapState([
        'myInfo',
      ]),
    },
   mounted () {
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