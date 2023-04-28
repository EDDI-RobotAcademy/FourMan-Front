<template>
  <v-container fluid>
    <v-card class="mx-auto my-12 cafeCard" min-width="270px" elevation="3">
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
              params: { cafeId: cafe.cafeId.toString() }
            }"
          >
            <v-img
              v-if="cafe && loaded"
              height="250"
              :src="
                require(`../../../public/assets/cafe/uploadImgs/${cafe.cafeInfo.thumbnailFileName}`)
              "
            />
          </router-link>
        </div>
        <v-card-title class="cafeName">{{ cafe.cafeName }}</v-card-title>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :value="cafe.avgRating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
              background-color="gray"
            ></v-rating>

            <div class=" ms-4">
              <span>{{ cafe.avgRating.toFixed(1) }}</span>
              <span> ({{ cafe.totalRating }})</span>

              <v-icon
                v-if="!isFavorite"
                class="mx-2"
                color="grey"
                @click="toggleFavorite"
              >
                mdi-heart-outline
              </v-icon>
              <v-icon v-else class="mx-2" color="red" @click="toggleFavorite">
                mdi-heart
              </v-icon>
              <!-- 비회원이 찜눌럿을때 -->
              <v-dialog v-model="dialog" persistent max-width="290">
                <v-card>
                  <v-card-title class="headline"
                    >로그인이 필요합니다</v-card-title
                  >
                  <v-card-text>로그인 페이지로 이동하시겠습니까?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="brown darken-2 white--text" text @click="goToLoginPage"
                      >예</v-btn
                    >
                    <v-btn class="brown darken-2 white--text" text @click="dialog = false"
                      >아니오</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
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

        <v-card-text class="availableTimesContainer">
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

        <v-card-actions
          class="actions-container d-flex flex-sm-row justify-space-around"
        >
          <v-btn class="brown darken-2 white--text custom-button" text @click="showDetail">
            상세 보기
          </v-btn>

          <v-btn class="brown darken-2 white--text custom-button" text @click="reserve">
            자리 예약
          </v-btn>

          <v-btn class="brown darken-2 white--text custom-button" text @click="order">
            포장 주문
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
const reservationModule = "reservationModule";
const memberModule = "memberModule";
const orderModule = "orderModule";
export default {
  name: "CafeIntroBoardCardForm",
  props: {
    cafe: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      default: null,
    },
    uniqueKey: {
      type: Number,
      default: null,
    },
  },
  async created() {
    await this.updateCafeInfo();
  },
  watch: {
    index() {
      this.updateCafeInfo();
    },
    uniqueKey() {
      this.updateCafeInfo();
    },
  },
  data: () => ({
    dialog: false,
    availableTimes: [],
    selection: 0,
    // rating: 0,
    // totalRating: 0,
    loaded: false,
    isFavorite: false,
  }),
  computed: {
    ...mapState(memberModule, ["isAuthenticated"]),
  },
  methods: {
    ...mapActions(cafeIntroduceBoardModule, ["requestCafeRatingToSpring"]),
    ...mapActions(reservationModule, [
      "calculateAvailableTimes",
      "setSelectedSeats",
    ]),
    ...mapActions(orderModule, ["updateIsOrderPacking"]),
    ...mapActions(memberModule, [
      "sendFavoriteStatusToSpring",
      "checkFavoriteStatus",
    ]),

    goToLoginPage() {
      this.dialog = false;
      this.$router.push({ name: "SignInPage" });
    },

    async updateCafeInfo() {
      console.log("this.cafe.startTime", this.cafe.startTime);
      console.log("this.cafe.endTime", this.cafe.endTime);

      const availableTimes = await this.calculateAvailableTimes({
        startTime1: this.cafe.startTime,
        endTime1: this.cafe.endTime,
      });
      this.availableTimes = this.formattedAvailableTimes(availableTimes);
      // await this.cafeRating();

      if (this.isAuthenticated == true) {
        const payload = {
          cafeId: this.cafe.cafeId,
          memberId: JSON.parse(localStorage.getItem("userInfo")).id,
        };
        const res = await this.checkFavoriteStatus(payload);
        console.log("찜했냐res.data", res.data);
        this.isFavorite = res.data;
      }
      this.loaded = true;
      console.log(this.times);
    },

    formattedAvailableTimes(availableTimes) {
      console.log("formattedAvailableTimes 작동");
      const now = new Date();

      const formatDate = (date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`;
      };

      const todayStr = formatDate(now);

      return availableTimes
        .map((time) => {
          const [date, hour] = time.split(" ");
          if (date === todayStr) {
            return `Today ${hour}`;
          }
          return null;
        })
        .filter((formattedTime) => formattedTime !== null);
    },

    reserve() {
      this.$router.push({
        name: "HallSeatPage",
        params: {
          cafeId: this.cafe.cafeId,//url 에 적용되기 위함.(라우터index.js에 :cafeId와 매칭)
          cafe: this.cafe,
          timeSelection: this.selection,
        },
      });
    },
    async toggleFavorite() {
      if (this.isAuthenticated) {
        this.isFavorite = !this.isFavorite;
        const payload = {
          cafeId: this.cafe.cafeId,
          memberId: JSON.parse(localStorage.getItem("userInfo")).id,
          isFavorite: this.isFavorite,
        };
        await this.sendFavoriteStatusToSpring(payload);
      } else {
        this.dialog = true;
      }
    },

    showDetail() {
      this.$router.push({
        name: "CafeIntroBoardDetailPage",
        params: { cafeId: this.cafe.cafeId.toString() },
        query: { rating: this.rating, totalRating: this.totalRating },
      });
    },
    async order() {
      const payload = {
        cafe: this.cafe,
        memberId: JSON.parse(localStorage.getItem("userInfo")).id,
      };

      this.setSelectedSeats(payload);

      // 포장 주문인지 아닌지 값 전달
      await this.updateIsOrderPacking(true);

      this.$router.push({
        name: "ProductListPage",
        params: { cafeId: this.cafe.cafeId },
      });
    },
    // async cafeRating() {
    //   const res = await this.requestCafeRatingToSpring(this.cafe.cafeName);
    //   const sum = res.data.reduce((acc, cur) => acc + cur, 0);
    //   this.rating = sum / res.data.length;
    //   this.totalRating = res.data.length;

    //   console.log("res.data: " + res.data);
    // },
  },
};
</script>
<style scoped>
.availableTimesContainer {
  height: 150px; /* 원하는 높이로 설정 */
  overflow-y: auto; /* 스크롤바가 필요한 경우 보여주기 */
}

.actions-container > .v-btn {
  margin-bottom: 8px;
  margin-left: 4px;
  margin-right: 4px;
}
.custom-button {
  border-radius: 20px;
  transition: all 0.3s ease;
}

.custom-button:hover {
  background-color: rgba(66, 66, 66, 0.8);
  color: white;
}
</style>