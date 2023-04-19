<template>
    <section>
        <!-- board list area -->
          <div id="board-list">
              <div class="container">
                  <table class="board-table">
                      <thead>
                      <tr>
                          <th scope="col" class="th-num">번호</th>
                          <th scope="col" class="th-title">제목</th>
                          <th scope="col" class="th-writer">작성자</th>
                          <th scope="col" class="th-date">등록일</th>
                          <th scope="col" class="th-viewCnt">조회수</th>
                          <th scope="col" class="th-recommendation">추천수</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(freeBoard, index) in calData" :key="index">
                          <td>{{ freeBoard.boardId }}</td>
                          <th>
                            <router-link
                                :to="{
                                    name: 'FreeBoardReadPage',
                                    params: { boardId: freeBoard.boardId.toString() },
                                }"
                                >{{ freeBoard.title}}</router-link>
                          </th>
                          <td>{{ freeBoard.writer }}</td>
                          <td>{{ freeBoard.regDate.slice(0, 10) }}</td>
                          <td>{{ freeBoard.viewCnt }}</td>
                          <td>{{ freeBoard.recommendation }}</td>
                      </tr>
                      </tbody>
                  </table>
                  <div class="EULJIRO mt-5 mb-5" style="height: 250px; display: flex; justify-content: center; align-items: center;" v-if="freeBoards.length === 0">
                    <h2>작성된 게시물이 없습니다!</h2>
                    </div>
              </div>
          </div>
          <v-pagination
            v-model="curPageNum"
            :length="numOfPages"
            color="#5D4037"
            class="mt-10"
            flat
            ></v-pagination>
      </section>


  </template>

  <script>
import router from "@/router"

  export default {
      name: "FreeBoardListForm",
      props: {
          freeBoards: {
              type: Array
          }
      },
      data () {
          return {
              headerTitle: [
                  { text: '번호', value: 'boardId', width: "70px" },
                  { text: '제목', value: 'title', width: "200px" },
                  { text: '작성자', value: 'writer', width: "100px" },
                  { text: '등록일자', value: 'regDate', width: "100px" },
                  { text: '조회수', value: 'viewCnt', width: "50px" },
                  { text: '추천수', value: 'recommendation', width: "50px" },
              ],
              selectedItems: [],
              dataPerPage: 8,
              curPageNum: 1,
              //boardsWithSelected: [this.boards.map(x => ({...x, isSelectable: false}))],
          }
      },
      methods: {
          readRow (readValue) {
              router.push({
                  name: 'FreeBoardReadPage',
                  params: { boardId: readValue.boardId.toString() }
              })
          },
      },
      computed: {
            startOffset() {
                return (this.curPageNum - 1) * this.dataPerPage;
            },
            endOffset() {
                return this.startOffset + this.dataPerPage;
            },
            numOfPages() {
                return Math.ceil(this.freeBoards.length / this.dataPerPage);
            },
            calData() {
                return this.freeBoards.slice(this.startOffset, this.endOffset);
            },
        },
    }

  </script>

  <style scoped>
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