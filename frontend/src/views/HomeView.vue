<template>
  <v-container>
    <div id="home">
        <router-link to="/">Home</router-link> |
      <nav>
        <router-link to="/sign-up">회원가입</router-link> |
        <router-link to="/sign-in">로그인</router-link> |
        <!-- <router-link to="/search-password">비밀번호 찾기</router-link> | -->
        <router-link to="/free-board-list-page">자유게시판 리스트 페이지</router-link> |

      <router-view/>
      </nav>
    </div>
  </v-container>
</template>

<script>
  import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'Home',

    components: {
      HelloWorld,
    },
  }
</script>
