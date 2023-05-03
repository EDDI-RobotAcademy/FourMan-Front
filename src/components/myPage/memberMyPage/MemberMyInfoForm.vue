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
         <v-card width="460">
                        <v-card-text class="text-center px-12 py-16">
                           <div class="text-h4 font-weight-black mb-10">
                              <span class="HANNA">비밀번호 확인</span>
                           </div>

                           <div class="d-flex">
                              <v-text-field
                              v-model="password"
                              label="비밀번호"
                              :rules="password_rule"
                              clearable
                              prepend-icon="mdi-lock-outline"
                              :counter="15"
                              color="orange"
                              :type="inputType"
                              />
                           </div>
                           <div>
                              <v-checkbox
                                 v-model="showPassword"
                                 label="비밀번호 보기"
                              />
                           </div>

                           <v-btn
                              type="submit"
                              block
                              x-large
                              rounded
                              color="orange lighten-1"
                              class="mt-6 brown darken-2 white--text"
                              @click="passwordCheck()"
                              :disabled="false"
                              >확인</v-btn
                           >
                        </v-card-text>
                     </v-card>
      </v-dialog>
   </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
const myPageModule= 'myPageModule'

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
         password_rule: [
         (v) =>
            this.state === "ins"
               ? !!v || "패스워드는 필수 입력사항입니다."
               : true,
         (v) =>
            !(v && v.length > 20) || "패스워드는 20자를 초과 입력할 수 없습니다.",
         ],
      }
   },
   methods: {
      ...mapActions(myPageModule,[
         'requestPasswordCheckToSpring'
      ]),
      openDialog () {
         this.dialog = !this.dialog;
      },
      async passwordCheck() {
         const { email, password } = this;
         const boolean = await this.requestPasswordCheckToSpring({ email, password })
         if(boolean) {
            this.$router.push({ name: 'MemberMyInfoModifyPage'})
         }
      },
   },
   computed: {
      inputType() {
         return this.showPassword ? 'text' : 'password';
      },
   },
}
</script>

<style>

</style>