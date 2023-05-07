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
                  <!-- AWS s3 사용을 위한 주석 처리 -->
                  <!-- <v-img :src="require(`@/assets/product/uploadImgs/${cartItem.imageResourceList[0].imageResourcePath}`)" width="50px"/> -->
                  <v-img :src="`https://vue-s3-test-fourman.s3.ap-northeast-2.amazonaws.com/${cartItem.imageResourceList[0].imageResourcePath}`" width="50px" />
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
      <v-card v-if="isOrderPacking == false" class="mt-10" style="height: 100px; border: 3px solid black" flat>
         <v-container style="width: 850px;">
            <v-layout class="text-center" style="height: 100%; width: 100%; display:flex; align-items:center; margin-top: 4px;" justify-center>
               <div>
                     <h5 style="font-weight: normal">선택한 카페</h5>
                     <span style="font-size: 30px; font-weight: bold">
                        {{ this.selectedSeats.cafe.cafeName }}
                     </span>
               </div>
               <div class="ml-5">
                     <h5 style="font-weight: normal">예약 정보(좌석, 시간)</h5>
                     <div>
                        <span class="d-inline" style="font-size: 15px; font-weight: bold" v-for="(seat, idx) in selectedSeats.seatList" :key="idx">
                           ( {{ seat.seatNo }} )
                        </span>
                     </div>
                     <div>
                        <span style="font-size: 15px; font-weight: bold">
                           {{ selectedSeats.timeString }}
                        </span>
                     </div>
               </div>
               <v-spacer></v-spacer>
               <h2 style="margin-top: 10px;">|</h2>
               <v-spacer></v-spacer>
               <div>
                  <h5 style="font-weight: normal">상품 금액</h5>
                  <span style="font-size: 30px; font-weight: bold">
                     {{ this.totalOrderPrice | comma}}
                  </span>
                  <span>원</span>
               </div>
               <v-spacer></v-spacer>
               <h2 style="margin-top: 10px;">+</h2>
               <v-spacer></v-spacer>
               <div>
                  <h5 style="font-weight: normal">예약 비용</h5>
                  <div>
                     <span style="font-size: 30px; font-weight: bold">
                     {{ 1000 | comma}}
                     </span>
                     <span>원</span>
                  </div>
               </div>
               <v-spacer></v-spacer>
               <h2 style="margin-top: 10px;">=</h2>
               <v-spacer></v-spacer>
               <div>
                  <h5 style="font-weight: normal">예상 총 금액</h5>
                  <span style="font-size: 30px; font-weight: bold">
                     {{ this.totalOrderPrice + 1000 | comma}}
                  </span>
                  <span>
                     원
                  </span>
               </div>
            </v-layout>
         </v-container>
      </v-card>
      <v-card v-else class="mt-10" style="height: 100px; border: 3px solid black" flat>
         <v-container style="width: 500px">
            <v-layout class="text-center" style="height: 100%; width: 100%; display:flex; align-items:center; margin-top: 5px;" justify-center>
               <div>
                  <h5 style="font-weight: normal">선택한 카페(포장)</h5>
                  <span style="font-size: 30px; font-weight: bold">
                   {{ this.selectedSeats.cafe.cafeName }}
                  </span>
               </div>
               <v-spacer></v-spacer>
               <h2 style="margin-top: 10px;">|</h2>
               <v-spacer></v-spacer>
               <div>
                  <h5 style="font-weight: normal">예상 총 금액</h5>
                  <span style="font-size: 30px; font-weight: bold">
                     {{ this.totalOrderPrice | comma}}
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
            <h4>결제 페이지로 이동</h4>
          </v-btn>
        </v-container>
   </div>
</template>

<script>
import { mapState } from "vuex";

const reservationModule = 'reservationModule'
const orderModule = 'orderModule'

export default {
   name: "ProductCartForm",
   data() {
      return {
         totalOrderPrice: 0,
      }
   },
   props: {
      cartItems: {
         type: Array,
         required: true
      },
   },
   computed: {
      ...mapState(
               reservationModule, ['selectedSeats'],
      ),
      ...mapState(
               orderModule, ['isOrderPacking'],
      ),
   },
   methods: {
      cartItemMinus(index) {
         var item = this.cartItems[index]
         if(item.count > 1) {
            item.count--
            item.totalPrice = item.price * item.count
         }
      },
      cartItemPlus(index) {
         var item = this.cartItems[index]
         item.count++
         item.totalPrice = item.price * item.count
         this.totalOrderPrice = item.totalPrice
      },
      deleteCartItem(index) {
         this.cartItems[index].count = 1
         this.cartItems[index].totalPrice = this.cartItems[index].price
         this.cartItems.splice(index, 1);
      },
      totalOrder() {
         if((Array.isArray(this.cartItems) && this.cartItems.length === 0)) {
            alert('장바구니에 물품이 존재하지 않습니다.')
         } else {
            if(this.isOrderPacking == false) {
               let totalItemCount = this.cartItems.reduce((acc, cur) => acc + cur.count, 0);
               if(totalItemCount < this.selectedSeats.seatList.length) {
                  alert('1 좌석 당 1 메뉴는 주문해주셔야 합니다.')
               } else {
                  const cartItems = this.cartItems
                  localStorage.setItem("cartItems", JSON.stringify(cartItems));
                  this.$router.push({
                     name: "TotalOrderPage",
                  })
               }
            } else {
               const cartItems = this.cartItems
               localStorage.setItem("cartItems", JSON.stringify(cartItems));
               this.$router.push({ 
                  name: "TotalOrderPage",
               })
            }
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
            this.totalOrderPrice = 0;
            for(let i = 0; i < this.cartItems.length; i++) {
             this.totalOrderPrice += this.cartItems[i].totalPrice
            }
         }
      }
   },
   filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
   },
   mounted() {
      console.log("selectedSeats: " + JSON.stringify(this.selectedSeats))
   }
}
</script>

<style scoped>
.fixed-column {
  width: 150px;
}
</style>