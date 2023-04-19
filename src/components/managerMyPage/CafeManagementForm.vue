<template>
    <div class="mt-5">
        <div class="mb-1" style="float: right;">
            <v-text-field
                label="카페 이름 검색"
                hide-details="auto"
                append-icon="mdi-magnify"
                v-model="searchText"
                />
        </div>
        <table>
            <thead>
                <tr>
                    <th>카페번호</th>
                    <th>카페이름</th>
                    <th>전화번호</th>
                    <th>오픈시간</th>
                    <th>마감시간</th>
                    <th>주소</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(cafeInfo, index) in filteredMembers" :key="index">
                    <td>{{ cafeInfo.cafeId }}</td>
                    <td>{{ cafeInfo.cafeName }}</td>
                    <td>{{ cafeInfo.cafeTel }}</td>
                    <td>{{ cafeInfo.startTime }}</td>
                    <td>{{ cafeInfo.endTime }}</td>
                    <td>{{ cafeInfo.cafeAddress }}</td>
                </tr>
            </tbody>
	    </table>
    </div>
</template>

<script>

export default {
    name: 'CafeManagementForm',
    props: {
        cafeInfoList: {
            type: Array
        }
    },
    data() {
      return {
        searchText: ''
      }
    },
    computed: {
      filteredMembers() {
        return this.cafeInfoList.filter(cafe => {
          return cafe.cafeName.includes(this.searchText);
        });
      }
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