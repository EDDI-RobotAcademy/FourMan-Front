<template>
  <div>
    <v-container class="cafe-list">
      <v-row class="d-flex justify-end">
        <v-col cols="8">
          <v-tabs
            v-model="selectedSorting"
            background-color="transparent"
            slider-color="brown darken-2"
            @change="handleTabChange"
          >
            <v-tab>최신 등록 순</v-tab>
            <v-tab>최다 주문 순</v-tab>
            <v-tab>별점 높은 순</v-tab>
            <v-tab>후기 많은 순</v-tab>
            <v-tab>찜 많은 순</v-tab>
          </v-tabs>
        </v-col>

        <v-col cols="3">
          <v-text-field
            label="제목,주소 검색"
            append-icon="mdi-magnify"
            outlined
            dense
            @input="searchCafes"
            v-model="searchText"
          ></v-text-field>
        </v-col>
      </v-row>

      <div
        class="empty_cafe"
        v-if="
          !cafeLists || (Array.isArray(cafeLists) && cafeLists.length === 0)
        "
      >
        <h1 class="text-center title-text">카페가 존재하지 않습니다.</h1>
      </div>
      <v-row>
        <v-col
          v-for="(cafe, index) in calData"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <CafeIntroBoardCardForm
            :cafe="cafe"
            @updateCafe="updateCafeData"
          ></CafeIntroBoardCardForm>
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
        <v-col cols="auto" class="text-right" style="right: 200px">
          <v-btn
            v-if="this.cafePass == 'CAFE'"
            type="button"
            class="brown darken-2 white--text"
            @click="checkCafeNum"
            large
            style="width: 100px; font-size: 18px"
            >카페 등록
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CafeIntroBoardCardForm from "@/components/cafeIntroduceBoard/CafeIntroBoardCardForm.vue";
import { mapState, mapActions } from "vuex";
const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
export default {
  name: "CafeIntroBoardListForm",
  components: {
    CafeIntroBoardCardForm,
  },
  props: {
    cafeLists: {
      type: Array,
    },
  },
  data() {
    return {
      selectedSorting: "0",
      searchText: "",
      cafePass: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).authorityName
        : null,
      dataPerPage: 6,
      curPageNum: 1,
    };
  },
  mounted() {
    console.log("this.cafePass", this.cafePass);
  },
  methods: {
    ...mapActions(cafeIntroduceBoardModule, ["requestCafeNumToSpring"]),
    handleTabChange(value) {
      console.log("핸들탭체인지");
      this.selectedSorting = value;
      console.log("this.selectedSorting", this.selectedSorting);
    },
    sortCafes() {},
    searchCafes() {},
    updateCafeData(cafeId) {
      this.$emit("updateCafe");
    },

    async checkCafeNum() {
      if (
        JSON.parse(localStorage.getItem("userInfo")).authorityName == "CAFE"
      ) {
        await this.requestCafeNumToSpring();
        await this.changeNum();
      }
    },

    changeNum() {
      if (this.cafeCheck == true) {
        // this.$store.state.cafeCheck도 가능
        alert("이미 등록된 카페가 있습니다.");
      } else {
        this.$router.push("/cafe-board-register-page");
      }
    },
  },
  computed: {
    ...mapState(cafeIntroduceBoardModule, ["cafeCheck"]),
    startOffset() {
      return (this.curPageNum - 1) * this.dataPerPage;
    },
    endOffset() {
      return this.startOffset + this.dataPerPage;
    },
    numOfPages() {
      return Math.ceil(this.cafeLists.length / this.dataPerPage);
    },
    sortedCafeLists() {
      let sortedList = [...this.cafeLists];
      let filteredBySearchText = sortedList;
      if (this.searchText !== "") {
        filteredBySearchText = sortedList.filter(
          (cafe) =>
            cafe.cafeName
              .toLowerCase()
              .includes(this.searchText.toLowerCase()) ||
            cafe.cafeAddress
              .toLowerCase()
              .includes(this.searchText.toLowerCase())
        );
      }

      switch (this.selectedSorting) {
        case 0:
          console.log("최신순 정렬!!");
          return filteredBySearchText.sort((a, b) => b.cafeId - a.cafeId);
        case 1:
          console.log("최다판매순 정렬!!");
          return filteredBySearchText.sort((a, b) => b.sellCount - a.sellCount);
        case 2:
          console.log("별점높은순 정렬!!");
          return filteredBySearchText.sort((a, b) => b.avgRating - a.avgRating);
        case 3:
          console.log("후기많은순 정렬!!");
          return filteredBySearchText.sort(
            (a, b) => b.totalRating - a.totalRating
          );
        case 4:
          console.log("찜순 정렬!!");
          return filteredBySearchText.sort((a, b) => b.favorites - a.favorites);
        default:
          return filteredBySearchText;
      }
    },
    calData() {
      return this.sortedCafeLists.slice(this.startOffset, this.endOffset);
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