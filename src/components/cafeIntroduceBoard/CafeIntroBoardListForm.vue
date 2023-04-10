<template>
  <div>
    <v-container class="cafe-list">
      <div
        class="empty_cafe"
        v-if="
          !cafeLists || (Array.isArray(cafeLists) && cafeLists.length === 0)
        ">
        <p>카페가 존재하지 않습니다.</p>
      </div>
      <v-row>
      <v-col v-for="(cafe, index) in calData" :key="index" cols="12" sm="6" md="4">
          <CafeIntroBoardCardForm :cafe="cafe"></CafeIntroBoardCardForm >

      </v-col>
      </v-row>
    </v-container>

    <v-pagination
      v-model="curPageNum"
      :length="numOfPages"
      color="brown darken-2"
      class="mt-10"
      flat
    ></v-pagination>
  </div>
</template>

<script>
import CafeIntroBoardCardForm from "@/components/cafeIntroduceBoard/CafeIntroBoardCardForm.vue";

export default {
  name: "CafeIntroBoardListForm",
  components: {
    CafeIntroBoardCardForm
  },
  props: {
    cafeLists: {
      type: Array,
    },
  },
  data() {
    return {
      listData: ["cafeLists"],
      dataPerPage: 6,
      curPageNum: 1,
    };
  },
  methods: {
    
  },
  computed: {
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
