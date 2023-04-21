<template>
   <div justify="center">
      <product-list-form :datas="allOfProducts" :categoryDatas="categoryDatas" @categoryData="categoryData" :isPacking="isPacking" />
   </div>
</template>

<script>
import ProductListForm from '@/components/product/ProductListForm.vue'
import { mapState, mapActions } from "vuex";

const productModule = 'productModule'
const reservationModule = 'reservationModule'

export default {
   name: "ProductListPage",
   components: {
      ProductListForm,
   },
   data() {
      return {
         categoryDatas: []
      }
   },
   props: {
      cafeId: {
         type: Number,
         required: true
      },
      isPacking: {
         type: Boolean,
         required: true,
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
      console.log('cafeId: ' + this.cafeId)
      if(this.cafeId != null) {
         await this.requestAllOfProductToSpring(this.cafeId)
      }
   },
}
</script>

<style>

</style>