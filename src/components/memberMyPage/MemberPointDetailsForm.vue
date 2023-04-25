<template>
    <div class="mt-8 mb-10 ms-5 me-5">
        <div class="mb-2">
            <h2>포인트 내역</h2>
        </div>
      <div>
          <table class="mb-5">
              <thead>
                  <tr>
                      <th>순번</th>
                      <th>이름</th>
                      <th>적립내역</th>
                      <th>적립일자</th>
                      <th>적립 포인트</th>
                      <th>차감 / 지급 여부</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(pointPaymentDetails, index) in displayedMembers" :key="index">
                      <td>{{ pointPaymentDetails.infoId }}</td>
                      <td>{{ pointPaymentDetails.nickName }}</td>
                      <td>{{ pointPaymentDetails.history }}</td>
                      <td>{{ pointPaymentDetails.date.slice(0, 10) }}</td>
                      <td>{{ pointPaymentDetails.amount }}</td>
                      <td v-if="pointPaymentDetails.isUse === false">포인트 지급</td>
                      <td v-else>포인트 차감</td>
                  </tr>
              </tbody>
          </table>
          <v-pagination
                v-model="page"
                :length="Math.ceil(PointDetails.length / itemsPerPage)"
                :total-visible="5"
                color="#5D4037"
            ></v-pagination>
      </div>
    </div>
  </template>
  
<script>

const myPageModule= 'myPageModule'

export default {
    name: 'MemberPointDetailsForm',
    props: {
        PointDetails: {
            type: Array
        }
    },
    data() {
      return {
        searchText: '',
        page: 1,
        itemsPerPage: 10,
      }
    },
    computed: {
      displayedMembers() {
        const start = (this.page - 1) * this.itemsPerPage;
        const end = this.page * this.itemsPerPage;
        return this.PointDetails.slice(start, end);
        },
    }
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