<template>
  <v-container>
   <v-row justify="center">
    <v-col cols="auto">
  <v-dialog v-model="dialogVisible" transition="dialog-bottom-transition" width="auto">
    <v-card
    class="mx-auto"
    width="600">
      <v-toolbar
        color="brown lighten-1">
        <v-toolbar-title class="mx-auto">
          <b class="toolbar-title MBC-Font"> 오늘의 추천 카페!!</b>
        </v-toolbar-title>
      </v-toolbar>
    <div @click="goPopUpCafe">
    <v-img
      class="align-end text-white"
      max-height="500"
      :src="require('../../../public/assets/cafe/uploadImgs/t20230503170137.jpg')"
      @click="goPopUpCafe">
      <v-btn primary
      style="display : none;"
      @click.stop="goPopUpCafe">open</v-btn>
      <!-- v-img는 클릭가능영역이 없으므로 btn을 만들어서 넘기기 -->
    </v-img>
    </div>
    <v-card-title class="MBC-Font">
      스타벅스 강남GT타워점
    </v-card-title>
    <v-card-subtitle class="pt-4" style="max-height: 600px; overflow-y: auto;">
      서울 강남구 강남대로 390
    </v-card-subtitle>
    <v-card-text>
      <!-- <div>로 내용 본문 내용 추가 -->
      <div> 1.주차가능<br>
         2.주차장위치-지하주차장<br>
          3.주차가능대수-100대이상<br>
           4.주차조건-1시간 무료<br>
            5.주차정산방법-파트너에게 요청
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        class="MBC-Font mb-1 me-0 brown darken-2 white--text"
        @click="hideDialog">
        오늘 하루 보지않기
      </v-btn>

      <v-btn
      class="mb-1 me-0 brown darken-2 white--text"
      @click="dialogVisible = false">
        <v-icon>mdi-close-thick</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>

  </v-dialog>
  </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: "PopupForm",
  data() {
    return {
      dialogVisible: true,
      hideForDays : 1,
    }
  },
  methods: {
     hideDialog() {
      const hideUntil = new Date().getTime() + this.hideForDays * 24 * 60 * 60 * 1000;
      localStorage.setItem("hideDialogUntil", hideUntil);
      this.dialogVisible = false;
      // 하루간 보지 않기 클릭시 작동 할 메서드
     },
     async goPopUpCafe () {
        await this.$router.push({
          name: "CafeIntroBoardDetailPage",
          params: {
            cafeId: '1'
            //정적 페이지 이므로 직접 1번으로 이동시킴
    }
      })
      // 상품 혹은 카페 예약 페이지로 이동하도록 하면 됨
     },

  },
  mounted() {
    // 로컬 스토리지에서 hideDialogUntil 값이 있으면 다이얼로그를 숨김
    const hideUntil = localStorage.getItem("hideDialogUntil");
    if (hideUntil) {
      const hideUntilDate = new Date(parseInt(hideUntil, 10));
      if (hideUntilDate.getTime() > new Date().getTime()) {
        this.dialogVisible = false;
      }
    }
  }
}
</script>
<style scope>
.toolbar-title {
  color:aliceblue;
  justify-content: center;
  margin-top: 2px;
}
</style>