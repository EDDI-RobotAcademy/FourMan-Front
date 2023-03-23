<template>
  <div>
      <v-simple-table style="text-align: center;">
         <thead>
            <tr>
               <th class="text-center">이미지</th>
               <th class="text-center">상품명</th>
               <th class="text-center">가격</th>
               <th class="text-center">수량</th>
               <th class="text-center">총합</th>
               <th class="text-center">삭제</th>
            </tr>
         </thead>
         <tbody>
            <tr v-if="!cartItems || (Array.isArray(cartItems) && cartItems.length === 0)">
               <td colspan="6">장바구니에 상품이 존재하지 않습니다</td>
            </tr>
            <tr v-else v-for="(cartItem, idx) in cartItems" :key="idx">
               <product-cart-list-form :cartItem="cartItem"></product-cart-list-form>
            </tr>
         </tbody>
      </v-simple-table>
   </div>
</template>

<script>
import ProductCartListForm from './ProductCartListForm.vue'
export default {
  components: { ProductCartListForm },
   name: "ProductCartForm",
   data() {
      return {

      }
   },
   props: {
      cartItems: {
         type: Array
      }
   },
   methods: {

   }
}
</script>

<style>

</style>