<template>
   <v-container>
      <div>
         <total-order-form :cartItems="cartItems" :totalOrderPrice="totalOrderPrice"/>
      </div>
   </v-container>
</template>

<script>
import TotalOrderForm from '@/components/order/TotalOrderForm.vue'

export default {
   name: "TotalOrderPage",
   components: {
      TotalOrderForm,
   },
   data() {
      return {
         cartItmes: [],
      }
   },
   props: {
      totalOrderPrice: {
         type: Number,
         required: true
      },
      selectedSeats: {
         type: Object,
         required: true,
      }
   },
   async created() {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems'))
      console.log("selectedSeats: " + JSON.stringify(this.selectedSeats))
   }
}
</script>

<style>

</style>