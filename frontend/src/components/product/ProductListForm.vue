<template>
   <div>
      <div>
         <v-row>
            <v-col v-if="!products || (Array.isArray(products) && products.length === 0)">
               <p>상품이 존재하지 않습니다.</p>
            </v-col>
            <v-col v-for="(data, index) in datas" :key="index" cols="2">
               <product-card-form :data="data" @addCart="addCart"/>
            </v-col> 
         </v-row>
      </div>
      <div>
         <product-cart-form :cartItems="cartItems" />
      </div>
   </div>
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
         datas: [],
         cartItems: [],
      }
   },
   props: {
      products: {
         type: Array,
      },
      productImages: {
         type: Array,
      }
   },
   async beforeUpdate() {
      const products = this.products
      const productImages = this.productImages
      const datas = products.map((product, index) => {
         return {
            imageResourcePath: productImages[index].imageResourcePath,
            productId: product.productId,
            productName: product.productName,
            price: product.price,
            count: 1,
            totalPrice: product.price,
         }
      })
      this.datas = datas
      console.log('datas: ' + JSON.stringify(datas))
    },
    methods: {
      addCart(receiveData) {
         var data = receiveData

         let item = this.cartItems.find((item) => item.productId === data.productId);
         if(item) {
            item.count++;
         } else {
            this.cartItems.push(data)
         }

         console.log('addCartItems: ' + JSON.stringify(this.cartItems))
      }
    },
}
</script>

<style>

</style>