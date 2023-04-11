<template>
  <div class="seat-layout">
    <!-- is-reserved클래스가 isReserved상태에 따라 구현될지말지 결정됨 -->
    <div
      v-for="seat in seatData"
      :key="seat.seatNo"
      :class="[
        { 'is-reserved': seat.reserved, 'is-selected': isSelected(seat) },
        'seat',
      ]"
      :style="{
        left: seat.x + 'px',
        top: seat.y + 'px',
        width: seat.width + 'px',
        height: seat.height + 'px',
      }"
      @click="seat.reserved || reserveSeat(seat)"
    >
      <svg-icon type="mdi" :path="path"></svg-icon>
      {{ seat.seatNo }}
    </div>
    <div
      v-for="(table, idx) in tableData"
      :key="'table' + idx"
      :class="[
        table.tableName === 'TABLE'
          ? 'table'
          : table.tableName === 'COUNTER'
          ? 'counter'
          : '',
      ]"
      :style="{
        left: table.x + 'px',
        top: table.y + 'px',
        width: table.width + 'px',
        height: table.height + 'px',
      }"
    >
      {{ table.tableName }}
    </div>
  </div>
</template>
<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiSeat } from "@mdi/js";
export default {
  name: "HallSeatForm",
  components: {
    SvgIcon,
  },
  props: {
    seatData: {
      type: Array,
      required: true,
    },
    tableData: {
      type: Array,
      required: true,
    },
    cafe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      path: mdiSeat,
      selectedSeats: [],
    };
  }, 
  computed: {
    unreservedSeatsCount() {
      return this.seatData.filter((seat) => !seat.reserved).length;
    },
    totalSeatsCount() {
      return this.seatData.length;
    },
  },
  watch: {
    unreservedSeatsCount(newUnreservedCount) {
      this.$emit('update-seats-count', {
        unreserved: newUnreservedCount,
        total: this.totalSeatsCount,
      });
    },
    totalSeatsCount(newTotalCount) {
      this.$emit('update-seats-count', {
        unreserved: this.unreservedSeatsCount,
        total: newTotalCount,
      });
    },
  },
  
  methods: {
    reserveSeat(seat) {
      if (!seat.isReserved) {
        //예약 가능상황이면
        // seat.isReserved = true//예약상태로바꾼다.
        // 예약 처리 로직
        if (this.isSelected(seat)) {
          //이미 선택된거면 선택취소
          this.selectedSeats = this.selectedSeats.filter((s) => s !== seat);
        } else {
          this.selectedSeats.push(seat);
        }
        this.$emit("onUpdateSelectedSeats", this.selectedSeats);
      }
    },
    isSelected(seat) {
      return this.selectedSeats.includes(seat);
    },
    resetSelectedSeats() {
      this.selectedSeats = [];
    },
    
  },
  created(){
    console.log("자식컴퍼넌트cafe:",this.cafe)
    console.log(this.seatData[2])
  }
};
</script>
<style scoped>
.seat {
  position: absolute;
  background-color: rgb(8, 242, 82, 0.8);
  border: 1px solid #e0dcdc;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
  font-size: 14px;
}
.is-selected {
  background-color: rgba(0, 0, 255, 0.8);
  color: #fff;
}
.is-reserved {
  background-color: rgba(216, 17, 17, 0.8);
  color: #fff;
}
.table {
  position: absolute;
  color: white;
  background-color: rgb(75, 40, 40, 0.8);
  text-align: center;
  line-height: 70px;
  font-size: 14px;
}
.counter {
  position: absolute;
  color: white;
  background-color: rgb(75, 40, 40, 0.8);
  text-align: center;
  line-height: 200px;
  font-size: 14px;
}
</style>