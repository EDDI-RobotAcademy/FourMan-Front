<template>
  <v-card :loading="loading" class="mx-auto my-12 cafeCard" max-width="374">
    <div class="cafeInfo">
      <template slot="progress">
        <v-progress-linear
          color="brown lighten-1"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <div class="thumb">
      <router-link
          :to="{
            name: 'CafeIntroBoardDetailPage',
            params: { cafeId: cafe.cafeId.toString() },
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
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">
            4.5 (413)
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
          active-class="brown lighten-1 white--text"
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
        <v-btn class="brown lighten-1 white--text"  text @click="reserve">
          예약
        </v-btn>
         <v-btn class="brown lighten-1 white--text" text @click="showDetail">
          상세 보기
        </v-btn>
      </v-card-actions>

    </div>
  </v-card>
</template>

<script>
export default {
  name: "CafeIntroBoardCardForm",
  props: {
    cafe: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    selection: 1,
  }),
  methods: {

    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },

    showDetail(){
       this.$router.push({ name:'CafeIntroBoardDetailPage',
                           params:{cafeId: this.cafe.cafeId.toString()}});
    }
  },
};
</script>
