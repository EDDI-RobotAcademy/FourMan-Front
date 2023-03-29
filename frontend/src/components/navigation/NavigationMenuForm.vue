<template>
  <nav>
    <v-app-bar color="#8D6E63" class="flex-grow-0" app dark>
      <v-app-bar-nav-icon @click="navigation_drawer = !navigation_drawer"/>
          <router-link to="/">
            <v-img class="mx-2" src="@/assets/logo/eddi.png"
                  max-height="40" max-width="40" contain/>
          </router-link>
      <v-toolbar-title class="text--darken-4">
        <span>EDDI CAFE</span>
      </v-toolbar-title>

      <v-row>
        <v-col>
          <router-link to="">
            <v-btn color="#8D6E63">button 1</v-btn>
            </router-link>
        </v-col>
        <v-col>
          <router-link to="">
          <v-btn color="#8D6E63">button 2</v-btn>
          </router-link>
        </v-col>
        <v-col>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="#8D6E63" dark v-on="on">커뮤니티</v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in comunityList" :key="index" @click="selectItem(item)">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="#8D6E63" dark v-on="on">고객센터</v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in serviceCenterList" :key="index" @click="selectItem(item)">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>

      </v-row>

      <!-- 회원탈퇴 버튼 필요시 작성 -->
      <!-- <v-btn text color="grey">
        <span>회원 탈퇴</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn> -->
      <v-btn text color="white" onclick="location.href='http://localhost:8887/sign-up-choice'">
        <span>회원가입</span>
        <v-icon right>mdi-account-plus-outline</v-icon>
      </v-btn>
      <!-- 로그인 안되어있을경우 -->

      <v-btn v-if="isAuthenticated == false" text color="white" onclick="location.href='http://localhost:8887/sign-in'">
        <span>로그인</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>
      <v-btn v-else text color="white" v-on:click="logout">
        <span>로그아웃</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
      </v-app-bar>

    <!-- 왼쪽 슬라이딩메뉴 -->
    <v-navigation-drawer app v-model="navigation_drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">닉네임</v-list-item-title>
          <router-link to="MemberMypage">
          <v-list-item-subtitle>Mypage</v-list-item-subtitle>
          </router-link>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item v-for="link in links" :key="link.name" router :to="link.route">
          <v-list-item-action>
            <v-icon left>
              {{ link.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";


export default {
  name: 'NavigationMenuForm',
  data () {
    return {
      isTrue: false,
      navigation_drawer: false,
      links: [
      { icon: 'mdi-bulletin-board', text: '게시판', name: 'Board', route: '/board' },
          { icon: 'mdi-coffee', text: '카페 목록',
              name: 'CafeListPage', route: '/cafe-list-page' },
      ],
      comunityList: ['자유게시판', '리뷰게시판', ],
      serviceCenterList: ['Q&A', '공지사항'],
  }
},
computed: {
    ...mapState(["isAuthenticated"]),
  },
  mounted() {
    if (localStorage.getItem("userInfo")) {
      console.log("userinfo가 있습니다")
      console.log(this.$store.state.isAuthenticated)
      this.$store.state.isAuthenticated = true;// 로그인되어있음
    } else {
      console.log("userinfo가 없습니다.")
      console.log(this.$store.state.isAuthenticated)
      this.$store.state.isAuthenticated = false;//로그인안되어있음
    }
  },
methods: {


  logout () {
        console.log('localStorage.getItem("userInfo"): ' + localStorage.getItem("userInfo"))
          let token = localStorage.getItem("userInfo")
        const length = token.length
        console.log('token: ' + token + ', length: ' + length)
        token = token.substr(1, length - 2)//양쪽에 있는 "" 제거 substr("시작 위치", "길이")
        console.log('token: ' + token + ', length: ' + token.length)
        axios.post("http://localhost:8888/member/logout", token)//토큰을 보냄
            .then(() => {
              alert("로그아웃 완료");
              localStorage.removeItem("userInfo");//로컬스토리지에서 제거
              this.$store.state.isAuthenticated = false;
            })
        },
        selectItem(item) {
      console.log('Selected item:', item)
      if(item === '자유게시판') {
        this.$router.push({
                  name: 'FreeBoardListPage',
              })
      }
      if(item === '리뷰게시판') {
        this.$router.push({
                  name: 'ReviewBoardListPage',
              })
      }
      if(item === 'Q&A') {
        this.$router.push({
                  name: 'QuestionBoardListPage',
              })
      }
    }

},
}
</script>

<style>

</style>