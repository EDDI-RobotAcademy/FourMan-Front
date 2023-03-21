<template>
    <v-footer inset padless class="justify-center pl-0">
      <v-card flat class="text-center" width="100%">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="pt-0">
          카페 예약 페이지(추후 변경)
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="blue--text">
          <strong>-KH정보교육원 5조-<br>
            팀장: 김영진<br>
            팀원: 박현우, 정명진, 박현수 </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </template>

  <script>

  export default {
        name: "MainFooterForm",
        data: () => ({
            icons: [
                "mdi-facebook",
                "mdi-twitter",
                "mdi-instagram"
            ]
        })
  }

  </script>

  <style>

  </style>