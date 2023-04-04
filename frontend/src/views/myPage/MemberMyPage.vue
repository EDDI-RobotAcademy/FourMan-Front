<template>
   <div>
      <my-page-side-bar-form />
      <v-container style="width: 1000px">
         <member-my-page-form />
      </v-container>
   </div>
</template>

<script>
import MemberMyPageForm from '@/components/myPage/MemberMyPageForm.vue'
import MyPageSideBarForm from '@/components/myPage/MyPageSideBarForm.vue'

export default {
   name: "MemberMyPage",
   components: {
      MemberMyPageForm,
      MyPageSideBarForm
   }
}
</script>

<style>

</style>