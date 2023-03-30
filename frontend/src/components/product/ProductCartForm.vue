<template>
  <div>
      <v-simple-table fixed-header style="text-align: center;">
         <thead>
            <tr>
               <th class="text-center">이미지</th>
               <th class="text-center">상품명</th>
               <th class="text-center">단품 가격</th>
               <th class="text-center">수량</th>
               <th class="text-center fixed-column">총합 가격</th>
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
                  <v-img :src="require(`@/assets/product/uploadImgs/${cartItem.imageResourceList[0].imageResourcePath}`)" width="50px"/>
                  </center>
               </td>
               <td>{{ cartItem.productName }}</td>
               <td>{{ cartItem.price | comma }} 원</td>
               <td>
                  <v-btn xSmall @click="cartItemMinus(idx)">-</v-btn>
                  {{ cartItem.count }}
                  <v-btn xSmall @click="cartItemPlus(idx)">+</v-btn>
               </td>
               <td>
                  {{ cartItem.totalPrice | comma }} 원
               </td>
               <td><v-btn small @click="deleteCartItem(idx)">삭제</v-btn></td>
            </tr>
         </tbody>
      </v-simple-table>
      <v-card class="mt-10" style="height: 100px; border: 3px solid black" flat>
         <v-container style="width: 600px">
            <v-layout class="text-center" style="height: 100%; width: 100%; margin-top: 8px" justify-center>
              <div>
                <h5 style="font-weight: normal">상품 금액</h5>
                <span style="font-size: 30px; font-weight: bold">
                  {{ this.totalPrice | comma}}
                </span>
                <span>원</span>
              </div>
              <v-spacer></v-spacer>
              <h2 style="margin-top: 10px;">+</h2>
              <v-spacer></v-spacer>
              <div>
                <h5 style="font-weight: normal">예매 비용</h5>
                <div>
                  <span style="font-size: 30px; font-weight: bold">
                    {{ 3000 |comma}}
                  </span>
                  <span>원</span>
                </div>
              </div>
              <v-spacer></v-spacer>
              <h2 style="margin-top: 10px;">=</h2>
              <v-spacer></v-spacer>
              <div>
                <h5 style="font-weight: normal">총 금액</h5>
                <span style="font-size: 30px; font-weight: bold">
                  {{ this.totalPrice + 3000 |comma}}
                </span>
                <span>
                  원
                </span>
              </div>
            </v-layout>
         </v-container>
      </v-card>
      <v-container style="width: 800px">
          <v-btn width="100%" height="40px" elevation="0" style="background-color: #5F4F4F; color: white"
                 @click="totalOrder"
                 class="brown lighten-1 white--text">
            <h4>구매하기</h4>
          </v-btn>
        </v-container>
   </div>
</template>

<script>

export default {
   name: "ProductCartForm",
   data() {
      return {
         totalPrice: 0,
      }
   },
   props: {
      cartItems: {
         type: Array,
         required: true
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
         this.totalPrice = item.totalPrice
      },
      deleteCartItem(index) {
         this.cartItems.splice(index, 1);
      },
      totalOrder() {
         console.log('orderButtonClick: ' + JSON.stringify(this.cartItems) + ' totalPrice:' + this.totalPrice)
         
         localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
         localStorage.setItem("totalPrice", JSON.stringify(this.totalPrice));

         if((Array.isArray(this.cartItems) && this.cartItems.length === 0)) {
            alert('장바구니에 물품이 존재하지 않습니다.')
         } else {
            this.$router.push({
               name: "TotalOrderPage",
            })
         }
      },
   },
   async updated() {
      console.log('updatedCartItem: ' + JSON.stringify(this.cartItems))
   },
   watch: {
      cartItems: {
         deep: true,
         handler() {
            this.totalPrice = 0;
            for(let i = 0; i < this.cartItems.length; i++) {
             this.totalPrice += this.cartItems[i].totalPrice
            }
         }
      }
   },
   filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
   },
}
</script>

<style scoped>
.fixed-column {
  width: 150px;
}
</style>