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
                  <div style="width: 25%;">
                     <v-text-field
                     v-model="nickName"
                     label="닉네임"
                     :disabled="nickNamePass"
                     :rules="nickName_rule"
                     required
                     dense
                  />
                  </div>
                  <div class="ms-5">
                     <v-btn
                        dense
                        class="brown darken-2 white--text"
                        @click="checkDuplicateNickName"
                        :disabled="nickNamePass"
                        >중복 확인
                     </v-btn>
                  </div>
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
                  <div style="width: 30%;">
                     <v-text-field
                     type="text"
                     v-model="phoneNumber"
                     dense
                     label="전화번호 (' - ' 포함 11자리)"
                     :disabled="false"
                     :rules="phoneNumber_rule"
                     required
                     />
                  </div>
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
                  <span v-if="myInfo.address">{{ city }} {{ street }} {{ zipcode }}<v-text-field style="width: 30%;" type="text" v-model="addressDetail" dense /></span>
                  <v-btn @click="callDaumAddressApi">주소 변경</v-btn>
               </div>
            </div>
         </div>
         <div>
            <v-btn color="error" @click="withdrawal()">회원탈퇴</v-btn>
            <v-btn class="mb-6 brown darken-2 white--text" type="submit" style="float: right;" :disabled="!isFormValid()">
                  정보 수정
            </v-btn>
         </div>
      </div>
   </form>
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
         nickNamePass: false, //닉네임중복체크후 사용가능한 닉네임인지여부
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
         phoneNumber_rule: [
         (v) => !!v || "전화번호를 입력 해주세요.",
         (v) => {
            const replaceV = v.replace(/(\s*)/g, "");
            const pattern = /010-\d{4}-\d{4}/;
            return (
               pattern.test(replaceV) ||
               '전화번호 11자리를 입력해주세요. ("-"포함)'
            );
         },
         ],
         nickName_rule: [(v) => !!v || "닉네임을 입력해주세요."],
      }
   },
    methods: {
      ...mapActions(myPageModule,[
         'requestWithdrawalToSpring',
         'requestApplyNewPasswordToSpring',
         'requestLogoutToSpring',
         'requestSignUpCheckNickNameToSpring'
      ]),
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
         },
         }).open();
         
      },
      async checkDuplicateNickName() {
         console.log("this.nickName", this.nickName);
         if (!this.nickName) {
         this.$refs.form.validate();
         return;
         }
         const { nickName } = this;

         const res = await this.requestSignUpCheckNickNameToSpring(nickName);
         const isNickName = res.data;
         if (isNickName) {
         alert("사용 가능한 닉네임입니다!");
         this.nickNamePass = true;
         } else {
         alert("중복된 닉네임입니다!");
         this.nickNamePass = false;
         }
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
         await this.requestApplyNewPasswordToSpring({ email, password })

         // 로그아웃
         let token = localStorage.getItem("userInfo");
         const length = token.length;
         token = token.substr(1, length - 2);
         await this.requestLogoutToSpring({ token })

         await this.$router.push({ name: 'SignInPage' })
      },
      async withdrawal() {
         if(confirm('정말 탈퇴하시겠습니까?')) {
            // 로그아웃
            let token = localStorage.getItem("userInfo");
            const length = token.length;
            token = token.substr(1, length - 2);

            const memberId = this.memberId
            await this.requestWithdrawalToSpring({ memberId })

            await this.requestLogoutToSpring({ token })
            
            await this.$router.push({ name: 'MainPage' })
         }
         
      },
      isFormValid() {
         if(this.nickName != this.myInfo.nickName) {
            if(this.nickNamePass) {
               return (
                  this.addressDetail &&
                  this.phoneNumber_rule[1](this.phoneNumber) === true
               );
            }
            return false
         } else {
            return (
               this.addressDetail &&
               this.phoneNumber_rule[1](this.phoneNumber) === true
            );
         }
      },
    }
}
</script>

<style>

</style>