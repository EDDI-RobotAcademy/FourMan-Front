<template>
  <v-container class="mt-10">
    <h2>카페코드 추가</h2>
    <v-form ref="form" @submit.prevent="submitForm">
      <v-row class="d-flex justify-space-around align-center">
        <v-col cols="12" sm="4">
          <v-text-field
            label="카페 이름"
            v-model="cafeName"
            :rules="[required]"
            required
            style="width: 200px"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            label="카페 코드"
            v-model="codeOfCafe"
            :rules="[required]"
            required
            style="width: 200px"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-btn type="submit" class="brown darken-2 white--text"
            >카페코드 추가</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="3000"
      :color="snackbar.color"
      top
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
const myPageModule = "myPageModule";

export default {
  name: "CafeCodeRegisterForm",
  data() {
    return {
      snackbar: {
        show: false,
        message: "",
        color: "",
      },
      cafeName: "",
      codeOfCafe: "",
      required: (value) => !!value || "필수 입력 사항입니다",
    };
  },
  methods: {
    ...mapActions(myPageModule, ["requestAddCafeCodeToSpring"]),
    async submitForm() {
      try {
        const response = await this.requestAddCafeCodeToSpring({
          cafeName: this.cafeName,
          codeOfCafe: this.codeOfCafe,
        });

        if (response) {
          this.showSnackbar("카페코드가 추가되었습니다.", "success");
          this.cafeName = "";
          this.codeOfCafe = "";
          this.$refs.form.resetValidation(); // 유효성 검사 초기화
        } else {
          this.showSnackbar("카페코드 추가에 실패했습니다.", "error");
        }
      } catch (error) {
        console.error(error);
        this.showSnackbar("서버와 통신 중 오류가 발생했습니다.", "error");
      }
    },
    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
  },
};
</script>