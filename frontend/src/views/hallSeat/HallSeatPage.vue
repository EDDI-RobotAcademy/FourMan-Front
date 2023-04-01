<template>
  <v-container class="d-flex container" :fluid="true">

    <v-container class="my-custom-container" style="border:1px solid black;" :fluid="true">
      <hall-seat-form :seatData="seatData" :cafeId="cafeId"/>
    </v-container>
      

    <v-container class="reserve-container" style="border:1px solid black;" :fluid="true">
      <hall-seat-register-form />
    </v-container>
  </v-container>
</template>

<script>
import HallSeatForm from '@/components/hallSeat/HallSeatForm.vue'
import HallSeatRegisterForm from '@/components/hallSeat/HallSeatRegisterForm.vue'
export default {
  name: "HallSeatPage",
  components: {
    HallSeatForm,
    HallSeatRegisterForm
  },

  data() {
    return {
      cafeId: 1,
      seatData: [
        { id: 1, x: 10, y: 100, width: 50, height: 50, isReserved: false },
        { id: 2, x: 110, y: 100, width: 50, height: 50, isReserved: false },
        { id: 3, x: 210, y: 100, width: 50, height: 50, isReserved: true },
        { id: 4, x: 310, y: 100, width: 50, height: 50, isReserved: false },
        { id: 5, x: 10, y: 250, width: 50, height: 50, isReserved: false },
        { id: 6, x: 110, y: 250, width: 50, height: 50, isReserved: true },
        { id: 7, x: 10, y: 400, width: 50, height: 50, isReserved: false },
        { id: 8, x: 110, y: 400, width: 50, height: 50, isReserved: false },
        { id: 9, x: 10, y: 500, width: 50, height: 50, isReserved: true },
        { id: 10, x: 110, y: 500, width: 50, height: 50, isReserved: false },
        { id: 11, x: 10, y: 650, width: 50, height: 50, isReserved: false },
        { id: 12, x: 110, y: 650, width: 50, height: 50, isReserved: false },
        { id: 13, x: 350, y: 200, width: 50, height: 50, isReserved: true },
        { id: 14, x: 470, y: 200, width: 50, height: 50, isReserved: false },
        { id: 15, x: 350, y: 300, width: 50, height: 50, isReserved: false },
        { id: 16, x: 470, y: 300, width: 50, height: 50, isReserved: true },
        { id: 17, x: 350, y: 400, width: 50, height: 50, isReserved: false },
        { id: 18, x: 470, y: 400, width: 50, height: 50, isReserved: false },
      ],
    };
  },
};
</script>

<style scoped>
.my-custom-container{
  position:relative;
  height:800px;
  width:600px;
  max-width:none;

}
.reserve-container{
  height:800px;
  width:400px;
  max-width:none;

}
.container{
  border:1px solid red;
   max-width:none;
   width:1200px;

}
</style>