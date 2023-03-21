<template>
   <div>
      <v-row>
         <v-col v-if="!products || (Array.isArray(products) && products.length === 0)">
            <p>상품이 존재하지 않습니다.</p>
         </v-col>
         <v-col v-for="(data, index) in datas" :key="index" cols="2">
            <product-card-form :data="data"/>
         </v-col> 
      </v-row>
   </div>
</template>

<script>
import ProductCardForm from '@/components/product/ProductCardForm.vue'

export default {
   name: "ProductListForm",
   components: { 
      ProductCardForm,  
   },
   data() {
      return {
         datas: []
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

}
</script>

<style>

</style>