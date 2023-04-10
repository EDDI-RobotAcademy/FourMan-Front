<template>
  <v-container class="detailWrap">
    <h2>카페 등록</h2>
    <CafeIntroBoardRegisterForm class="mt-15"/>
    <!-- <CafeIntroBoardRegisterForm @submit="onSubmit"/> -->
  </v-container>
</template>

<script>
import CafeIntroBoardRegisterForm from '@/components/cafeIntroduceBoard/CafeIntroBoardRegisterForm.vue'
// import { mapActions } from 'vuex'

export default {
    components: { CafeIntroBoardRegisterForm },
    name: "CafeIntroBoardRegisterPage",
    mounted: function(){
    if (JSON.parse(localStorage.getItem('userInfo')).authorityName !=="CAFE"){
      console.log("JSON.parse(localStorage.getItem('userInfo')).authorityName :", JSON.parse(localStorage.getItem('userInfo')).authorityName )
      this.$router.push({
                name: 'CafeIntroBoardListPage'
            })
    }
  },
    methods: {
        // ...mapActions ([
        //     'requestCreateCafeIntroToSpring'
        // ]),
        // async onSubmit (payload) { //formData도착
        //     await this.requestCreateCafeIntrToSpring(payload)
        //     await this.$router.push({
        //         name: 'CafeIntroBoardListPage'
        //     })
        // }
    }
}

</script>

<style scoped>
.detailWrap {
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
}
</style>