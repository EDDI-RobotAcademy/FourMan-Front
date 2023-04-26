<template>
   <div>
      <my-page-side-bar-form />

      <v-container style="width: 1000px">
         <my-cafe-order-list-form :cafeOrderInformations="cafeOrderInformations"/>
      </v-container>
   </div>
</template>

<script>
import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'
import MyCafeOrderListForm from '@/components/cafeMyPage/MyCafeOrderListForm.vue'
import { mapState, mapActions } from "vuex";

const orderModule = 'orderModule'

export default {
   name: "MyCafeOrderListPage",
   components: {
      MyPageSideBarForm,
      MyCafeOrderListForm
   },
   methods: {
      ...mapActions(
        orderModule, ['requestCafeOrderListToSpring']
      ),
   },
   computed: {
      ...mapState(
        orderModule, ['cafeOrderInformations']
      ),
   },
   async mounted() {
      let cafeId = JSON.parse(localStorage.getItem('userInfo')).cafeId
      await this.requestCafeOrderListToSpring(cafeId)
   }
}
</script>

<style>

</style>