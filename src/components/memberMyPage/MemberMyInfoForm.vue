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
            <span style="width: 30%;">닉네임</span>
            <span>닉네임 데이터</span>
         </div>
         
         <v-divider class="mt-3 mb-3"></v-divider>
         <div style="display: flex;">
            <span style="width: 30%;">생년월일</span>
            <span>생년월일 데이터</span>
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
            <span style="width: 30%;">이메일</span>
            <span>이메일 데이터</span>
         </div>
         <v-divider class="mt-3 mb-3"></v-divider>
         <div style="display: flex;">
            <span style="width: 30%;">휴대전화</span>
            <span>휴대전화 데이터</span>
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
            <span style="width: 30%;">주소</span>
            <span>주소 데이터</span>
         </div>
      </div>
   </div>
  </div>
</template>

<script>
export default {
   name: "MemberMyInfoForm",
}
</script>

<style>

</style>