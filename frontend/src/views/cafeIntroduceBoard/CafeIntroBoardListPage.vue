<template>
  <v-container>
   <div class="wrap productWrap">
    <CafeIntroBoardListForm :cafeLists="cafeLists"></CafeIntroBoardListForm>
  </div>

        <div v-if="cafePass == 'CAFE' ">
      <!-- <router-link :to="{ name: 'CafeIntroBoardRegisterPage' }">
        카페 등록
      </router-link> -->
      <v-btn type="button" class="brown lighten-1 white--text" @click="checkCafeNum" large style="width: 100px; font-size: 18px"
              >카페 등록
       </v-btn>
    </div>
  </v-container>
</template>

<script>
import {mapState, mapActions} from "vuex";
//import CafeIntroBoardCardForm from "@/components/cafeIntroduceBoard/CafeIntroBoardCardForm.vue";
import CafeIntroBoardListForm from "@/components/cafeIntroduceBoard/CafeIntroBoardListForm.vue";
import axios from 'axios';

export default {
  name: "CafeIntroBoardListPage",
  components: {
    //CafeIntroBoardCardForm ,
    CafeIntroBoardListForm,
    }, 
  computed: {
    ...mapState([
      'cafeLists','cafeCheck'
    ]),
  },
  data() {
    return {
            cafePass: JSON.parse(localStorage.getItem('userInfo')).authorityName,
            cafeNum:0
    }
  },
  methods: {
    ...mapActions(['requestCafeListToSpring','requestCafeNumToSpring']),

    async checkCafeNum(){
        if(JSON.parse(localStorage.getItem('userInfo')).authorityName =='CAFE'){
           await this.requestCafeNumToSpring()
           await this.changeNum()
      }
    },

  changeNum(){
    if(this.cafeCheck ==true){// this.$store.state.cafeCheck도 가능
        alert("이미 등록된 카페가 있습니다.")
    }else{
      this.$router.push("/cafe-board-register-page");
    }
  }
  },

  mounted() {
     this.requestCafeListToSpring()
   
  },
}
</script>
<style scoped>

</style>