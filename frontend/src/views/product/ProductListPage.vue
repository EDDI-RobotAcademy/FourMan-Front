<template>
   <div justify="center">
      

      <product-list-form :products="products"></product-list-form>

   </div>
</template>

<script>
import ProductListForm from "@/components/product/ProductListForm.vue";
import { mapState, mapActions } from "vuex";

export default {
   name: "productListPage",
   components: {
      ProductListForm
   },
   data() {
      return {
         
      }
   },
   computed: {
      ...mapState([
         'products'
      ])
   },
   methods: {
      ...mapActions([
         'reqProductListToSpring'
      ])
   },
   mounted() {
      this.reqProductListToSpring()
   }
}
</script>

<style>

</style>