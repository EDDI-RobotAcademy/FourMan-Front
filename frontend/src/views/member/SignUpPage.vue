<template>
  <v-container>
  <!-- 일반회원 회원가입 -->
    <div v-if="this.memberType==='customer'">
    <sign-up-form  :memberType="memberType" @submit="onSubmit"/>
    </div>
    <div v-else>
    <!-- 카페사업자, 관리자 회원가입-->
    <sign-up-cafe-manager-form :memberType="memberType" @submit="onSubmit"/>
    </div>

    
  </v-container>
</template>

<script>
import axios from "axios";
import SignUpForm from "@/components/member/SignUpForm";
import SignUpCafeManagerForm from "@/components/member/SignUpCafeManagerForm";

export default {
  name: "SignUpPage",
   props: {
          memberType: {
            type: String,
            required: true
        }
    },
  components: {
    SignUpForm,
    SignUpCafeManagerForm
  },
  mounted: function(){
    console.log("this.memberType: ", this.memberType)
    if (this.memberType===undefined){
      this.$router.push({
                name: 'SignUpChoicePage'
            })
    }
  },
  methods: {
    onSubmit (payload) {
      const { email, password,nickName,birthdate,phoneNumber,authorityName, code , city, street, addressDetail, zipcode } = payload;
      axios.post("http://localhost:8888/member/sign-up", {
        email, password, city,nickName,birthdate,phoneNumber,authorityName, code , street, addressDetail, zipcode
      })
          .then((res) => {
            alert("회원 가입 완료!" + res)
            this.$router.push("/sign-in")
          })
          .catch((res) => {
            alert(res.response.data.message)
          })
    }
  }
}
</script>

<style scoped>
</style>