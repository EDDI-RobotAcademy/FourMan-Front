<template>
   <div>
      <my-page-side-bar-form />
      
      <v-container style="width: 1000px">
         <member-my-info-form />
      </v-container>
   </div>
</template>

<script>
import MemberMyInfoForm from '@/components/memberMyPage/MemberMyInfoForm.vue'
import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'

export default {
   name: "MemberMyPage",
   components: {
      MemberMyInfoForm,
      MyPageSideBarForm
   }
}
</script>

<style>

</style>