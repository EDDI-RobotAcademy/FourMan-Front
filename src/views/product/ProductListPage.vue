<template>
   <div justify="center">
      <product-list-form :datas="allOfProducts" :categoryDatas="categoryDatas" @categoryData="categoryData"/>
   </div>
</template>

<script>
import ProductListForm from '@/components/product/ProductListForm.vue'
import { mapState, mapActions } from "vuex";

const reservationModule = 'reservationModule'
const productModule = 'productModule'

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
   },
   computed: {
      ...mapState(
         productModule, ['allOfProducts'],
      ),
      ...mapState(
               reservationModule, ['selectedSeats'],
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
   async created() {
      if(this.cafeId != null) {
         await this.requestAllOfProductToSpring(this.cafeId)
      } else {
         alert('카페 정보가 존재하지 않습니다. 카페 선택 창으로 이동합니다.');
         this.$router.push({ name: "CafeIntroBoardListPage" });
      }
   },
}
</script>

<style>

</style>