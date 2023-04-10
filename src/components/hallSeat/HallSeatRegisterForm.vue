<template>
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
              <v-col cols="3"
                ><span class="font-weight-bold">예약 시간:</span></v-col
              >
              <v-col cols="5">
                <v-select
                  v-model="selectedTime"
                  :items="availableTimes"
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
</template>


<script>
import axios from "axios";

export default {
  name: "HallSeatRegisterForm",

  props: {
    cafe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      nickName: JSON.parse(localStorage.getItem("userInfo")).nickName,
      today: new Date().toISOString().slice(0, 10),
      selectedTime: null,
      times: [], // 예약 가능한 시간 리스트
      seats: [], // 예약 가능한 자리 리스트
    };
  },
  created() {
    console.log("this.cafe.startTime:", this.cafe.startTime);
    console.log(
      "new Date(this.cafe.startTime); ",
      new Date(this.cafe.startTime)
    );
    console.log("this.today: ", this.today);
    console.log(
      "new Date(`${this.today}T${this.cafe.startTime}:00`)",
      new Date(`${this.today}T${this.cafe.startTime}:00`)
    );

    // // 예약 가능한 시간 리스트 초기화
    // this.times = this.getReservationTimes();
    // // 예약 가능한 자리 리스트 초기화
    // this.seats = this.getAvailableSeats();
  },
  computed: {
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
    roundTime(time) {
      const hour = time.getHours();
      const minute = time.getMinutes();
      time.setMinutes(0);
      time.setSeconds(0);
      time.setMilliseconds(0);
      if (hour % 2 !== 0) {
        time.setHours(hour + 1);
      }
      return time;
    },

    getReservationTimes() {
      const times = [];
      const startTime = new Date(
        new Date(`${this.today}T${this.cafe.startTime}:00`)
      );
      const endTime = new Date(
        new Date(`${this.today}T${this.cafe.endTime}:00`)
      );
      while (startTime <= endTime) {
        // 시간을 카페의 예약 간격으로 반올림하여 리스트에 추가합니다.
        times.push(this.roundTime(startTime, reservation_interval));
        startTime.setTime(
          startTime.getTime() + reservation_interval * 60 * 1000
        );
      }
      return times;
    },
    // 선택 가능한 자리 리스트를 가져옵니다.
    getAvailableSeats() {
      // 예약 가능한 자리 리스트를 API에서 가져옵니다.
      // 예: axios.get('/api/seats')
      return [
        { id: 1, name: "A1", reserved_time: new Date("2023-04-01T10:00:00") },
        { id: 2, name: "A2", reserved_time: new Date("2023-04-01T12:00:00") },
      ];
    },

    async onSubmit() {
      console.log("카페 등록- registerform");

      let formData = new FormData();

      let cafeContents = {
        cafeName: this.cafeName,
        cafeAddress: this.cafeAddress,
        startTime: this.startTime,
        endTime: this.endTime,
        code: JSON.parse(localStorage.getItem("userInfo")).code,
      };

      formData.append(
        "info",
        new Blob([JSON.stringify(cafeContents)], {
          type: "application/json",
        })
      );
      await axios
        .post("http://localhost:8888/cafe/register", formData)
        .then((res) => {
          alert(res.data);
        })
        .catch((res) => {
          alert(res.message);
        });

      await this.$router.push({ name: "CafeIntroBoardListPage" });
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
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