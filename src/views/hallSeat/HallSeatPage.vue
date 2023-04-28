<template>
  <v-container class="d-flex container" :fluid="true">
    <v-container class="my-custom-container" :fluid="true">
      <h1 v-if="selectedTime == null" class="text-center title-text">
        당일 예약만 가능합니다.<br />
        예약 시간을 선택해 주세요!
      </h1>
      <hall-seat-form
        v-else
        :seatData="seatData"
        :tableData="tableData"
        :cafe="cafe"
        @onUpdateSelectedSeats="onUpdateSelectedSeats"
        @update-seats-count="onUpdateSeatsCount"
        ref="hallSeatForm"
      />
    </v-container>

    <v-container class="reserve-container" :fluid="true">
      <div id="registerForm">
        <v-form @submit.prevent="onSubmit">
          <table>
            <v-row>
              <v-col>
                <div
                  :class="[{ 'is-reserved': true }, 'seat']"
                  :style="{
                    left: '0px',
                    top: '0px',
                    width: '50px',
                    height: '50px',
                    display: 'inline-block',
                  }"
                >
                  <svg-icon type="mdi" :path="path"></svg-icon>
                </div>
                <span>예약 중</span>
                <div
                  :class="[{ 'is-reserved': false }, 'seat', 'ml-10']"
                  :style="{
                    left: '0px',
                    top: '0px',
                    width: '50px',
                    height: '50px',
                    display: 'inline-block',
                  }"
                >
                  <svg-icon type="mdi" :path="path"></svg-icon>
                </div>
                예약 가능

                <v-row class="mt-10 ml-1">
                  <v-col cols="6"
                    ><span class="font-weight-bold mr-10 info-text"
                      >카페명:</span
                    >
                    {{ this.cafe.cafeName }}</v-col
                  >
                </v-row>
                <v-row class="ml-1">
                  <v-col cols="6"
                    ><span class="font-weight-bold mr-15 info-text">주소:</span>
                    {{ this.cafe.cafeAddress }}</v-col
                  >
                </v-row>
                <v-row class="ml-1">
                  <v-col cols="6"
                    ><span class="font-weight-bold mr-10 info-text"
                      >닉네임:</span
                    >
                    {{ this.nickName }}</v-col
                  >
                </v-row>
                <v-row class="ml-1">
                  <v-col cols="6"
                    ><span class="font-weight-bold mr-10 info-text"
                      >예약일자:</span
                    >
                    {{ getFormattedDate() }}
                  </v-col>
                </v-row>

                <v-row class="ml-1">
                  <v-col cols="3"
                    ><span class="font-weight-bold info-text"
                      >예약 시간:</span
                    ></v-col
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

                <v-row class="ml-1">
                  <v-col cols="6"
                    ><span class="font-weight-bold mr-15 info-text"
                      >전체 좌석수:</span
                    >
                    {{ this.total }} 석</v-col
                  >
                </v-row>
                <v-row class="ml-1">
                  <v-col cols="6"
                    ><span class="font-weight-bold mr-6 info-text"
                      >예약 가능 좌석수:</span
                    >
                    {{ this.unreserved }} 석</v-col
                  >
                </v-row>

                <v-row class="ml-1">
                  <v-col cols="12"
                    ><h3 class="font-weight-bold mr-10 info-text">선택 좌석</h3>
                    <div v-if="selectedSeats.length">
                      <ul>
                        <li v-for="seat in selectedSeats" :key="seat.seatNo">
                          {{ seat.seatNo }}
                        </li>
                      </ul>
                    </div></v-col
                  >
                </v-row>
              </v-col>
            </v-row>

            <v-divider class="mt-10" />

            <!-- 등록하기 -->
            <v-row class="justify-center mt-15 mb-5">
              <div>
                <v-btn
                  @click="cancel"
                  class="brown darken-2 white--text custom-btn"
                  large
                  style="width: 100px; font-size: 18px"
                  >취소</v-btn
                >
                <v-btn
                  type="submit"
                  class="ml-15 brown darken-2 white--text custom-btn"
                  large
                  style="width: 100px; font-size: 18px"
                  >메뉴 주문
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
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiSeat } from "@mdi/js";
import { mapActions, mapState } from "vuex";
const reservationModule = "reservationModule";
const orderModule = "orderModule";
const cafeIntroduceBoardModule= 'cafeIntroduceBoardModule'
import HallSeatForm from "@/components/hallSeat/HallSeatForm.vue";
export default {
  name: "HallSeatPage",
  components: {
    HallSeatForm,
    SvgIcon,
  },
  props: {
    // cafe: {
    //   type: Object,
    //   required: true,
    // },
    timeSelection: {
      type: Number,
    },
  },
  data() {
    return {
      path: mdiSeat,
      nickName: JSON.parse(localStorage.getItem("userInfo")).nickName,
      selectedTime: null,
      selectedSeats: [],
      unreserved: 0,
      total: 0,
      // cafe: null,
    };
  },
  computed: {
    ...mapState(reservationModule, ["seatData", "tableData", "availableTimes"]),
     ...mapState(cafeIntroduceBoardModule,['cafe' ])
  },

  methods: {
    ...mapActions(reservationModule, [
      "requestCreateCafeSeatToSpring",
      "requestCafeSeatToSpring",
      "requestDeleteCafeSeatToSpring",
      "calculateAvailableTimes",
      "setSelectedSeats",
    ]),
    ...mapActions(cafeIntroduceBoardModule, [
        'requestCafeDetailToSpring' ]),
    ...mapActions(orderModule, ["updateIsOrderPacking"]),
    async fetchReservations() {
      try {
        const payload = { cafeId: this.cafe.cafeId, time: this.selectedTime };
        await this.requestCafeSeatToSpring(payload);
        await this.resetSelectedSeats();
      } catch (error) {
        alert("에러입니다.");
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    async reset() {
      await this.requestDeleteCafeSeatToSpring();
      await this.resetSelectedSeats();
      await this.$router.push({
        name: "CafeIntroBoardListPage",
      });
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
    onUpdateSelectedSeats(updatedSeats) {
      console.log(updatedSeats);
      this.selectedSeats = updatedSeats;
    },
    resetSelectedSeats() {
      this.selectedSeats = []; // 선택된 자리 초기화
      this.$refs.hallSeatForm.resetSelectedSeats(); //
    },
    async onSubmit() {
      if (this.selectedSeats.length === 0) {
        alert("좌석을 선택해주세요.");
        return;
      }
      const payload = {
        cafe: this.cafe,
        memberId: JSON.parse(localStorage.getItem("userInfo")).id,
        seatList: this.selectedSeats,
        timeString: this.selectedTime,
      };
      // await this.requestCreateCafeSeatToSpring(payload);//카페를 db에 등록
      await this.setSelectedSeats(payload);

      // 포장 주문인지 아닌지 값 전달
      this.updateIsOrderPacking(false);
      // 상품 주문 페이지로 해당 cafeId 넘겨서 이동
      await this.$router.push({
        name: "ProductListPage",
        params: { cafeId: this.cafe.cafeId },
      });
    },
    onUpdateSeatsCount({ unreserved, total }) {
      console.log("Unreserved seats:", unreserved);
      console.log("Total seats:", total);
      this.unreserved = unreserved;
      this.total = total;
    },
  },

  async created() {
     const cafeId = this.$route.params.cafeId;//url로 접속시 cafeId받아오는 방법
     await this.requestCafeDetailToSpring(cafeId)

    // if (this.$route.query.cafe) {
    //   this.cafe = JSON.parse(this.$route.query.cafe);//query쓰면 url지저분해짐
    // }
    console.log("this.cafe.startTime", this.cafe.startTime);
    console.log("this.cafe.endTime", this.cafe.endTime);
    await this.calculateAvailableTimes({
      startTime1: this.cafe.startTime,
      endTime1: this.cafe.endTime,
    });
    console.log("cafe", this.cafe);
    console.log("timeSelection", this.timeSelection);
    console.log("mounted Available times:", this.availableTimes);
    if (this.timeSelection !== undefined && this.availableTimes.length > 0) {
      this.selectedTime = this.availableTimes[this.timeSelection];
      // 선택된 시간에 따라 예약 정보를 가져옵니다.
      await this.fetchReservations();
    }
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
  margin: 0 auto;
  line-height: 24px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin-right: 10px;
}
.seat {
  position: relative;
  background-color: rgb(8, 242, 82, 0.8);
  border: 1px solid #e0dcdc;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
  font-size: 14px;
}
.is-reserved {
  background-color: rgba(216, 17, 17, 0.8);
  color: #fff;
}
.title-text {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #5d4037;
}

.info-text {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #5d4037;
}

.custom-btn {
  width: 100px;
  font-size: 18px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.custom-btn:hover {
  background-color: #795548;
}

.custom-btn:active {
  background-color: #5d4037;
}
</style>