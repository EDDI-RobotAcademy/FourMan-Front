<template>
  <v-container>
   <div class="wrap productWrap">
    <CafeIntroBoardListForm :cafeLists="cafeLists"></CafeIntroBoardListForm>
  </div>

        <div v-if="cafePass == 'CAFE' ">
      <router-link :to="{ name: 'CafeIntroBoardRegisterPage' }">
        카페 등록
      </router-link>
    </div>
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
            cafePass: JSON.parse(localStorage.getItem('userInfo')).authorityName,
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