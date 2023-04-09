<template>
  <div class="seat-layout" >
  <!-- is-reserved클래스가 isReserved상태에 따라 구현될지말지 결정됨 -->
    <div v-for="seat in seatData" :key="seat.seatNo"
         :class="[{ 'is-reserved': seat.isReserved }, 'seat']"
         :style="{ left: seat.x + 'px', top: seat.y + 'px', width: seat.width + 'px', height: seat.height + 'px' }"
         @click="reserveSeat(seat)">
         <svg-icon type="mdi" :path="path"></svg-icon>
      {{ seat.seatNo }}
    </div>
    <div v-for="(table,idx) in tableData" :key="'table'+idx"
         :class="[table.tableName === 'TABLE' ? 'table' : (table.tableName === 'COUNTER' ? 'counter' : '')]"
         :style="{ left: table.x + 'px', top: table.y + 'px', width: table.width + 'px', height: table.height + 'px' }"
         >
        {{table.tableName}}
    </div>

          
  </div>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiSeat} from '@mdi/js'
export default {
  name: 'HallSeatForm',
  components:{
    SvgIcon

  },
  props: {
    seatData: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
  },
  data(){
    return{
      path: mdiSeat,
      // tables: [
      //    { id: 101, x: 0, y: 30, width: 400, height: 70,  },
      //    { id: 102, x: 10, y: 310, width: 160, height: 70,  },
      //    { id: 103, x: 10, y: 570, width: 160, height: 70,  },
      //    { id: 104, x: 410, y: 190, width: 50, height: 70,  },
      //    { id: 105, x: 410, y: 290, width: 50, height: 70,  },
      //    { id: 106, x: 410, y: 390, width: 50, height: 70,  },
      // ],
      // counter: { x: 350, y: 500, width: 170, height: 200, },
    
    }
  },
  methods: {
    reserveSeat(seat) {
      if (!seat.isReserved) {
        seat.isReserved = true
        // 예약 처리 로직
      }
    }
  }
}
</script>
<style scoped>

.seat {
  position: absolute;
  background-color: rgb(8, 242, 82,0.8);
  border: 1px solid #e0dcdc;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
  font-size: 14px;
}
.is-reserved {
  background-color: rgba(216, 17, 17, 0.8);
  color: #fff;
}
.table{
  position: absolute;
  color:white;
  background-color:rgb(75, 40, 40,0.8);
  text-align: center;
  line-height: 70px;
  font-size: 14px;
}
.counter{
  position: absolute;
  color:white;
  background-color:rgb(75, 40, 40,0.8);
  text-align: center;
  line-height: 200px;
  font-size: 14px;
}
</style>