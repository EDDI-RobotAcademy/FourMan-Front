<template>
   <div class="d-flex">
      <my-page-side-bar-form />

      <v-container style="width: 1000px">
         <product-modify-form  :modifyProduct="modifyProduct"/>
      </v-container>
   </div>
</template>

<script>
import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'
import ProductModifyForm from '@/components/cafeMyPage/ProductModifyForm.vue'

export default {
   name: "ProductModifyPage",
   components: { 
      ProductModifyForm,
      MyPageSideBarForm
    },
   props: {
      modifyProduct: {
         type: Object,
         required: true
      }
   }

}
</script>

<style>

</style>