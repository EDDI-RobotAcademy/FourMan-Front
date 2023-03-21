<template>
   <div>
      <v-row>
         <v-col v-if="!products || (Array.isArray(products) && products.length === 0)">
            <p>상품이 존재하지 않습니다.</p>
         </v-col>
         <v-col v-for="(product, index) in products" :key="index" cols="2">
            <product-card :product="product"></product-card>
         </v-col>
      </v-row>
   </div>
</template>

<script>
import ProductCard from '@/components/product/ProductCard.vue'

export default {
   name: "ProductListForm",
   components: { ProductCard },
   props: {
      products: {
         type: Array,
      }
   },

}
</script>

<style>

</style>