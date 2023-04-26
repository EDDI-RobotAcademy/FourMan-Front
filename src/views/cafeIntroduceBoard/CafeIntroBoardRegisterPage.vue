<template>
  <v-container class="detailWrap">
    <h2>카페 등록</h2>
    <CafeIntroBoardRegisterForm class="mt-15"/>
  </v-container>
</template>

<script>
import CafeIntroBoardRegisterForm from '@/components/cafeIntroduceBoard/CafeIntroBoardRegisterForm.vue'

export default {
    components: { CafeIntroBoardRegisterForm },
    name: "CafeIntroBoardRegisterPage",
    methods: {
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