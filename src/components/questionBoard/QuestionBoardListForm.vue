<template>
    <div id="board-list">
      <div class="mb-1" style="float: right;">
        <v-text-field
            label="검색어를 입력하세요"
            hide-details="auto"
            append-icon="mdi-magnify"
            v-model="searchText"
            />
      </div>
        <table class="board-table">
          <thead>
            <tr>
              <th scope="col" class="th-num">번호</th>
              <th scope="col">질문유형</th>
              <th scope="col" class="th-title">제목</th>
              <th scope="col" class="th-writer">작성자</th>
              <th scope="col" class="th-date">등록일</th>
              <th scope="col" class="th-viewCnt">조회수</th>
            </tr>
          </thead>
          <tbody>
            <!-- 부모 게시물 행 -->
            <template v-for="(questionBoard, index) in displayedBoards">
              <tr :key="questionBoard.boardId">
                <td>{{ questionBoard.boardId }}</td>
                <td>{{ questionBoard.questionType }}</td>
                <th
                  @click.prevent="checkSecret(index, questionBoard)"
                  :to="{
                    name: 'QuestionBoardReadPage',
                    params: { boardId: questionBoard.boardId.toString() },
                  }"
                  :style="{ marginLeft: `${questionBoard.depth * 20}px` }"
                >
                  <b
                    v-bind:class="{ 'hover-cursor': isHover }"
                    v-on:mouseover="isHover = true"
                    v-on:mouseout="isHover = false"
                  >
                    {{ questionBoard.title }} [{{ questionBoard.commentCount }}]
                  </b>
                </th>

                <td>{{ questionBoard.writer }}</td>
                <td>{{ questionBoard.regDate.slice(0, 10) }}</td>
                <td>{{ questionBoard.viewCnt }}</td>
              </tr>

              <!-- 자식 게시물 행 -->
              <template v-if="questionBoard.replies">
                <tr v-for="(reply, replyIndex) in questionBoard.replies" :key="'child' + index + 'reply' + replyIndex">
                  <td >{{ reply.boardId }}</td>
                  <td>{{ reply.questionType }}</td>
                  <th
                  @click.prevent="checkSecret(index, questionBoard)"
                  :to="{
                    name: 'QuestionBoardReadPage',
                    params: { boardId: reply.boardId.toString() },
                  }"
                >
                  <b
                    v-bind:class="{ 'hover-cursor': isHover }"
                    v-on:mouseover="isHover = true"
                    v-on:mouseout="isHover = false"
                  >
                  <v-icon v-if="reply.depth>0">mdi-subdirectory-arrow-right</v-icon> {{ reply.title }}
                  </b>
                </th>
                  <td>{{ reply.writer }}</td>
                  <td>{{ reply.regDate.slice(0, 10) }}</td>
                  <td>{{ reply.viewCnt }}</td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
        <div
          class="NanumGothic mt-5 mb-5"
          style="height: 250px; display: flex; justify-content: center; align-items: center;"
          v-if="questionBoards.length === 0"
        >
          <h2>작성된 게시물이 없습니다!</h2>
        </div>
        <v-pagination
          v-model="page"
          :length="Math.ceil(filteredBoards.length / itemsPerPage)"
          color="#5D4037"
          class="mt-10"
          flat
        ></v-pagination>
      </div>
</template>

  <script>

  export default  {
      name: "QuestionBoardListForm",
      props: {
          questionBoards: {
              type: Array
          }
      },
      data () {
          return {
              headerTitle: [
                  { text: '번호', value: 'boardId', width: "70px" },
                  { text: '질문 유형', value: 'questionType', width: "90px" },
                  { text: '제목', value: 'title', width: "200px" },
                  { text: '작성자', value: 'writer', width: "100px" },
                  { text: '등록일자', value: 'regDate', width: "100px" },
                  { text: '조회수', value: 'viewCnt', width: "50px" },
              ],
              selectedItems: [],
              page: 1,
              itemsPerPage: 10,
              isHover: false,
              searchText: '',
          }
      },
      methods: {
        readRow (readValue) {
              router.push({
                  name: 'QuestionBoardReadPage',
                  params: { boardId: readValue.boardId.toString() }
              })
          },
          checkSecret(index, questionBoard) {
            this.$emit('check-secret' , index, questionBoard)
          }
      },
      computed: {
            // startOffset() {
            //     return (this.curPageNum - 1) * this.dataPerPage;
            // },
            // endOffset() {
            //     return this.startOffset + this.dataPerPage;
            // },
            // numOfPages() {
            //     return Math.ceil(this.questionBoards.length / this.dataPerPage);
            // },
            // calData() {
            //     return this.questionBoards.slice(this.startOffset, this.endOffset);
            // },
            filteredBoards() {
              return this.questionBoards.filter(questionBoard => {
                return questionBoard.title.includes(this.searchText);
              });
            },
            displayedBoards() {
              const start = (this.page - 1) * this.itemsPerPage;
              const end = this.page * this.itemsPerPage;
              return this.filteredBoards.slice(start, end);
            },
        },
  }
  </script>

<style scoped>
.hover-cursor {
  cursor: pointer;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
section.notice {
  padding: 80px 0;
}

.page-title {
  margin-bottom: 60px;
}
.page-title h3 {
  font-size: 28px;
  color: #333333;
  font-weight: 400;
  text-align: center;
}

#board-search .search-window {
  padding: 15px 0;
  background-color: #f9f7f9;
}
#board-search .search-window .search-wrap {
  position: relative;
/*   padding-right: 124px; */
  margin: 0 auto;
  width: 80%;
  max-width: 564px;
}
#board-search .search-window .search-wrap input {
  height: 40px;
  width: 100%;
  font-size: 14px;
  padding: 7px 14px;
  border: 1px solid #ccc;
}
#board-search .search-window .search-wrap input:focus {
  border-color: #333;
  outline: 0;
  border-width: 1px;
}
#board-search .search-window .search-wrap .btn {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 108px;
  padding: 0;
  font-size: 16px;
}

.board-table {
  font-size: 13px;
  width: 100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.board-table a {
  color: #333;
  display: inline-block;
  line-height: 1.4;
  word-break: break-all;
  vertical-align: middle;
}
.board-table a:hover {
  text-decoration: underline;
}
.board-table th {
  text-align: center;
}

.board-table .th-num {
  width: 100px;
  text-align: center;
}

.board-table .th-date {
  width: 200px;
}

.board-table th, .board-table td {
  padding: 14px 0;
}

.board-table tbody td {
  border-top: 1px solid #e7e7e7;
  text-align: center;
}

.board-table tbody th {
  padding-left: 28px;
  padding-right: 14px;
  border-top: 1px solid #e7e7e7;
  text-align: left;
}

.board-table tbody th p{
  display: none;
}

.btn {
  display: inline-block;
  padding: 0 30px;
  font-size: 15px;
  font-weight: 400;
  background: transparent;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  text-transform: uppercase;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.btn-dark {
  background: #555;
  color: #fff;
}

.btn-dark:hover, .btn-dark:focus {
  background: #373737;
  border-color: #373737;
  color: #fff;
}

.btn-dark {
  background: #555;
  color: #fff;
}

.btn-dark:hover, .btn-dark:focus {
  background: #373737;
  border-color: #373737;
  color: #fff;
}

/* reset */

* {
  list-style: none;
  text-decoration: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
.container {
  width: 1100px;
  margin: 0 auto;
}
.blind {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  margin: -1px;
  width: 1px;
  height: 1px;
}
</style>