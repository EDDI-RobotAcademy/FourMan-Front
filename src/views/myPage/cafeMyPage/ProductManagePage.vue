<template>
   <div class="d-flex">
      <my-page-side-bar-form />

      <v-container style="width: 1000px">
         <product-manage-form :productList="allOfProducts" />
      </v-container>
   </div>
</template>

<script>
import MyPageSideBarForm from '@/components/myPage/MyPageSideBarForm.vue'
import ProductManageForm from '@/components/myPage/cafeMyPage/ProductManageForm.vue'
import { mapState, mapActions } from "vuex";

const productModule = 'productModule'

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
      ...mapState(
         productModule, ['allOfProducts'],
      ),
   },
   methods: {
      ...mapActions(
         productModule, ['requestAllOfProductToSpring'],
      ),
   },
   async mounted() {
      const cafeId = JSON.parse(localStorage.getItem('userInfo')).cafeId
      if(cafeId != null) {
         await this.requestAllOfProductToSpring(cafeId)
      }
      console.log('Products: ' + JSON.stringify(this.allOfProducts))
   }
}
</script>

<style>

</style>