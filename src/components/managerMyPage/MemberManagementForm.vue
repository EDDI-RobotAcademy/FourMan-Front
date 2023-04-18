<template>
    <div class="mt-5">
      <div class="mb-1" style="float: right;">
        <v-text-field
            label="회원 이름 검색"
            hide-details="auto"
            append-icon="mdi-magnify"
            v-model="searchText"
            />
      </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>회원등급</th>
                    <th>이메일</th>
                    <th>전화번호</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(memberInfo, index) in filteredMembers" :key="index">
                    <td>{{ memberInfo.id }}</td>
                    <td>{{ memberInfo.nickName }}</td>
                    <td>{{ memberInfo.authorityName }}</td>
                    <td>{{ memberInfo.email }}</td>
                    <td>{{ memberInfo.phoneNumber }}</td>
                    <td v-if="memberInfo.authorityName != '관리자'"><v-btn class="error" small @click="withdrawal(memberInfo.id, memberInfo.nickName)">탈퇴</v-btn></td>
                </tr>
            </tbody>
	    </table>
    </div>
</template>

<script>

import { mapActions } from 'vuex'
const myPageModule= 'myPageModule'

export default {
    name: 'MemberManagementForm',
    props: {
        memberInfoList: {
            type: Array
        }
    },
    data() {
      return {
        searchText: ''
      }
    },
    methods: {
      ...mapActions(myPageModule,[
          'requestWithdrawalToSpring'
      ]),
      async withdrawal(memberId, nickName) {
        if(confirm('"' + nickName + '"' + ' 회원을 정말 탈퇴시키겠습니까?')) {
          await this.requestWithdrawalToSpring({ memberId })
          location.reload()
         }
      }
    },
    computed: {
      filteredMembers() {
        return this.memberInfoList.filter(member => {
          return member.nickName.includes(this.searchText);
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