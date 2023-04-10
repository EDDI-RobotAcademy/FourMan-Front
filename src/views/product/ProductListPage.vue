<template>
   <div justify="center">
      <product-list-form :datas="allOfProducts" :categoryDatas="categoryDatas" @categoryData="categoryData"></product-list-form>
   </div>
</template>

<script>
import ProductListForm from '@/components/product/ProductListForm.vue'

import { mapState, mapActions } from "vuex";

export default {
   name: "productListPage",
   components: {
      ProductListForm,
   },
   data() {
      return {
         categoryDatas: []
      }
   },
   computed: {
      ...mapState([
         'products',
         'productImages',
         'allOfProducts',
      ]),
   },
   methods: {
      ...mapActions([
         'requestProductListToSpring',
         'requestProductImageListToSpring',
         'requestAllOfProductToSpring'
      ]),
      categoryData(payload) {
         this.categoryDatas = payload
      }
   },
   async mounted() {
      await this.requestProductImageListToSpring()
      await this.requestProductListToSpring()
      await this.requestAllOfProductToSpring()
   },
}
</script>

<style>

</style>