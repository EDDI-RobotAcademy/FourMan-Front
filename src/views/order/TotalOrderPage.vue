<template>
   <v-container>
      <div>
         <total-order-form :cartItems="cartItems" :totalOrderPrice="totalOrderPrice" :selectedSeats="selectedSeats" :isOrderPacking="isOrderPacking" :numberHoldPoint="numberHoldPoint"/>
      </div>
   </v-container>
</template>

<script>
import TotalOrderForm from '@/components/order/TotalOrderForm.vue'
import { mapState, mapActions } from "vuex";

const reservationModule = 'reservationModule'
const orderModule = 'orderModule'

export default {
   name: "TotalOrderPage",
   components: {
      TotalOrderForm,
   },
   data() {
      return {
         cartItmes: [],
         totalOrderPrice: 0,
      }
   },
   computed: {
      ...mapState(
         reservationModule, ['selectedSeats'],
      ),
      ...mapState(
         orderModule, ['holdPoint', 'isOrderPacking']
      ),
      numberHoldPoint() {
         return Number(this.holdPoint);
      }
   },
   methods: {
      ...mapActions(
         orderModule, ['requestHoldPointToSpring'],
      ),
   },
   async created() {
      if(this.isOrderPacking != true && this.isOrderPacking != false) {
         alert('카페 정보가 존재하지 않습니다. 카페 선택 창으로 이동합니다.');
         this.$router.push({ name: "CafeIntroBoardListPage" });
      } else {
         this.cartItems = JSON.parse(localStorage.getItem('cartItems'))
         for(let i = 0; i < this.cartItems.length; i++) {
                this.totalOrderPrice += this.cartItems[i].totalPrice
         } 
         this.requestHoldPointToSpring(JSON.parse(localStorage.getItem('userInfo')).id)
         console.log("selectedSeats: " + JSON.stringify(this.selectedSeats))
      }
   }
}
</script>

<style>

</style>