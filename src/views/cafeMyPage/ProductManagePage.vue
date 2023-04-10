<template>
   <div>
      <my-page-side-bar-form />

      <v-container style="width: 1000px">
         <product-manage-form :productList="allOfProducts" />
      </v-container>
   </div>
</template>

<script>
import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'
import ProductManageForm from '@/components/cafeMyPage/ProductManageForm.vue'

import { mapState, mapActions } from "vuex";

export default {
   name: "ProductManagePage",
   components: {
      MyPageSideBarForm,
      ProductManageForm,
   },
   data() {
      return {
         
      }
   },
   computed: {
      ...mapState([
         'allOfProducts',
      ]),
   },
   methods: {
      ...mapActions([
         'requestAllOfProductToSpring'
      ]),
   },
   async mounted() {
      await this.requestAllOfProductToSpring()
      console.log('mounted: ' + JSON.stringify(this.allOfProducts))
   }
}
</script>

<style>

</style>