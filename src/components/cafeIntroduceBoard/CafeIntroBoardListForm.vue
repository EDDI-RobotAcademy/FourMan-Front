<template>
  <div>
    <v-container class="cafe-list">
      <v-row>
        <v-col cols="2"> </v-col>

        <v-col class="d-flex justify-end" cols="10">
          <v-row class="d-flex justify-end">
            <v-col cols="7">
              <v-tabs
                v-model="selectedSorting"
                background-color="transparent"
                slider-color="brown darken-2"
                @change="sortCafes"
              >
               <v-tab>최신 등록 순</v-tab>
                <v-tab>인기순</v-tab>
                <v-tab>별점 높은 순</v-tab>
                <v-tab>별점 많은 순</v-tab>
              </v-tabs>
            </v-col>

            <v-col cols="4">
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
        </v-col>
      </v-row>

      <div
        class="empty_cafe"
        v-if="
          !cafeLists || (Array.isArray(cafeLists) && cafeLists.length === 0)
        "
      >
        <p>카페가 존재하지 않습니다.</p>
      </div>
      <v-row>
        <v-col
          v-for="(cafe, index) in calData"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <CafeIntroBoardCardForm :cafe="cafe"></CafeIntroBoardCardForm>
        </v-col>
      </v-row>
    </v-container>
    <div class="actions">
      <v-btn
        v-if="cafePass == 'CAFE'"
        type="button"
        class="brown darken-2 white--text"
        @click="checkCafeNum"
        large
        style="width: 100px; font-size: 18px"
        >카페 등록
      </v-btn>
      <div class="pagination-wrapper">
        <v-pagination
          v-model="curPageNum"
          :length="numOfPages"
          color="brown darken-2"
          class=""
          flat
        ></v-pagination>
      </div>
    </div>
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
      selectedSorting: "최신등록순",
      searchText: "",
      cafePass: JSON.parse(localStorage.getItem("userInfo")).authorityName,
      dataPerPage: 6,
      curPageNum: 1,
    };
  },
  methods: {
    ...mapActions(cafeIntroduceBoardModule, ["requestCafeNumToSpring"]),
    sortCafes(){

    },
    searchCafes(){

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
    calData() {
      return this.cafeLists.slice(this.startOffset, this.endOffset);
    },
  },
};
</script>
<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination-wrapper {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}
</style>