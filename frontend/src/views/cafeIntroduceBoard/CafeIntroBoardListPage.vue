<template>
  <v-container>
   <div class="wrap productWrap">
    <CafeIntroBoardListForm :cafeLists="cafeLists"></CafeIntroBoardListForm>
  </div>

    <router-link :to="{ name: 'CafeIntroBoardRegisterPage' }">
      카페 등록
    </router-link>
  </v-container>
</template>

<script>
import {mapState, mapActions} from "vuex";
//import CafeIntroBoardCardForm from "@/components/cafeIntroduceBoard/CafeIntroBoardCardForm.vue";
import CafeIntroBoardListForm from "@/components/cafeIntroduceBoard/CafeIntroBoardListForm.vue";


export default {
  name: "CafeIntroBoardListPage",
  components: {
    //CafeIntroBoardCardForm ,
    CafeIntroBoardListForm,
    }, 
  computed: {
    ...mapState([
      'cafeLists'
    ]),
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['requestCafeListToSpring']),


  },
  mounted() {
    this.requestCafeListToSpring()
    
  },
}
</script>
<style scoped>

</style>