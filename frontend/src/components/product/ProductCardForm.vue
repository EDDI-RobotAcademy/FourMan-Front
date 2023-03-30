<template>
   <div>
      <v-card align="center">
         <div class="pt-2">
            <v-img :src="require(`@/assets/product/uploadImgs/${data.imageResourceList[0].imageResourcePath}`)" width="50px" height="100px">
               <template v-slot:placeholder>
                  <div class="fill-height ma-0" align="center" justify="center">
                     <v-progress-circular indeterminate color="grey lighten-5"/>
                  </div>
               </template>
            </v-img>
         </div>
         <div class="mt-2">
            <p>{{ data.productName }}</p>
         </div>
         <div>
            <p>{{ data.price | comma }}원</p> 
         </div>
         <div class="pb-2">
            <v-btn color="blue-grey lighten-1" @click="addCart(data)">장바구니 담기</v-btn>
         </div>
      </v-card>
   </div>
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
   },
   filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
   },
}
</script>

<style>

</style>