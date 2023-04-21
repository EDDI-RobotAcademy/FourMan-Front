<template>
  <v-container fluid>
    <div>
      <v-btn
        type="button"
        class="brown darken-2 white--text"
        @click="aa"
        large
        style="width: 150px; font-size: 18px"
        >이벤트 등록
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const eventBoardModule = "eventBoardModule";
export default {
  name: "EventBoardListPage",
  components: {},
  computed: {},
  data() {
    return { 
     
    
    };
  },
  methods: {
     aa() {
      this.$router.push("/event-board-register-page");
      } 
  },
};
</script>
<style scoped>
</style>