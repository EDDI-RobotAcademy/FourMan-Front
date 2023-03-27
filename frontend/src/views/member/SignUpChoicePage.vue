<template>
  <v-container>
    <div class="white" style="font-family: Arial">
      <v-col cols="auto" style="padding-bottom: 90px">
        <v-img
            :src="require('@/assets/사과.png')" width="400" class="mx-auto mb-6"/>
        <h5 class="text-md-center" style="font-weight: normal">
          회원 타입을 선택해주세요.</h5>
          <br><br>
        <v-row justify="center">
        <div style="margin-right: 30px">
            <router-link :to="{name: 'SignUpAcceptPage', params: { memberType: 'customer' } }" style="text-decoration: none">
            <v-btn width="200" height="150" text large outlined style
                   class="mx-auto" id="signUpButton1" color="#5D4037">
              <h5 style="font-weight: normal">
                <v-icon size="50px">mdi-account-plus</v-icon>
                <br/> 일반회원 회원가입
              </h5>
            </v-btn>
            </router-link>
          </div>

            
          <div style="margin-right: 30px">
            <router-link :to="{name: 'SignUpAcceptPage',params: { memberType: 'cafe' } }" 
                                style="text-decoration: none">
              <v-btn width="200" height="150" text large outlined style
                     class="mx-auto" id="signUpButton2" color="#5D4037">
                <h5 style="font-weight: normal">
                  <v-icon size="50px">mdi-account-plus-outline</v-icon>
                  <br/> 카페 사업자 회원가입
                </h5>
              </v-btn>
            </router-link>
          </div>

          <div style="margin-right: 30px">
            <router-link :to="{name: 'SignUpAcceptPage',params: { memberType: 'manager' } }" style="text-decoration: none">
              <v-btn width="200" height="150" text large outlined style
                     class="mx-auto" id="signUpButton3" color="#5D4037">
                <h5 style="font-weight: normal">
                  <v-icon size="50px">mdi-account-plus-outline</v-icon>
                  <br/> 관리자 회원가입
                </h5>
              </v-btn>
            </router-link>
          </div>
          
        </v-row>
        <div id="signUpButton" class="text-md-center">
          <h5 style="font-weight: normal">
            이미 가입한 계정이 있으신가요?</h5>
          <router-link to="/sign-in"
                       style="font-weight: normal; font-size: small">
            로그인 화면으로 이동하기
          </router-link>
        </div>
      </v-col>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "SignUpChoicePage"
}
</script>

<style scoped>
#signUpButton {
  margin-top: 50px;
  font-size: large;
}

</style>