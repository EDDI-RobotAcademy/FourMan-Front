<template>
  <v-container class="d-flex container" :fluid="true">
    <v-container
      class="my-custom-container"
      style="border: 1px solid black"
      :fluid="true"
    >
      <div v-if="selectedTime == null">예약 시간을 선택해 주세요!</div>
      <hall-seat-form v-else :seatData="seatData" :tableData="tableData" />
    </v-container>

    <v-container
      class="reserve-container"
      style="border: 1px solid black"
      :fluid="true"
    >
      <div id="registerForm">
        <v-form @submit.prevent="onSubmit">
          <table>
            <v-row>
              <v-col>
                <v-row class="mt-10 ml-1">
                  <v-col cols="6"
                    ><span class="font-weight-bold mr-10">카페명:</span>
                    {{ this.cafe.cafeName }}</v-col
                  >
                </v-row>
                <v-row class="ml-1">
                  <v-col cols="6"
                    ><span class="font-weight-bold mr-15">주소:</span>
                    {{ this.cafe.cafeAddress }}</v-col
                  >
                </v-row>
                <v-row class="ml-1">
                  <v-col cols="6"
                    ><span class="font-weight-bold mr-10">닉네임:</span>
                    {{ this.nickName }}</v-col
                  >
                </v-row>
                <v-row class="ml-1">
                  <v-col cols="6"
                    ><span class="font-weight-bold mr-10">예약일자:</span>
                    {{ getFormattedDate() }}
                    <!-- {{seatData}} -->
                    <!-- {{tableData}} -->
                    </v-col
                  >
                </v-row>

                <v-row class="ml-1">
                  <v-col cols="3"
                    ><span class="font-weight-bold">예약 시간:</span></v-col
                  >
                  <v-col cols="5">
                    <v-select
                      v-model="selectedTime"
                      :items="availableTimes"
                      @change="fetchReservations"
                      label="예약시간"
                      style="width: 200px"
                      outlined
                      dense
                    >
                    </v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-divider class="mt-10" />

            <!-- 등록하기 -->
            <v-row class="justify-center mt-15 mb-5">
              <div>
                <v-btn
                  @click="cancel"
                  class="brown darken-2 white--text"
                  large
                  style="width: 100px; font-size: 18px"
                  >취소</v-btn
                >
                <v-btn
                  type="submit"
                  class="ml-3 brown darken-2 white--text"
                  large
                  style="width: 100px; font-size: 18px"
                  >등록
                </v-btn>
              </div>
            </v-row>
          </table>
        </v-form>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import HallSeatForm from "@/components/hallSeat/HallSeatForm.vue";
// import HallSeatRegisterForm from '@/components/hallSeat/HallSeatRegisterForm.vue'
export default {
  name: "HallSeatPage",
  components: {
    HallSeatForm,
    // HallSeatRegisterForm
  },
  props: {
    cafe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      nickName: JSON.parse(localStorage.getItem("userInfo")).nickName,
      selectedTime: null,
      // times: [], // 예약 가능한 시간 리스트
      // seats: [], // 예약 가능한 자리 리스트
      // seatData: [
      //   { id: 1, x: 10, y: 100, width: 50, height: 50, isReserved: false },
      //   { id: 2, x: 110, y: 100, width: 50, height: 50, isReserved: false },
      //   { id: 3, x: 210, y: 100, width: 50, height: 50, isReserved: false },
      //   { id: 4, x: 310, y: 100, width: 50, height: 50, isReserved: false },
      //   { id: 5, x: 10, y: 250, width: 50, height: 50, isReserved: false },
      //   { id: 6, x: 110, y: 250, width: 50, height: 50, isReserved: false },
      //   { id: 7, x: 10, y: 400, width: 50, height: 50, isReserved: false },
      //   { id: 8, x: 110, y: 400, width: 50, height: 50, isReserved: false },
      //   { id: 9, x: 10, y: 500, width: 50, height: 50, isReserved: false },
      //   { id: 10, x: 110, y: 500, width: 50, height: 50, isReserved: false },
      //   { id: 11, x: 10, y: 650, width: 50, height: 50, isReserved: false },
      //   { id: 12, x: 110, y: 650, width: 50, height: 50, isReserved: false },
      //   { id: 13, x: 350, y: 200, width: 50, height: 50, isReserved: false },
      //   { id: 14, x: 470, y: 200, width: 50, height: 50, isReserved: false },
      //   { id: 15, x: 350, y: 300, width: 50, height: 50, isReserved: false },
      //   { id: 16, x: 470, y: 300, width: 50, height: 50, isReserved: false },
      //   { id: 17, x: 350, y: 400, width: 50, height: 50, isReserved: false },
      //   { id: 18, x: 470, y: 400, width: 50, height: 50, isReserved: false },
      // ],
    };
  },
  computed: {
    ...mapState(["seatData", "tableData"]),

    availableTimes() {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const nextHour = currentHour + (currentMinute >= 30 ? 1 : 0);
      const startTime = Math.max(parseInt(this.cafe.startTime), nextHour);
      const endTime = parseInt(this.cafe.endTime);

      const times = [];
      for (let hour = startTime; hour !== endTime; hour++) {
        if (hour === 24) {
          hour = 0;
        }
        const time = `${hour.toString().padStart(2, "0")}:00`;
        times.push(time);
      }
      return times;
    },
  },

  methods: {
    ...mapActions(["requestCafeSeatToSpring"]),
    async fetchReservations() {
      try {
        const payload = { cafeId: this.cafe.cafeId, time: this.selectedTime };
        await this.requestCafeSeatToSpring(payload);
      } catch (error) {
        alert("에러입니다.");
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    getKoreanDayOfWeek(date) {
      const dayOfWeek = date.getDay();
      const koreanDays = ["일", "월", "화", "수", "목", "금", "토"];
      return koreanDays[dayOfWeek];
    },
    getFormattedDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const koreanDayOfWeek = this.getKoreanDayOfWeek(now);
      return `${year}-${month}-${day} (${koreanDayOfWeek})`;
    },
  },
  // watch: {
  //   selectedTime() {
  //     this.fetchReservations();
  //   },
  // },
  async created() {
    console.log("this.cafe.startTime:", this.cafe.startTime);
    console.log(
      "new Date(this.cafe.startTime); ",
      new Date(this.cafe.startTime)
    );
    // console.log(
    //   "new Date(`${this.today}T${this.cafe.startTime}:00`)",
    //   new Date(`${this.today}T${this.cafe.startTime}:00`)
    // );

    // // 예약 가능한 시간 리스트 초기화
    // this.times = this.getReservationTimes();
    // // 예약 가능한 자리 리스트 초기화
    // this.seats = this.getAvailableSeats();
    // alert("created!")
    console.log("cafe: " + this.cafe);
    console.log("cafeId: " + this.cafe.cafeId);
  },
};
</script>

<style scoped>
.my-custom-container {
  position: relative;
  height: 800px;
  width: 600px;
  max-width: none;
}
.reserve-container {
  height: 800px;
  width: 400px;
  max-width: none;
}
.container {
  border: 1px solid red;
  max-width: none;
  width: 1200px;
}
table {
  margin-top: 5px;
  width: 100%;
}
tr {
  border: none;
}
td {
  border: none;
}

#registerForm {
  display: block;
  border: 1px solid lightgray;
  margin: 0 auto;
  line-height: 24px;
}
</style>