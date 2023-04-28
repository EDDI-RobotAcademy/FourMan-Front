<template>
  <div class="main-container ms-10 me-10 mt-10 mb-10">
    <v-container>
      <div>
        <router-link
          to="/event-board-list-page"
          style="text-decoration: none; color: inherit"
        >
          <h2 class="NanumGothic">이벤트 <v-icon>mdi-coffee</v-icon></h2>
        </router-link>
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
          !filteredEventLists ||
          (Array.isArray(filteredEventLists) && filteredEventLists.length === 0)
        "
      >
        <h2>진행중인 이벤트가 없습니다!</h2>
      </div>
      <div class="carousel-wrapper" style="position: relative">
        <v-row>
          <v-col
            v-for="(event, index) in visibleEvents"
            :key="index"
            cols="12"
            sm="4"
            md="4"
          >
            <EventBoardCardForm
              :event="event"
              v-if="event"
              :index="index"
              :uniqueKey="event.uniqueKey"
            ></EventBoardCardForm>
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
import { mapState, mapActions, mapGetters } from "vuex";
import EventBoardCardForm from "@/components/eventBoard/EventBoardCardForm.vue";
const eventBoardModule = "eventBoardModule";
export default {
  name: "MainEventForm",
  components: {
    EventBoardCardForm,
  },
  data() {
    return {
      currentIndex: 0,
      autoSlideInterval: null,
    };
  },
  methods: {
    ...mapActions(eventBoardModule, ["requestEventListToSpring"]),
    goPrev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    goNext() {
      if (
        this.filteredEventLists &&
        this.filteredEventLists.length > 4 &&
        this.currentIndex < this.filteredEventLists.length - 3
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
    ...mapGetters(eventBoardModule, ["filteredEventLists"]),
    visibleEvents() {
      return this.filteredEventLists
        .slice(this.currentIndex, this.currentIndex + 3)
        .map((event, idx) => ({
          ...event,
          uniqueKey: this.currentIndex + idx,
        }));
    },
  },
  async created() {
    await this.requestEventListToSpring();
    await this.autoSlide();
    console.log("filteredEventLists", this.filteredEventLists);
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