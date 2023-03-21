<template>
  <v-container>
    <div id="home">
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/sign-up">회원가입</router-link> |
        <!-- <router-link to="/sign-in">로그인</router-link> |
        <router-link to="/search-password">비밀번호 찾기</router-link> | -->
        <router-link to="/free-board-list-page">자유게시판 리스트 페이지</router-link> |
      </nav>
      <router-view/>
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'HomeView',

  components: {
  },
}

</script>
