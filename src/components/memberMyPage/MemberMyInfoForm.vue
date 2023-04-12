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

         <v-divider class="mt-3 mb-3"></v-divider>
         <div style="display: flex;">
            <span style="width: 30%; color: gray; font-size: 15px;">비밀번호</span>
            <span>⦁⦁⦁⦁⦁⦁⦁⦁</span>
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
   <div>
      <v-btn class="mb-6 brown darken-2 white--text" style="float: right;" @click="openDialog()">
            정보 수정
      </v-btn>
      <v-dialog
      v-model="dialog"
      @open-dialog="openDialog"
      width="400px"
      height="300px">
         <!-- dialog에 나올 UI -->
         <v-card>
            <v-card-title>비밀번호 확인</v-card-title>
            <v-card-text>
            <div>
               <div>
                  <v-text-field type="password" label="비밀번호를 입력하세요." v-model="password" :type="showPassword ? 'text' : 'password'" />
                  <v-checkbox
                     v-model="showPassword"
                     label="비밀번호 보기"
                  ></v-checkbox>
               </div>
            </div>
            </v-card-text>
            <v-card-actions>
                  <v-btn class="brown darken-2 white--text" @click="passwordCheck(), dialog =false" >확인</v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
   name: "MemberMyInfoForm",
   props: {
         myInfo: {
            type: Object,
            required: true,
         },
   },
   data () {
      return {
         email: JSON.parse(localStorage.getItem('userInfo')).email,
         password: '',
         dialog: false,
         showPassword: false,
      }
   },
   methods: {
      openDialog (commentId) {
         this.dialog = !this.dialog;
      },
      passwordCheck() {
         const { email, password } = this;
         axios
            .post("http://localhost:8888/member/sign-in", { email, password })
            .then((res) => {
              if (res.data) {//토큰이오면
               console.log('로그인 성공')
                this.$router.push({ name: 'MemberMyInfoModifyPage' })
              } else {
                alert("비밀번호가 틀렸습니다.");
              }
            })
            .catch((res) => {
               alert("비밀번호가 틀렸습니다.");
                console.log("로그인실패");
                console.log(res.response.data.message);
            });
      },
   },
}
</script>

<style>

</style>