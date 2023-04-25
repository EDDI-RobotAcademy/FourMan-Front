<template>
    <div class="mt-10 mb-10">
      <div class="text-center mb-5" style="display: flex;">
      <div class="me-3 pt-5 pb-5" style="width: 25%; border: 1px solid #ccc; border-radius: 10px;">
        카페 수: {{ cafeInfoList.length }}
      </div>
      <div class="me-3 pt-5 pb-5" style="width: 25%; border: 1px solid #ccc; border-radius: 10px;">
        총 매출액: {{ totalSales }}
      </div>
      <div class="me-3 pt-5 pb-5" style="width: 25%; border: 1px solid #ccc; border-radius: 10px;">
        총 예약건수 {{ totalReservationCount }}
      </div>
      <div class="me-3 pt-5 pb-5" style="width: 25%; border: 1px solid #ccc; border-radius: 10px;">
        총 주문건수: {{ totalOrderCount }}
      </div>
    </div>
        <div class="text-center">
          <canvas ref="myChart" style="height: 500px; width: 200px;"></canvas>
        </div>
        <div>
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
                        <th>별점</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cafeInfo, index) in filteredMembers" :key="index">
                        <td>{{ cafeInfo.cafeId }}</td>
                        <td>{{ cafeInfo.cafeName }}</td>
                        <td>{{ cafeInfo.cafeTel }}</td>
                        <td>{{ cafeInfo.startTime }}</td>
                        <td>{{ cafeInfo.endTime }}</td>
                        <td style="display: flex;"><v-rating
                              :value="cafeInfo.ratingAverage"
                              color="amber"
                              dense
                              half-increments
                              readonly
                              size="14"
                              background-color="gray"
                            ></v-rating>
                            <span class="ms-1 grey--text ms-4">{{ cafeInfo.ratingAverage.toFixed(1) }}</span>
                            <span class="ms-1 grey--text ms-4">({{ cafeInfo.ratingCount }})</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
    
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
    name: 'CafeManagementForm',
    props: {
        cafeInfoList: {
            type: Array
        }
    },
    data() {
      return {
        searchText: '',
        totalSales: 0,
        totalOrderCount: 0,
        totalReservationCount: 0,
      }
    },
    computed: {
      filteredMembers() {
        return this.cafeInfoList.filter(cafe => {
          return cafe.cafeName.includes(this.searchText);
        });
      },
    },
    watch: {
      cafeInfoList: function() {
        this.totalSales = this.cafeInfoList.reduce((acc, cafe) => acc + cafe.monthTotalSales, 0);
        this.totalOrderCount = this.cafeInfoList.reduce((acc, cafe) => acc + cafe.monthOrderCount, 0);
        this.totalReservationCount = this.cafeInfoList.reduce((acc, cafe) => acc + cafe.monthReservationCount, 0);
        
        const ctx = this.$refs.myChart.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.cafeInfoList.map(cafe => cafe.cafeName),
            datasets: [{
              label: '카페별 예약 건수',
              data: this.cafeInfoList.map(cafe => cafe.monthReservationCount),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            },
            {
              label: '카페별 주문 건수',
              data: this.cafeInfoList.map(cafe => cafe.monthOrderCount),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
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