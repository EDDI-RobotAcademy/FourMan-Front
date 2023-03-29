<template>
   <v-container>
      <v-card align="center">
         <div>
            <v-img :src="require(`@/assets/product/uploadImgs/${data.imageResourcePath}`)" width="100px" height="150px">
               <template v-slot:placeholder>
                  <div class="fill-height ma-0" align="center" justify="center">
                     <v-progress-circular indeterminate color="grey lighten-5"/>
                  </div>
               </template>
            </v-img>
         </div>
         <div>
            <p>{{ data.productName }}</p>
         </div>
         <div>
            <p>{{ data.price }}원</p> 
         </div>
         <div>
            <v-btn class="brown lighten-1 white--text" @click="addCart(data)">장바구니 담기</v-btn>
         </div>
      </v-card>
   </v-container>
</template>

<script>

export default {
   name: "ProductCardForm",
   data() {
      return {

      }
   },
   props: {
      data: {
         type: Object,
      }
   },
   methods: {
      addCart(data) {
         this.$emit('addCart', data)
      }
   }
}
</script>

<style>

</style>