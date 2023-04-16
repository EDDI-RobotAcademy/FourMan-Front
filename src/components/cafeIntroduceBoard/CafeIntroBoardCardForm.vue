<template>
  <v-card class="mx-auto my-12 cafeCard" max-width="374">
    <div class="cafeInfo">
      <template slot="progress">
        <v-progress-linear
          color="brown darken-2"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <div class="thumb">
        <router-link
          :to="{
            name: 'CafeIntroBoardDetailPage',
            params: { cafeId: cafe.cafeId.toString() },
            query: { rating: rating, totalRating: totalRating },
          }"
        >
          <v-img
            height="250"
            :src="
              require(`../../assets/cafe/uploadImgs/${cafe.cafeInfo.thumbnailFileName}`)
            "
          />
        </router-link>
      </div>
      <v-card-title class="cafeName">{{ cafe.cafeName }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="rating"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">
            <span v-if="rating">{{ rating.toFixed(1) }}</span>
            <span v-else>0</span>
            <span> ({{ totalRating }})</span>
            <!-- 별점과 참여자수 업뎃요망 -->
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">
          {{ cafe.cafeInfo.subTitle }}
        </div>

        <div>{{ cafe.cafeAddress }} , {{ cafe.cafeTel }}</div>
        <br />
        영업 시간: {{ cafe.startTime }} ~ {{ cafe.endTime }}
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Tonight's availability</v-card-title>

      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="brown darken-2 white--text"
          column
        >
          <v-chip v-for="(time, index) in availableTimes" :key="index">
            {{ time }}
          </v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn class="brown darken-2 white--text" text @click="reserve">
          예약
        </v-btn>
        <v-btn class="brown darken-2 white--text" text @click="showDetail">
          상세 보기
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
export default {
  name: "CafeIntroBoardCardForm",
  props: {
    cafe: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    selection: 0,
    rating: 0,
    totalRating: 0,
  }),
  computed: {
    availableTimes() {
      const now = new Date();
      console.log(now, "now");
      const currentHour = now.getHours();
      // const currentMinute = now.getMinutes();
      const startTime = Math.max(parseInt(this.cafe.startTime), currentHour);
      const endTime = parseInt(this.cafe.endTime);
      console.log("startTime", startTime);
      console.log("endTime", endTime);
      const times = [];
      let hour = startTime;
      while (true) {
        if (hour >= 24) {
          hour = hour % 24;
          now.setDate(now.getDate() + 1); // 다음 날짜로 변경
        }
        if (
          hour == endTime ||
          (hour >= endTime && hour < parseInt(this.cafe.startTime))
        ) {
          return times;
        }
        // const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`; // 현재 날짜를 'YYYY-MM-DD' 형식으로 변환// 현재 날짜를 'YYYY-MM-DD' 형식으로 변환
        // console.log( " now.toISOString()", now.toISOString())
        const time = `${hour.toString().padStart(2, "0")}:00`;
        times.push(time);
        hour += 2;
      }
    },
  },
  methods: {
    ...mapActions(cafeIntroduceBoardModule, ["requestCafeRatingToSpring"]),
    reserve() {
      this.$router.push({ name: "HallSeatPage",
         params: {
          cafe: this.cafe,
          timeSelection: this.selection } });
    },

    showDetail() {
      this.$router.push({
        name: "CafeIntroBoardDetailPage",
        params: { cafeId: this.cafe.cafeId.toString() },
      });
    },
    async cafeRating() {
      const res = await this.requestCafeRatingToSpring(this.cafe.cafeName);
      const sum = res.data.reduce((acc, cur) => acc + cur, 0);
      this.rating = sum / res.data.length;
      this.totalRating = res.data.length;

      console.log("res.data: " + res.data);
    },
  },
  created() {
    this.cafeRating();
  },
};
</script>
