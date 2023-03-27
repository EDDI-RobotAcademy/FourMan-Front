<template>
  <v-container>
    <!-- <v-row>
      <v-col v-for="info in this.$store.state.cafeList.content" :key="info.id">
        <CafeIntroListForm :novel-info="info"/>
      </v-col>
    </v-row> -->

    <!-- <v-pagination -->
        <!-- v-model="page" -->
        <!-- :length="this.$store.state.uploaderCafeInfoList.totalPages"/> -->
    <div v-if="cafePass == 'CAFE' ">
      <router-link :to="{ name: 'CafeIntroBoardRegisterPage' }">
        카페 등록
      </router-link>
    </div>
  </v-container>
</template>

<script>
import {mapState, mapActions} from "vuex";
// import CafeIntroListForm from "@/component/CafeIntroListForm/CafeIntroListForm";

export default {
  name: "CafeIntroBoardListPage",
//   components: {CafeIntroListForm}, 
  computed: {
    ...mapState([
      'cafeLists'
    ]),
  },
  data() {
    return {
      page: 1,
      cafePass: JSON.parse(localStorage.getItem('userInfo')).authorityName,
    }
  },
  methods: {
    ...mapActions(['requestCafeListToSpring']),


  },
  mounted() {
    //  let payload = {
    //   member_id: 1,
    //   page: this.page-1,
    //   size: 5
    // }
    // this.requestCafeListToSpring()
  }
}
</script>
<style scoped>

</style>