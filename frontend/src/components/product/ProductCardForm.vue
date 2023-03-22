<template>
   <v-container>
      <v-row>
         <v-col>
            <v-img aspect-ratio="1" :src="require(`@/assets/product/uploadImgs/${data.imageResourcePath}`)" width="100" >
               <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                     <v-progress-circular indeterminate color="grey lighten-5"/>
                  </v-row>
               </template>
            </v-img>
         </v-col>
      </v-row>
      <v-row>
         <p>{{ data.productName }}</p>
      </v-row>
      <v-row>
         <p>{{ data.price }}</p> 
      </v-row>
      <v-row>
         <v-btn color="primary">장바구니 담기</v-btn>
      </v-row>
   </v-container>
</template>

<script>
export default {
   name: "ProductCardForm",
   props: {
      data: {
         type: Object
      }
   }
}
</script>

<style>

</style>