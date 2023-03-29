<template>
   <v-container>
      <div>
         <total-order-form :cartItems="cartItems" :totalPrice="totalPrice" />
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
         totalPrice: 0,
      }
   },
   async created() {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems'))
      this.totalPrice = localStorage.getItem('totalPrice')
   }
}
</script>

<style>

</style>