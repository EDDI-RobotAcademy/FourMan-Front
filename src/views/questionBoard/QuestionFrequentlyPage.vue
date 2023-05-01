<template>
  <v-container>
    <div style="margin:0 150px;">
      <div class="NanumGothic mt-10">
        <h2>FAQ 게시판 <v-icon>mdi-bulletin-board</v-icon></h2>
      </div>
    </div>
    <v-divider class="divider"></v-divider>
    <div class="button-container" align="center">
          <v-btn color="secondary" @click="updateFaqs('환불')" class="faq-button">환불</v-btn>
          <v-btn color="secondary" @click="updateFaqs('예약')" class="faq-button">예약</v-btn>
          <v-btn color="secondary" @click="updateFaqs('현금 영수증')" class="faq-button">현금 영수증</v-btn>
          <v-btn color="secondary" @click="updateFaqs('아이디 / 비밀번호 찾기')" class="faq-button">아이디 / 비밀번호 찾기</v-btn>
          <v-btn color="secondary" @click="updateFaqs('포인트 사용 안내')" class="faq-button">포인트 사용 안내</v-btn>
    </div>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-expansion-panels class="faq-panels">
          <v-expansion-panel v-for="(faq, index) in faqs" :key="index">
            <v-expansion-panel-header class="header">{{ faq.question }}</v-expansion-panel-header>
            <v-expansion-panel-content class="content" v-html="faq.answer"></v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      faqs: [],
      allFaqs: [
        {
          category: "환불",
          question: "[홈페이지] 인터넷 예약 후 현장에서 환불(취소)이 가능한가요?",
          answer: `예약시간 이전 까지만 가능하며, 예약시간 이후 취소나 환불은 되지 않습니다 단 음료가 이미 준비된 경우에는 환불이 되지 않습니다.
          <br>- 신용카드 환불의 경우 익일에 승인 취소를 확인하실 수 있습니다.
          <br>- 예매일과 취소일이 다른 경우에 취소 확인 시까지 시일이 소요될 수 있습니다.`
        },
        {
          category: "환불",
          question: "예약 취소를 하였는데 환불이 안 된 것 같아요",
          answer: `신용카드사로 전표가 매입처리 된 이후, 취소가 진행이 되면 환불까지 3일 ~10일 소요됩니다.<br>
취소 전표 처리 이전에는 카드사를 통한 확인이 불가하며, 환불 기간 이후 카드사를 통한 취소내역 확인이 가능합니다.`,
        },
        {
          category: "예약",
          question: "예약 내용은 어떻게 확인하나요?",
          answer: `인터넷 예약 후 확인을 원하시는 경우 다음과 같이 확인하세요 <br><br>
          홈페이지 로그인 -> [마이페이지] -> [결제 내역]`,
        },
        {
          category: "예약",
          question: "인터넷 예약 시 결제수단에는 어떤 것들이 있나요?",
          answer: `2023년 5월 1일 기준 현재는 카카오 페이로만 결제가 가능합니다.`,
        },
        {
          category: "예약",
          question: "환불 규정이 궁금해요",
          answer: `예약 취소시 아래 기준에 따라 환불됩니다.<br>
                  [일반] <br>
                  -결제후 30분 이내 취소시 100% 환불(하루 1회)<br>
                  -7일 전 취소 시 100% 환불<br>
                  -5일 전 취소 시 80% 환불<br>
                  -3일 전 취소 시 50% 환불<br>
                  -2일전 ~ 예약 당일 환불 불가<br><br>
                  [특수]
                  천재지변<br>
                  - 당일 천재지변으로 인해 방문이 불가한 경우 100% 환불
                  (적용기준: 호우경보, 대설경보, 태풍주의보, 태풍경보)`,
        },
        {
          category: "현금 영수증",
          question: "현금 영수증 발행을 못했어요!",
          answer: `예약 방법에 따라 현금영수증 발급 가능 여부가 상이하기 때문에 <br>
          국세청 홈페이지에 접속하시어 발급을 확인하실 수 있습니다.`,
        },
        {
          category: "현금 영수증",
          question: "영수증 출력은 어떻게 하나요?",
          answer: "사용하신 카드 결제내역을 확인 부탁드립니다.",
        },
        {
          category: "아이디 / 비밀번호 찾기",
          question: "비밀번호를 잊어버렸어요 어떻게 하죠?",
          answer: `우측 상단 로그인 버튼 -> PW찾기 -> 아이디 입력 후 인증메일 보내기-> 인증번호 입력 <br>
          그후 새로운 비밀번호를 입력해주시면 됩니다.`,
        },
        {
          category: "포인트 사용 안내",
          question: "포인트 적립 및 확인은 어떻게 하나요?",
          answer: `포인트 적립: 카페 예약 후 결제 시 결제 금액의 1%가 자동으로 결제하신 계정에 적립 됩니다 <br>
                  포인트 확인: 홈페이지 로그인 -> [마이페이지] -> 좌측상단에 프로필 사진 밑에서 확인이 가능합니다.`,
        },
        {
          category: "포인트 사용 안내",
          question: "포인트 적립이 되지 않았습니다.",
          answer: `정상적으로 결제가 되었으나, 포인트 적립이 이루어 지지 않은 경우에는 질문게시판에 결제내역 및 금액을 남겨주시면<br>
            확인 후 포인트 지급 도와드리겠습니다.`,
        },
        {
          category: "포인트 사용 안내",
          question: "포인트 사용은 어떻게 하나요?",
          answer: "카페 예약 시 가용 가능한 포인트를 입력하여, 현금처럼 사용이 가능 합니다.",
        },
      ],
    };
  },
  methods: {
    updateFaqs(category) {
      this.faqs = this.allFaqs.filter((faq) => faq.category === category);
    },
  },
  mounted() {
    this.updateFaqs("환불");
  },
};
</script>

<style scoped>
.divider {
  margin-bottom: 20px;
}

.faq-panels {
  margin-top: 30px;
}

.header {
  background-color:azure;
  border-radius: 5px;
  font-weight: 600;
  border: none;
  border-bottom: 1px solid #e0e0e0;
}

.content {
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  color: #333;
  line-height: 1.6;
  border: none;
}

.divider {
  margin-top: 40px;
}
.button-container{
  margin-top: 30px;
}
.faq-button{
  margin-right: 8px;
  background-color: deepskyblue;
}
.faq-button:active {
  transform: translateY(4px);
}
</style>