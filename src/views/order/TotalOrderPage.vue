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
         totalOrderPrice: 0,
      }
   },
   async created() {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems'))
      for(let i = 0; i < this.cartItems.length; i++) {
             this.totalOrderPrice += this.cartItems[i].totalPrice
      } 
   }
}
</script>

<style>

</style>