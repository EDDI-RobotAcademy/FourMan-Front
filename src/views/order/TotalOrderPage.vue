<template>
   <v-container>
      <div>
         <total-order-form :cartItems="cartItems" :totalOrderPrice="totalOrderPrice" :selectedSeats="selectedSeats" :isOrderPacking="isOrderPacking" :holdPoint="holdPoint"/>
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
   },
   methods: {
      ...mapActions(
         orderModule, ['requestHoldPointToSpring'],
      ),
   },
   async created() {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems'))
      if(this.isOrderPacking == false) {
         this.totalOrderPrice = 3000
      } 
      for(let i = 0; i < this.cartItems.length; i++) {
             this.totalOrderPrice += this.cartItems[i].totalPrice
      } 
      this.requestHoldPointToSpring(JSON.parse(localStorage.getItem('userInfo')).id)
      console.log("selectedSeats: " + JSON.stringify(this.selectedSeats))
   }
}
</script>

<style>

</style>