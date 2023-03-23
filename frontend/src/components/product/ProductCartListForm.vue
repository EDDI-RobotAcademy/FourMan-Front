<template>
   <div>
      <td>
         <center>
         <v-img :src="require(`@/assets/product/uploadImgs/${cartItem.imageResourcePath}`)" width="50px"/>
         </center>
         </td>
      <td>{{ cartItem.productName }}</td>
      <td>{{ cartItem.price }}원</td>
      <td>
         <v-btn xSmall @click="cartItemMinus">-</v-btn>
         {{ cartItem.count }}
         <v-btn xSmall @click="cartItemPlus">+</v-btn>
      </td>
      <td>
         {{ cartItem.totalPrice }}원
      </td>
      <td><v-btn small @click="deleteCartItem">삭제</v-btn></td>
   </div>
</template>

<script>
export default {
   name: "ProductCartListForm",
   props: {
      cartItem: Object
   },
   methods: {
      deleteCartItem() {
         
      },
      cartItemPlus() {
         this.cartItem.count++
         this.cartItem.totalPrice = this.cartItem.price * this.cartItem.count
      },
      cartItemMinus() {
         if(this.cartItem.count > 1) {
            this.cartItem.count--
            this.cartItem.totalPrice = this.cartItem.price * this.cartItem.count
         }
      }
   },
   async updated() {
      console.log('dddcartItem: ' + JSON.stringify(this.cartItem))
   }
}
</script>

<style>

</style>