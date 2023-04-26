<template>
  <v-container fluid>
    <my-page-side-bar-form />
    <div class="wrap productWrap">
      <EventBoardListForm :eventLists="eventLists"></EventBoardListForm>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MyPageSideBarForm from "@/components/memberMyPage/MyPageSideBarForm.vue";
import EventBoardListForm from "@/components/eventBoard/EventBoardListForm.vue";
const eventBoardModule = "eventBoardModule";

export default {
  name: "MyCafeEventListPage",
  components: {
    EventBoardListForm,
    MyPageSideBarForm,
  },
  computed: {
    ...mapState(eventBoardModule, ["eventLists"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(eventBoardModule, ["requestMyCafeEventListToSpring"]),
  },
  async created() {
    const cafeId = JSON.parse(localStorage.getItem("userInfo")).cafeId;
    console.log("cafeId : " + cafeId);
    await this.requestMyCafeEventListToSpring(cafeId);
  },
};
</script>
<style scoped>
</style>