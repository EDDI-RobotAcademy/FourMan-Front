<template>
  <div>
    <v-container class="event-list">
      <v-row>
        <v-col cols="3">
          <v-select
            :items="['전체 선택', ...formattedCafeList]"
            label="카페를 선택하세요"
            outlined
            dense
            @change="filterCafes"
            v-model="selectedCafe"
          ></v-select>
        </v-col>

        <v-col class="d-flex justify-end" cols="9">
          <v-row class="d-flex justify-end">
            <v-col cols="4">
              <v-select
                :items="['전체 선택', '진행중인 이벤트', '종료된 이벤트']"
                label="이벤트 진행상태"
                outlined
                dense
                @change="filterEvents"
                v-model="selectedEvent"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="제목 검색"
                append-icon="mdi-magnify"
                outlined
                dense
                @input="searchEvents"
                v-model="searchText"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <div
        class="empty_event"
        v-if="
          !eventLists || (Array.isArray(eventLists) && eventLists.length === 0)
        "
      >
        <h1 class="text-center title-text">이벤트가가 존재하지 않습니다.</h1>
      </div>
      <v-row>
        <v-col
          v-for="(event, index) in calData"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <EventBoardCardForm :event="event"></EventBoardCardForm>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row class="d-flex justify-space-between" no-gutters align="center">
        <v-col cols="auto"> </v-col>
        <v-col cols="auto" class="text-center">
          <v-pagination
            v-model="curPageNum"
            :length="numOfPages"
            color="brown darken-2"
            class=""
            flat
          ></v-pagination>
        </v-col>
        <v-col
          cols="auto"
          class="text-right"
          style="right: 200px"
        >
          <v-btn
            v-if="cafePass === 'CAFE'"
            type="button"
            class="brown darken-2 white--text register-button"
            @click="register"
            large
            style="width: 150px; font-size: 18px"
          >
            이벤트 등록
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
import EventBoardCardForm from "@/components/eventBoard/EventBoardCardForm.vue";

export default {
  name: "EventBoardListForm",
  components: {
    EventBoardCardForm,
  },
  props: {
    eventLists: {
      type: Array,
    },
  },
  data() {
    return {
      selectedCafe: "",
      selectedEvent: "",
      searchText: "",
      dataPerPage: 6,
      curPageNum: 1,
      cafePass: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).authorityName
        : null,
    };
  },
  methods: {
    ...mapActions(cafeIntroduceBoardModule, ["requestCafeListToSpring"]),

    register() {
      this.$router.push("/event-board-register-page");
    },
    filterEvents() {},
    searchEvents() {
      // 여기에 검색어를 사용하여 제목을 검색하는 코드를 추가하세요.
    },
    filterCafes() {},
  },
  async created() {
    console.log("eventLists:", this.eventLists);
    await this.requestCafeListToSpring();
  },
  computed: {
    ...mapGetters(cafeIntroduceBoardModule, ["formattedCafeList"]),
    startOffset() {
      return (this.curPageNum - 1) * this.dataPerPage;
    },
    endOffset() {
      return this.startOffset + this.dataPerPage;
    },
    numOfPages() {
      return Math.ceil(this.eventLists.length / this.dataPerPage);
    },
    filteredEventLists() {
      const currentDate = new Date();

      let filteredByCafe = this.eventLists;
      if (this.selectedCafe !== "" && this.selectedCafe !== "전체 선택") {
        filteredByCafe = this.eventLists.filter(
          (event) => event.cafeName === this.selectedCafe
        );
      }

      let filteredByStatus = filteredByCafe;
      if (this.selectedEvent === "진행중인 이벤트") {
        filteredByStatus = filteredByCafe.filter(
          (event) => new Date(event.eventEndDate) > currentDate
        );
      } else if (this.selectedEvent === "종료된 이벤트") {
        filteredByStatus = filteredByCafe.filter(
          (event) => new Date(event.eventEndDate) < currentDate
        );
      } else if (this.selectedEvent === "전체 선택") {
        filteredByStatus = filteredByCafe;
      }

      let filteredBySearchText = filteredByStatus;
      if (this.searchText !== "") {
        filteredBySearchText = filteredByStatus.filter((event) =>
          event.eventName.includes(this.searchText)
        );
      }

      return filteredBySearchText;
    },
    calData() {
      return this.filteredEventLists.slice(this.startOffset, this.endOffset);
    },
  },
};
</script>
<style scoped>
.title-text {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #5d4037;
}
</style>