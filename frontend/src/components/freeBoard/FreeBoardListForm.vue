<template>
    <v-container>
        <v-data-table 
            :headers="headerTitle" 
            :items="boards"
            :items-per-page="10"
            @click:row="readRow"
            class="elevation-1"
            item-key="boardId"
            v-model="selectedItems"/>
      </v-container>
  </template>
  
  <script>
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
              ],
              selectedItems: [],
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
      }
  }
  </script>
  
  <style>
  </style>