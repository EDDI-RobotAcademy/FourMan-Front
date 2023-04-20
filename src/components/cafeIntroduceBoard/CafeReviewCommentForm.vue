<template>
  <v-container class="mt-7 mb-5">
    <div class="EULJIRO ms-2 mb-5">
        리뷰 한줄평 <v-icon>mdi-camera</v-icon>
    </div>
    <table>
        <thead>
            <tr>
                <th>작성자</th>
                <th>별점</th>
                <th>제목</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="reviewBoards.length === 0">
                <td>작성된 리뷰가 없습니다!</td>
            </tr>
            <tr v-for="(reviewBoard, index) in reviewBoards" :key="index" >
                <td v-if="cafe.cafeName === reviewBoard.cafeName">{{ reviewBoard.writer }}</td>
                <td v-if="cafe.cafeName === reviewBoard.cafeName">
                    <v-rating
                        :value=reviewBoard.rating
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                        background-color="gray"
                    ></v-rating>
                </td>
                <td v-if="cafe.cafeName === reviewBoard.cafeName">{{ reviewBoard.title }}</td>
            </tr>
            </tbody>
    </table>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
const reviewBoardModule= 'reviewBoardModule'

export default {
    name: "CafeReviewForm",
    props: {
    cafe: {
        type: Object,
        required: true,
        },
    },
    computed: {
        ...mapState(reviewBoardModule,[
        'reviewBoards'
        ]),
    },
    mounted () {
        this.requestReviewBoardListToSpring()
    },
    methods: {
        ...mapActions(reviewBoardModule,[
        'requestReviewBoardListToSpring'
        ]),
    },
}
</script>

<style scoped>

body {
    padding:1.5em;
    background: #f5f5f5
  }
  
  table {
    border: 1px #a39485 solid;
    font-size: .9em;
    box-shadow: 0 2px 5px rgba(0,0,0,.25);
    width: 100%;
    border-collapse: collapse;
    border-radius: 5px;
    overflow: hidden;
  }
  
  th {
    text-align: left;
  }
    
  thead {
    font-weight: bold;
    color: #fff;
    background: #73685d;
  }
    
   td, th {
    padding: 1em .5em;
    vertical-align: middle;
  }
    
   td {
    border-bottom: 1px solid rgba(0,0,0,.1);
    background: #fff;
  }
  
  a {
    color: #73685d;
  }
    
   @media all and (max-width: 768px) {
      
    table, thead, tbody, th, td, tr {
      display: block;
    }
    
    th {
      text-align: right;
    }
    
    table {
      position: relative; 
      padding-bottom: 0;
      border: none;
      box-shadow: 0 0 10px rgba(0,0,0,.2);
    }
    
    thead {
      float: left;
      white-space: nowrap;
    }
    
    tbody {
      overflow-x: auto;
      overflow-y: hidden;
      position: relative;
      white-space: nowrap;
    }
    
    tr {
      display: inline-block;
      vertical-align: top;
    }
    
    th {
      border-bottom: 1px solid #a39485;
    }
    
    td {
      border-bottom: 1px solid #e5e5e5;
    }
    
    
    }
</style>