<template>
   <div>
      <v-row>
         <v-col v-if="!products || (Array.isArray(products) && products.length === 0)">
            <p>상품이 존재하지 않습니다.</p>
         </v-col>
         <!-- <v-col v-for="(imagePath, idx) in productImages" :key="idx" cols="12">
            <product-card-image-form :imagePath="imagePath" />
         </v-col>
         <v-col v-for="(product, index) in products" :key="index" cols="12">
            <product-card-form :product="product"/>
         </v-col> -->
         <v-col v-for="(data, index) in datas" :key="index" cols="12">
            <product-card-form :data="data"/>
         </v-col> 
      </v-row>
   </div>
</template>

<script>
import ProductCardForm from '@/components/product/ProductCardForm.vue'
import ProductCardImageForm from '@/components/product/ProductCardImageForm.vue'

export default {
   name: "ProductListForm",
   components: { 
      ProductCardForm, 
      ProductCardImageForm 
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
   created() {
      console.log('productImages: ' + JSON.stringify(this.productImages))
      for(let i = 0; i < this.products.length; i++) {
         var { datas } = this.datas

         datas[i] = this.products[i].concat(this.productImages[i])
         console.log('datas: ' + JSON.stringify(datas[i]))
      }
   }

}
</script>

<style>

</style>