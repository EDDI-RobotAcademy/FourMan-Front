<template>
   <div class="d-flex">
      <my-page-side-bar-form />

      <v-container style="width: 1000px">
         <member-order-history-form :orderInformations="orderInformations"/>
      </v-container>
   </div>
</template>

<script>
import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'
import MemberOrderHistoryForm from '@/components/memberMyPage/MemberOrderHistoryForm.vue'
import { mapState, mapActions } from "vuex";

const orderModule = 'orderModule'

export default {
   name: "MemberOrderHistoryPage",
   components: {
      MyPageSideBarForm,
      MemberOrderHistoryForm
   },
   methods: {
      ...mapActions(
        orderModule, ['requestOrderInformationsToSpring']
      ),
   },
   computed: {
      ...mapState(
        orderModule, ['orderInformations']
      ),
   },
   async mounted() {
      let memberId = JSON.parse(localStorage.getItem('userInfo')).id
      await this.requestOrderInformationsToSpring(memberId)
   }
}
</script>

<style>

</style>