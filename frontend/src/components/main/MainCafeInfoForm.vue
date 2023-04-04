<template>
    <div class="main-container ms-10 me-10 mt-10 mb-10">
      <v-container>
        <div class="EULJIRO mb-3">
            <h1>카페 소개 <v-icon>mdi-coffee</v-icon></h1>
        </div>
        <div class="EULJIRO mt-5 mb-5" style="height: 250px; display: flex; justify-content: center; align-items: center;" v-if="
        !cafeLists || (Array.isArray(cafeLists) && cafeLists.length === 0)">
            <h2>등록된 카페가 없습니다!</h2>
          </div>
        <v-row>
        <v-col v-for="(cafe, index) in cafeLists.slice(0, 4)" :key="index" cols="12" sm="6" md="4">
            <CafeIntroBoardCardForm :cafe="cafe"></CafeIntroBoardCardForm >
  
        </v-col>
        </v-row>
        
      </v-container>
  
    </div>
  </template>
  
  <script>
  import {mapState, mapActions} from "vuex";
  import CafeIntroBoardCardForm from "@/components/cafeIntroduceBoard/CafeIntroBoardCardForm.vue";
  
  export default {
    name: "MainCafeInfoForm",
    components: {
      CafeIntroBoardCardForm
    },
    data() {
      return {
        listData: ["cafeLists"],
        dataPerPage: 6,
        curPageNum: 1,
      };
    },
    methods: {
      ...mapActions(['requestCafeListToSpring']),
    },
    computed: {
      ...mapState([
        'cafeLists'
      ]),
    },
    mounted() {
        this.requestCafeListToSpring()
    },
  };
  </script>
  