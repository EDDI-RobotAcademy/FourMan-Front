<template>
  <v-container>
   <v-row justify="center">
    <v-col cols="auto">
  <v-dialog v-model="dialogVisible" :transition="dialog-bottom-transition" width="auto">
    <v-card
    class="mx-auto"
    max-width="500">
      <v-toolbar
        color="brown lighten-1">
        <v-toolbar-title> 오늘의 추천 카페!!</v-toolbar-title>
      </v-toolbar>
    <div @click="goToCafe">
    <v-img
      class="align-end text-white"
      max-height="500"
      src="@/assets/logo/eddi.png"
      @click="goToCafe">
      <v-btn primary
      style="display : none;"
      @click.stop="goToCafe">open</v-btn>
      <!-- v-img는 클릭가능영역이 없으므로 btn을 만들어서 넘기기 -->
    </v-img>
    </div>
    <v-card-title>
      카페명
    </v-card-title>
    <v-card-subtitle class="pt-4">
      주소
    </v-card-subtitle>
    <v-card-text>
      <!-- <div>로 내용 본문 내용 추가 -->
      <div> card-text 본문자리 -> 길어지면 스크롤 될 수 있도록 자동 설정
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        class="mb-1 me-0 brown darken-2 white--text"
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
     async goToCafe () {
      await this.$router.push({name: "QuestionBoardListPage" })
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