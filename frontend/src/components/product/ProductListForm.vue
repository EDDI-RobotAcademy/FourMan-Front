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
         <product-cart-form :carts="carts" />
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
         carts: [],
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
      const imageList = this.productImages
      const datas = products.map((product, index) => {
         return {
            imageResourcePath: imageList[index].imageResourcePath,
            productId: product.productId,
            productName: product.productName,
            price: product.price
         }
      })
      console.log('datas: ' + JSON.stringify(datas))
      this.datas = datas
    },
    methods: {
      addCart(receiveData) {
         var data = receiveData
         this.carts.push(data)
         // var carts = this.carts.concat(data)
         var carts = this.carts
         if (!carts.includes(data)) {
            carts.push(data);
         }
         this.carts = carts
         console.log('carts: ' + JSON.stringify(this.carts))
      }
    },
}
</script>

<style>

</style>