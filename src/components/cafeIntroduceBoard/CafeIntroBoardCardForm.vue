<template>
  <v-card class="mx-auto my-12 cafeCard" max-width="400">
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
            v-if="cafe && loaded"
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
            background-color="gray"
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

      <v-card-title>Today's availability</v-card-title>

      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="brown darken-2 white--text"
          column
        >
          <v-chip v-for="(time, index) in formattedAvailableTimes" :key="index">
            {{ time }}
          </v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn class="brown darken-2 white--text" text @click="showDetail">
          상세 보기
        </v-btn>

        <v-btn class="brown darken-2 white--text" text @click="reserve">
          자리 예약
        </v-btn>

        <v-btn class="brown darken-2 white--text" text @click="order">
          포장 주문
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { mapActions,mapGetters  } from "vuex";
const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
const reservationModule = "reservationModule";
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
    loaded: false,
  }),
  computed: {
       ...mapGetters(reservationModule, ['formattedAvailableTimes']),
  },
  methods: {
    ...mapActions(cafeIntroduceBoardModule, ["requestCafeRatingToSpring",]),
    ...mapActions(reservationModule, ["calculateAvailableTimes"]),
    reserve() {
      this.$router.push({
        name: "HallSeatPage",
        params: {
          cafe: this.cafe,
          timeSelection: this.selection,
        },
      });
    },

    showDetail() {
      this.$router.push({
        name: "CafeIntroBoardDetailPage",
        params: { cafeId: this.cafe.cafeId.toString() },
      });
    },
    order() {
      this.$router.push({
        name: "ProductListPage",
        params: { cafeId: this.cafe.cafeId},
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
  async created() {
    console.log("this.cafe.startTime",this.cafe.startTime)
    console.log("this.cafe.endTime",this.cafe.endTime)
    await this.calculateAvailableTimes({ startTime1: this.cafe.startTime, endTime1: this.cafe.endTime });
    await this.cafeRating();
    this.loaded = true;
    console.log(this.times);
  },
};
</script>


<style scoped>
</style>