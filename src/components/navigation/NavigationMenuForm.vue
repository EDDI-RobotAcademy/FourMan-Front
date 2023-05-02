<template>
  <nav>
    <v-app-bar
      color="brown lighten-1"
      height="80"
      class="d-flex justify-space-around align-center"
      dark
    >
      <router-link to="/">
        <v-img
          class="mx-3"
          src="@/assets/logo.png"
          max-height="70"
          max-width="70"
          contain
        />
      </router-link>
      <router-link to="/" style="text-decoration: none">
        <v-toolbar-title class="text--darken-4 white--text ml-3 mr-15">
          <span>FOURMAN</span>
        </v-toolbar-title>
      </router-link>

      <router-link to="/site-introduce-page" style="text-decoration: none">
        <span class="text-center">
          <v-btn text color="white" dark> 사이트 소개 </v-btn>
        </span>
      </router-link>

      <router-link to="/cafe-board-list-page" style="text-decoration: none">
        <span class="">
          <v-btn text color="white" dark> 카페 소개/예약/주문</v-btn>
        </span>
      </router-link>

      <router-link to="/event-board-list-page" style="text-decoration: none">
        <span class="">
          <v-btn text color="white" dark> 이벤트 </v-btn>
        </span>
      </router-link>

      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text color="white" dark v-on="on">커뮤니티</v-btn>
        </template>
        <v-list color="brown lighten-1">
          <v-list-item
            v-for="(item, index) in comunityList"
            :key="index"
            @click="selectItem(item)"
            class="white--text"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text color="white" dark v-on="on">고객센터</v-btn>
        </template>
        <v-list color="brown lighten-1">
          <v-list-item
            v-for="(item, index) in serviceCenterList"
            :key="index"
            @click="selectItem(item)"
            class="white--text"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- 로그인 안되어있을경우 -->
      <span class="ml-15">
        <router-link v-if="isAuthenticated == false" to="/sign-up-choice">
          <v-btn text color="white">
            <span>회원가입</span>
            <v-icon right>mdi-account-plus-outline</v-icon>
          </v-btn>
        </router-link>
        <router-link v-else to="/member-my-page">
          <v-btn text color="white">
            <span>마이 페이지</span>
            <!-- 아이콘 수정 필요  -->
          </v-btn>
        </router-link>
      </span>

      <span>
        <router-link v-if="isAuthenticated == false" to="/sign-in">
          <v-btn text color="white">
            <span>로그인</span>
            <v-icon right>mdi-login</v-icon>
          </v-btn>
        </router-link>
        <v-btn v-else text color="white" v-on:click="logout">
          <span>로그아웃</span>
          <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
      </span>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { COMMIT_IS_AUTHENTICATED } from "@/store/member/mutation-types";
const memberModule = "memberModule";
export default {
  name: "NavigationMenuForm",
  data() {
    return {
      isTrue: false,
      comunityList: ["자유게시판", "리뷰게시판"],
      serviceCenterList: ["Q&A", "공지사항"],
    };
  },
  computed: {
    ...mapState(memberModule, ["isAuthenticated"]),
  },
  mounted() {
    if (localStorage.getItem("userInfo")) {
      console.log("userinfo가 있습니다");

      // console.log(this.$store.state.isAuthenticated);
      // this.$store.state.memberModule.isAuthenticated = true; // 로그인되어있음

      this.$store.commit(`memberModule/${COMMIT_IS_AUTHENTICATED}`, true);
    } else {
      console.log("userinfo가 없습니다.");

      // console.log(this.$store.state.isAuthenticated);
      // this.$store.state.memberModule.isAuthenticated = false; //로그인안되어있음

      this.$store.commit(`memberModule/${COMMIT_IS_AUTHENTICATED}`, false);
    }
  },
  methods: {
    ...mapActions(memberModule, ["requestSignOutToSpring"]),

    async logout() {
      console.log(
        'localStorage.getItem("userInfo"): ' + localStorage.getItem("userInfo")
      );
      let token = localStorage.getItem("userInfo");
      const length = token.length;
      console.log("token: " + token + ", length: " + length);
      token = token.substr(1, length - 2); //양쪽에 있는 "" 제거 substr("시작 위치", "길이")
      console.log("token: " + token + ", length: " + token.length);

      await this.requestSignOutToSpring(token);
      await this.$router.replace({ name: "MainPage" }).catch((err) => {
        if (err.name !== "NavigationDuplicated") {
          console.error(err);
        }
      });
    },
    selectItem(item) {
      console.log("Selected item:", item);
      if (item === "자유게시판") {
        if (this.$route.name !== "FreeBoardListPage") {
          this.$router.push({ name: "FreeBoardListPage" });
        }
      } else if (item === "리뷰게시판") {
        if (this.$route.name !== "ReviewBoardListPage") {
          this.$router.push({ name: "ReviewBoardListPage" });
        }
      } else if (item === "Q&A") {
        if (this.$route.name !== "QuestionBoardListPage") {
          this.$router.push({ name: "QuestionBoardListPage" });
        }
      } else if (item === "공지사항") {
        if (this.$route.name !== "NoticeBoardListPage") {
          this.$router.push({ name: "NoticeBoardListPage" });
        }
      }
    },
  },
};
</script>

<style>
</style>