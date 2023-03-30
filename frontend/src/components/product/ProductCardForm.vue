<template>
   <div>
      <div v-if="!datas || (Array.isArray(datas) && datas.length === 0)">
         <center>
            <h2>상품이 존재하지 않습니다.</h2>
         </center>
      </div>
      <div v-else class="ma-2" style="display: inline-block;" v-for="(data, index) in datas" :key="index">
         <v-card class="pa-3" align="center">
            <div>
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
            <div>
               <v-btn class="brown darken-2 white--text" @click="addCart(data)">장바구니 담기</v-btn>
            </div>
         </v-card>
      </div> 
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
      datas: {
         type: Array,
         required: true,
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