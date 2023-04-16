<template>
   <div justify="center">
      <product-list-form :datas="allOfProducts" :categoryDatas="categoryDatas" @categoryData="categoryData"></product-list-form>
   </div>
</template>

<script>
import ProductListForm from '@/components/product/ProductListForm.vue'
import { mapState, mapActions } from "vuex";

const productModule = 'productModule'

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
      ...mapState(
         productModule, ['allOfProducts'],
      ),
   },
   methods: {
      ...mapActions(
         productModule, ['requestAllOfProductToSpring'],
      ),
      categoryData(payload) {
         this.categoryDatas = payload
      }
   },
   async mounted() {
      await this.requestAllOfProductToSpring()
   },
}
</script>

<style>

</style>