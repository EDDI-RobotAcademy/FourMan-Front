import {
    //예약관련
    REQUEST_CAFE_SEAT_TO_SPRING,
    
 
 } from './mutation-types'
 
 export default {
    //예약관련
    [REQUEST_CAFE_SEAT_TO_SPRING](state,passingData){
       state.seatData=passingData.seatResponse
       state.tableData=passingData.tableResponse
    },

    setAvailableTimes(state, payload) {
      state.availableTimes = payload;
    },
    setSelectedSeats(state, payload) {
      state.selectedSeats = payload;
    },
    
 }