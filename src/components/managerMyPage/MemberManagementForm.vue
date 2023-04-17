<template>
    <div class="mt-5" style="display: flex; align-items: center;">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>회원등급</th>
                    <th>이메일</th>
                    <th>전화번호</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(memberInfo, index) in memberInfoList" :key="index">
                    <td>{{ memberInfo.id }}</td>
                    <td>{{ memberInfo.nickName }}</td>
                    <td>{{ memberInfo.authorityName }}</td>
                    <td>{{ memberInfo.email }}</td>
                    <td>{{ memberInfo.phoneNumber }}</td>
                </tr>
            </tbody>
	    </table>
    </div>
</template>

<script>

export default {
    name: 'MemberManagementForm',
    props: {
        memberInfoList: {
            type: Array
        }
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