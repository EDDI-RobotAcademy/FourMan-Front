<template>
   <div justify="center">
      <!-- <product-list-form :products="products" :productImages="productImages"></product-list-form> -->
      <product-list-form :datas="allOfProducts"></product-list-form>
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
         
      }
   },
   computed: {
      ...mapState([
         'products',
         'productImages',
         'allOfProducts',
      ])
   },
   methods: {
      ...mapActions([
         'requestProductListToSpring',
         'requestProductImageListToSpring',
         'requestAllOfProductToSpring'
      ])
   },
   async mounted() {
      await this.requestProductImageListToSpring()
      await this.requestProductListToSpring()
      await this.requestAllOfProductToSpring()
   }
}
</script>

<style>

</style>