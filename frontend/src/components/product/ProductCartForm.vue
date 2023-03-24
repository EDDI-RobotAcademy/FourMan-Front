<template>
  <div>
      <v-simple-table fixed-header style="text-align: center;">
         <thead>
            <tr>
               <th class="text-center">이미지</th>
               <th class="text-center">상품명</th>
               <th class="text-center">가격</th>
               <th class="text-center">수량</th>
               <th class="text-center fixed-column">총합</th>
               <th class="text-center">삭제</th>
            </tr>
         </thead>
         <tbody>
            <tr v-if="!cartItems || (Array.isArray(cartItems) && cartItems.length === 0)">
               <td colspan="6">장바구니에 상품이 존재하지 않습니다</td>
            </tr>
            <tr v-else v-for="(cartItem, idx) in cartItems" :key="idx">
               <td>
                  <center>
                  <v-img :src="require(`@/assets/product/uploadImgs/${cartItem.imageResourcePath}`)" width="50px"/>
                  </center>
                  </td>
               <td>{{ cartItem.productName }}</td>
               <td>{{ cartItem.price }}원</td>
               <td>
                  <v-btn xSmall @click="cartItemMinus(idx)">-</v-btn>
                  {{ cartItem.count }}
                  <v-btn xSmall @click="cartItemPlus(idx)">+</v-btn>
               </td>
               <td>
                  {{ cartItem.totalPrice }}원
               </td>
               <td><v-btn small @click="deleteCartItem(idx)">삭제</v-btn></td>
            </tr>
         </tbody>
      </v-simple-table>
   </div>
</template>

<script>

export default {
   name: "ProductCartForm",
   data() {
      return {

      }
   },
   props: {
      cartItems: {
         type: Array
      }
   },
   methods: {
      cartItemMinus(cartItem) {
         var item = this.cartItems[cartItem]
         if(item.count > 1) {
            item.count--
            item.totalPrice = item.price * item.count
         }
      },
      cartItemPlus(cartItem) {
         var item = this.cartItems[cartItem]
         item.count++
         item.totalPrice = item.price * item.count
         // let item = this.cartItems.find((item) => item.cartItem.productId === cartItem.productId);
         // if(item) {
            
            // }
         // this.cartItem.count++
         // this.cartItem.totalPrice = this.cartItem.price * this.cartItem.count
      },
      deleteCartItem(index) {
         this.cartItems.splice(index, 1);
      },
   },
   async updated() {
      console.log('updatedCartItem: ' + JSON.stringify(this.cartItems))
   }
}
</script>

<style scoped>
.fixed-column {
  width: 100px;
}
</style>