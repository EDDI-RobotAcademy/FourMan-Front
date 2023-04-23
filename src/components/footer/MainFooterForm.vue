<template>
  <v-footer inset padless class="justify-center pl-0">
    <v-card
      flat
      class="text-center white--text"
      width="100%"
      color="brown lighten-2"
    >
      <v-divider></v-divider>
      <v-container style="width: 1000px">
        <v-layout>
          <v-layout style="margin-top: 30px; margin-bottom: 50px">
            <div style="width: 130px; height: 130px">
              <v-img src="@/assets/logo.png"> </v-img>
            </div>

            <div style="margin-left: 50px">
              <h4 style="margin-bottom: 10px">(주)FOURMAN</h4>
              <div v-for="(item, index) in buy_diaInfo" :key="index">
                <h5>팀장: {{ item.teamJang }}</h5>
                <h5>팀원: {{ item.name }}</h5>
                <h5>주소: {{ item.address }}</h5>
                <h5>사업자등록번호:{{ item.companyNumber }}</h5>
                <h5>통신판매업: {{ item.mailOrderBusiness }}</h5>
                <h5>팩스: {{ item.faxNum }}</h5>
              </div>
              <h5 style="margin-top: 40px">
                Copyright © 2023 Backpackr All right reserved.
              </h5>
            </div>
          </v-layout>

          <v-layout
            style="margin-top: 30px; margin-bottom: 50px; margin-left: 100px"
          >
            <div>
              <h3>고객센터</h3>

              <h4 style="margin-top: 10px">
                1664-1234
                <span style="font-size: 15px">월-금 9:00 ~18:00</span>
              </h4>
              <div style="margin-top: 12px">
                <h5>메일:&nbsp; help@fourman.com</h5>
                <h5>제휴문의:&nbsp; partnership@fourman.com</h5>
              </div>

              <v-btn
                style="margin-top: 20px"
                v-for="icon in icons"
                :key="icon"
                icon
                @click="
                  icon === 'mdi-facebook'
                    ? shareOnFacebook()
                    : icon === 'mdi-twitter'
                    ? shareOnTwitter()
                    : shareOnInstagram()
                "
              >
                <v-icon size="24" color="white">
                  {{ icon }}
                </v-icon>
              </v-btn>
            </div>
          </v-layout>
        </v-layout>
      </v-container>
    </v-card>
  </v-footer>
</template>

  <script>
export default {
  name: "MainFooterForm",
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-instagram"],
    buy_diaInfo: [
      {
        teamJang: "김영진",
        name: "정명진,박현수,박현우",
        address: "서울특별시 강남구 강남구 테헤란로14길 6",
        companyNumber: "123-45-67890",
        mailOrderBusiness: "2022-fourman-1234",
        faxNum: "070-1234-5678",
      },
    ],
  }),
  methods: {
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
    },

    shareOnTwitter() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://twitter.com/intent/tweet?url=${url}`, "_blank");
    },

    shareOnInstagram() {
      alert(
        "Instagram에서는 웹 링크를 직접 공유할 수 없습니다. 공유하려면 이미지를 업로드하십시오."
      );
    },
  },
};
</script>

  <style>
</style>