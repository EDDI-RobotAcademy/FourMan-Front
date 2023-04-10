<template>
   <v-container style="width: 1000px">
      <div v-if="!datas || (Array.isArray(datas) && datas.length === 0)" class="mt-2">
         <center>
            <h2>상품이 존재하지 않습니다.</h2>
         </center>
      </div>
      <div v-else class="mt-2">
         <product-card-form :datas="datas" @addCart="addCart"/>
      </div>
      <div class="mt-8">
         <product-cart-form :cartItems="cartItems" />
      </div>
   </v-container>
</template>

<script>
import ProductCardForm from '@/components/product/ProductCardForm.vue'
import ProductCartForm from '@/components/product/ProductCartForm.vue'

export default {
   name: "ProductListForm",
   components: { 
      ProductCardForm,
      ProductCartForm
   },
   data() {
      return {
         cartItems: [],
      }
   },
   props: {
      datas: {
         type: Array,
         required: true,
      },
      categoryDatas: {
         type: Array,
         required: true,
      }
   },
   methods: {
      addCart(receiveData) {
         var data = receiveData

         let item = this.cartItems.find((item) => item.productId === data.productId);
         if(item) {
            item.count++;
            item.totalPrice = item.price * item.count
         } else {
            this.cartItems.push(data)
         }
      },
      registerProduct() {
         this.$router.push( {
            name: 'ProductRegisterPage'
          })
      }
   },
}
</script>

<style>

</style>