<template>
   <div justify="center">
      <product-list-form :products="products" :productImages="productImages"></product-list-form>
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
         'productImages'
      ])
   },
   methods: {
      ...mapActions([
         'requestProductListToSpring',
         'requestProductImageListToSpring'
      ])
   },
   async mounted() {
      await this.requestProductImageListToSpring()
      await this.requestProductListToSpring()
      console.log('products: ' + JSON.stringify(this.products))
   }
}
</script>

<style>

</style>