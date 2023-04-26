<template>
  <div>
    <v-navigation-drawer
        permanent
        hide-overlay
        height="100%"
        color=""
        width="250"
        style="position: relative;"
        class="mb-15"
    >
      <div class="d-flex align-center justify-center">
        <v-text-field
          v-model="search"
          label="메뉴 검색"
          single-line
          hide-details
          solo class="ml-3 mt-5 mr-3 mb-5"
        ></v-text-field>
      </div>

      <v-list-item style="height: 250px">
        <v-list-item-content>
          <v-list-item-title>
            <div align="center">
              <router-link to="/member-my-page">
                <v-avatar
                    :size="120"
                    color="grey lighten-4">
                  <img src="@/assets/myPage/default_profile_image.png" alt="avatar">
                </v-avatar>
              </router-link>
            </div>
          </v-list-item-title>
          <v-list-item-subtitle class="black--text justify-center">
            <div class="mt-4" align="center" style="font-size: 17px; font-weight: bold;">
               {{ nickName }} 님
            </div>
            <div align="center" class="mt-3" style="font-size: 16px">
               {{ memberType }}
            </div>
            <div v-if="memberType == '일반회원'" class="mt-2 d-flex align-center justify-center">
               <span style="font-size: 16px">보유 포인트 : {{ point | comma }}</span> 
               <v-icon style="font-size: 28px; margin-left: -7px; font-weight: bold;">mdi-alpha-p</v-icon> 
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-divider style="border-color: gray;"></v-divider> -->

      <!-- 선택 메뉴 -->

      <v-list dense nav>
        <v-list-item
            v-for="menu in filterMenus()"
            :key="menu.title"
            :to="menu.route"
            link
            class="ma-5">
          <v-list-item-icon>
            <v-icon color="black">{{ menu.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="height: 100%">
            <v-list-item-title class="black--text">
              {{ menu.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const myPageModule = 'myPageModule'

export default {
   name: "MyPageSideBarForm",
   data(){
    return {
      nickName: String,
      memberType: String,
      point: Number,
      menus: [],
      search: "",
      menusForMember: [
         {
            title: "내 정보",
            icon: "mdi-account",
            route: "/member-my-page"
         },
         {
            title: "결제 내역",
            icon: "mdi-currency-usd",
            route: "/member-order-history-page"
         },
         {
            title: "포인트 내역",
            icon: "mdi-alpha-p-circle",
            route: "/member-point-details-page"
         },
         {
            title: "나의 게시글",
            icon: "mdi-clipboard-text",
            route: "/my-free-board-page"
         },
         {
            title: "내가 찜한 카페",
            icon: "mdi-coffee",
            route: "/my-favorite-cafe-page",
         },
         {
            title: "나의 문의",
            icon: "mdi-comment-question",
            route: "/my-question-board-page"
         },
         {
            title: "나의 후기",
            icon: "mdi-star",
            route: "/my-review-board-page"
         },
      ],
      menusForCafe : [
         {
            title: "내 정보",
            icon: "mdi-account",
            route: "/member-my-page"
         },
         {
            title: "주문 내역",
            icon: "mdi-table-chair",
            route: "/my-cafe-order-list-page"
         },
         {
            title: "이벤트 관리",
            icon: "mdi-clipboard-text",
            route: "/my-cafe-event-page"
         },
         {
            title: "카페 관리",
            icon: "mdi-coffee",
            route: "/my-cafe-management-page"
         },
         {
            title: "메뉴 관리",
            icon: "mdi-cup",
            route: "/product-manage-page"
         },
      ],
      menusForManager : [
         {
            title: "내 정보",
            icon: "mdi-account",
            route: "/member-my-page"
         },
         {
            title: "회원 관리",
            icon: "mdi-account-supervisor",
            route: "/member-management-page"
         },
         {
            title: "카페 리스트",
            icon: "mdi-coffee",
            route: "/cafe-management-page"
         },
         {
            title: "포인트 내역",
            icon: "mdi-alpha-p-circle",
            route: "/point-details-page"
         },
      ]
    }
  },
  methods: {
    ...mapActions(
      myPageModule, ['requestMyInfoForSideBarToSpring']
    ),
    filterMenus() {
      return this.menus.filter(menu => menu.title.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  computed: {
    ...mapState(
      myPageModule, ['myInfoSideBar']
  )
  },
  async created() {
    await this.requestMyInfoForSideBarToSpring(JSON.parse(localStorage.getItem('userInfo')).id)

    console.log("memberType: " + this.myInfoSideBar.memberType)
    this.nickName = this.myInfoSideBar.nickName
    this.memberType = this.myInfoSideBar.memberType
    this.point = this.myInfoSideBar.point

    if(this.point == null) {
      this.point = 0;
    }

    if(this.memberType === "일반회원") {
        this.menus = this.menusForMember
    } else if (this.memberType === "카페회원") {
        this.menus = this.menusForCafe
    } else {
        this.menus = this.menusForManager
    }
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    },
}
</script>

<style scoped>

</style>