<template>
   <v-container>
      <v-row>
         <v-col>
            <v-img aspect-ratio="1" :src="require(`@/assets/product/uploadImgs/${product.productInfo.imageSourcePath}`)" 
            width="100" >
               <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                     <v-progress-circular indeterminate color="grey lighten-5"/>
                  </v-row>
               </template>
            </v-img>
         </v-col>
      </v-row>
      <v-row>
         <p>{{ product.name }}</p>
      </v-row>
      <v-row>
         <p>{{ product.price }}</p> 
      </v-row>
      <v-row>
         <v-btn color="primary" v-on="on">장바구니 담기</v-btn>
      </v-row>
   </v-container>
</template>

<script>
export default {
   name: "ProductCard",
   props: {
      product: {
         type: Object,
         required: true
      }
   }
}
</script>

<style>

</style>