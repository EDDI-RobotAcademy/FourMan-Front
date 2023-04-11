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
            query: { rating: rating, totalRating: totalRating }
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

      <v-card-text >
        <v-row align="center" class="mx-0">
          <v-rating
            :value=rating
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">
            <span v-if="cafe.cafeInfo.rating">{{ rating.toFixed(1) }}</span>
            <span v-else>0</span>
            <span> ({{ totalRating }})</span>
            <!-- 별점과 참여자수 업뎃요망 -->
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">
          {{ cafe.cafeInfo.subTitle }}
        </div>

        <div>{{ cafe.cafeAddress }} , {{ cafe.cafeTel }}</div><br>
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
          <!-- 예약시스템 작업후 업데이트요망 -->
          <v-chip>5:30PM</v-chip>
          <v-chip>7:30PM</v-chip>
          <v-chip>8:00PM</v-chip>
          <v-chip>9:00PM</v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn class="brown darken-2 white--text"  text @click="reserve">
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
import axios from 'axios';
export default {
  name: "CafeIntroBoardCardForm",
  props: {
    cafe: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    selection: 1,
    rating: 0,
    totalRating: 0,
  }),
  methods: {

    reserve() {
             this.$router.push({ name:'HallSeatPage',
                           params:{cafe: this.cafe
                           }});
    },

    showDetail(){
       this.$router.push({ name:'CafeIntroBoardDetailPage',
                           params:{cafeId: this.cafe.cafeId.toString()}});
    }
  },
  created() {
      return axios.get(`http://localhost:8888/review-board/rating/${this.cafe.cafeName}`)
            .then((res) => {
                console.log("res.data : " + res.data)
                const sum = res.data.reduce((acc, cur) => acc + cur, 0);
                this.rating = (sum / res.data.length)
                this.totalRating = res.data.length
            })
    }
};
</script>
