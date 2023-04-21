<template>
   <v-container>
      <div>
         <total-order-form :cartItems="cartItems" :totalOrderPrice="totalOrderPrice" :selectedSeats="selectedSeats"/>
      </div>
   </v-container>
</template>

<script>
import TotalOrderForm from '@/components/order/TotalOrderForm.vue'
import { mapState } from "vuex";

const reservationModule = 'reservationModule'

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
   },
   async created() {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems'))
      let isOrderPacking = JSON.parse(localStorage.getItem('isOrderPacking')) 
      if(isOrderPacking == false) {
         this.totalOrderPrice = 3000
      } 
      for(let i = 0; i < this.cartItems.length; i++) {
             this.totalOrderPrice += this.cartItems[i].totalPrice
      } 
      console.log("selectedSeats: " + JSON.stringify(this.selectedSeats))
   }
}
</script>

<style>

</style>