<template>
   <form @submit.prevent="onSubmit">
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
                  <v-btn @click="openDialog()" >비밀번호 변경</v-btn>
                  <v-dialog
                  v-model="dialog"
                  @open-dialog="openDialog"
                  width="400px"
                  height="300px">
                     <!-- dialog에 나올 UI -->
                     <v-card width="460">
                        <v-card-text class="text-center px-12 py-16">
                           <div class="text-h4 font-weight-black mb-10">
                              <span class="HANNA">비밀번호 재설정</span>
                           </div>

                           <div class="d-flex">
                              <v-text-field
                              type="password"
                              v-model="password"
                              label="비밀번호"
                              :rules="password_rule"
                              clearable
                              prepend-icon="mdi-lock-outline"
                              :counter="15"
                              color="orange"
                              />
                           </div>

                           <div>
                              <v-text-field
                              type="password"
                              v-model="passwordConfirm"
                              label="비밀번호 확인"
                              :rules="password_confirm_rule"
                              clearable
                              prepend-icon="mdi-lock-check-outline"
                              :counter="15"
                              color="orange"
                              />
                           </div>

                           <v-btn
                              type="submit"
                              block
                              x-large
                              rounded
                              color="orange lighten-1"
                              class="mt-6 brown darken-2 white--text"
                              @click="resetPw"
                              :disabled="false"
                              >비밀번호 변경</v-btn
                           >
                        </v-card-text>
                     </v-card>
                  </v-dialog>
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
                  <v-text-field type="text" v-model="phoneNumber" dense />
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
                  <span v-if="myInfo.address">{{ city }} {{ street }} {{ zipcode }}<v-text-field type="text" v-model="addressDetail" dense /></span>
                  <v-btn @click="callDaumAddressApi">주소 변경</v-btn>
               </div>
            </div>
         </div>
         <div>
            <v-btn class="mb-6 brown darken-2 white--text" type="submit" style="float: right;">
                  정보 수정
            </v-btn>
         </div>
      </div>
   </form>
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
         memberId: JSON.parse(localStorage.getItem('userInfo')).id,
         nickName: this.myInfo.nickName,
         birthdate: this.myInfo.birthdate,
         email: this.myInfo.email,
         phoneNumber: this.myInfo.phoneNumber,
         city: this.myInfo.address.city,
         street: this.myInfo.address.street,
         addressDetail: this.myInfo.address.addressDetail,
         zipcode: this.myInfo.address.zipcode,
         password: '',
         passwordConfirm: '',
         dialog: false,
         password_rule: [
         (v) =>
            this.state === "ins"
               ? !!v || "패스워드는 필수 입력사항입니다."
               : true,
         (v) =>
            !(v && v.length > 20) || "패스워드는 20자를 초과 입력할 수 없습니다.",
         ],
         password_confirm_rule: [
         (v) =>
            this.state === "ins"
               ? !!v || "패스워드는 필수 입력사항입니다."
               : true,
         (v) =>
            !(v && v.length >= 20) || "패스워드는 20자를 초과 입력할 수 없습니다.",
         (v) => v === this.password || "패스워드가 일치하지 않습니다.",
         ],
      }
   },
    methods: {
      openDialog () {
         this.dialog = !this.dialog;
      },
      callDaumAddressApi() {
         new window.daum.Postcode({
         oncomplete: (data) => {
            let fullRoadAddr = data.roadAddress;
            let extraRoadAddr = "";
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
               extraRoadAddr += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
               extraRoadAddr +=
               extraRoadAddr !== ""
                  ? ", " + data.buildingName
                  : data.buildingName;
            }
            if (extraRoadAddr !== "") {
               extraRoadAddr = " (" + extraRoadAddr + ")";
            }
            if (fullRoadAddr !== "") {
               fullRoadAddr += extraRoadAddr;
            }
            this.city = data.sido;
            this.zipcode = data.zonecode;
            this.street = data.sigungu + " " + fullRoadAddr;
            this.streetPass = true;
         },
         }).open();
         
      },
      onSubmit () {
         const { memberId, nickName, birthdate, phoneNumber, city, street, addressDetail, zipcode } = this
         this.$emit('submit', { memberId, nickName, birthdate, phoneNumber, city, street, addressDetail, zipcode })
      },
      async resetPw() {
         if (this.password != this.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return
         }

         //비밀번호 재설정하기.
         const { email, password } = this;
         await axios
            .post("http://localhost:8888/member/applyNewPassword/", {
               email, password,
            })
            .then(() => {
               alert("비밀번호가 변경되었습니다 다시 로그인 해주세요.");
            })

         // 로그아웃
         let token = localStorage.getItem("userInfo");
         const length = token.length;
         token = token.substr(1, length - 2);
         await axios
         .post("http://localhost:8888/member/logout", token) //토큰을 보냄
         .then(() => {
            localStorage.removeItem("userInfo"); //로컬스토리지에서 제거
            this.$store.state.isAuthenticated = false;
         });
         
         await this.$router.push({
            name: 'SignInPage',
         })
      },
    }
}
</script>

<style>

</style>