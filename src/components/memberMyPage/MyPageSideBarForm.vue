<template>
  <div>
    <v-navigation-drawer
        permanent
        height="100%"
        app
        color="brown lighten-2"
        hide-overlay
    >
      <v-divider style="border-color: black; margin-top: 79px" ></v-divider>

      <v-list-item style="height: 20%">
        <v-list-item-content>
          <v-list-item-title class="mb-5" style="margin-top: 145px">
            <div align="center">
              <router-link to="/member-my-page">
                <v-avatar
                    :size="110"
                    color="grey lighten-4">
                  <img src="@/assets/myPage/default_profile_image.png" alt="avatar">
                </v-avatar>
              </router-link>
            </div>
          </v-list-item-title>
          <v-list-item-subtitle class="black--text justify-center mt-3">
            <div align="center" style="font-size: 17px">
               {{ nickName }} 님
            </div>
            <div align="center" class="mt-1" style="font-size: 15px">
               {{ memberType }}
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider style="border-color: black; margin-top: 130px" ></v-divider>

      <!-- 선택 메뉴 -->

      <v-list dense nav>
        <v-list-item
            v-for="menu in menus"
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
export default {
   name: "MyPageSideBarForm",
   data(){
    return {
      nickName: String,
      memberType: String,
      menus: [],
      menusForMember: [
         {
            title: "내 정보",
            icon: "mdi-account",
            route: "/member-my-page"},
         {
            title: "예약 내역",
            icon: "mdi-currency-usd",
            route: "/member-order-history-page"},
         {
            title: "나의 게시글",
            icon: "mdi-clipboard-text",
            route: "/my-free-board-page"},
         {
            title: "나의 문의",
            icon: "mdi-comment-question",
            route: "/my-question-board-page"},
         {
            title: "나의 후기",
            icon: "mdi-star",
            route: "/my-review-board-page"},
      ],
      menusForCafe : [
         {
            title: "내 정보",
            icon: "mdi-account",
            route: "/member-my-page"},
         {
            title: "카페 관리",
            icon: "mdi-coffee",
            route: "/"},
         {
            title: "메뉴 관리",
            icon: "mdi-list-box",
            route: "/product-manage-page"},
      ],
      menusForManager : [
         {
            title: "내 정보",
            icon: "mdi-account",
            route: "/member-my-page"},
         {
            title: "회원 관리",
            icon: "mdi-account-supervisor",
            route: "/member-management-page"},
         {
            title: "카페 리스트",
            icon: "mdi-coffee",
            route: "/cafe-management-page"},
      ]
    }
  },
  async mounted() {
   this.nickName = JSON.parse(localStorage.getItem('userInfo')).nickName
   this.memberType = JSON.parse(localStorage.getItem('userInfo')).authorityName
   if(this.memberType === "MEMBER") {
      this.menus = this.menusForMember
   } else if (this.memberType === "CAFE") {
      this.menus = this.menusForCafe
   } else {
      this.menus = this.menusForManager
   }
  },
}
</script>

<style>

</style>