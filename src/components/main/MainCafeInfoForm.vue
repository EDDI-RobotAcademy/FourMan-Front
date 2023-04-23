<template>
  <div class="main-container ms-10 me-10 mt-10 mb-10">
    <v-container>
      <div>
        <h1>카페 소개 <v-icon>mdi-coffee</v-icon></h1>
      </div>
      <div
        class="mt-5 mb-5"
        style="
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
        v-if="
          !cafeLists || (Array.isArray(cafeLists) && cafeLists.length === 0)
        "
      >
        <h2>등록된 카페가 없습니다!</h2>
      </div>
      <div class="carousel-wrapper" style="position: relative">
        <v-row>
          <v-col
            v-for="(cafe, index) in visibleCafes"
            :key="index"
            cols="12"
            sm="4"
            md="4"
          >
            <CafeIntroBoardCardForm
              :cafe="cafe"
              v-if="cafe"
              :index="index"
              :uniqueKey="cafe.uniqueKey"
            ></CafeIntroBoardCardForm>
          </v-col>
        </v-row>
        <v-btn icon @click="goPrev" class="carousel-arrow left"
          ><v-icon>mdi-chevron-left</v-icon></v-btn
        >
        <v-btn icon @click="goNext" class="carousel-arrow right"
          ><v-icon>mdi-chevron-right</v-icon></v-btn
        >
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CafeIntroBoardCardForm from "@/components/cafeIntroduceBoard/CafeIntroBoardCardForm.vue";
const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
export default {
  name: "MainCafeInfoForm",
  components: {
    CafeIntroBoardCardForm,
  },
  data() {
    return {
      currentIndex: 0,
      autoSlideInterval: null,
    };
  },
  methods: {
    ...mapActions(cafeIntroduceBoardModule, ["requestCafeListToSpring"]),
    goPrev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    goNext() {
      if (
        this.eventLists && this.eventLists.length > 4 &&
        this.currentIndex < this.eventLists.length - 3
      ) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
    },
    autoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.goNext();
      }, 5000);
    },
  },
  computed: {
    ...mapState(cafeIntroduceBoardModule, ["cafeLists"]),
    visibleCafes() {
      return this.cafeLists
        .slice(this.currentIndex, this.currentIndex + 3)
        .map((cafe, idx) => ({ ...cafe, uniqueKey: this.currentIndex + idx }));
    },
  },
  async created() {
    await this.requestCafeListToSpring();
    await this.autoSlide();
  },
  beforeDestroy() {
    clearInterval(this.autoSlideInterval);
  },
};
</script>

<style scoped>
.carousel-wrapper {
  position: relative;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.carousel-arrow.left {
  left: -50px;
}

.carousel-arrow.right {
  right: -50px;
}
</style>