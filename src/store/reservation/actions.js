import {
    //예약관련
    REQUEST_CAFE_SEAT_TO_SPRING,

} from './mutation-types'

// import axios from 'axios'
import axiosInst from '@/utility/axiosObject'
export default {

    //예약 관련


    requestCreateCafeSeatToSpring({ }, payload) {
        console.log("requestCreateCafeSeatToSpring 작동")
        return axiosInst.post("/reservation/register", payload)
            .then((res) => {
                alert("예약완료되었습니다.");
            })
            .catch((res) => {
                alert(res.message);
            });

    },

    requestCafeSeatToSpring({ commit }, payload) {
        console.log("requestCafeSeatToSpring 작동")
        const { cafeId, time } = payload
        return axiosInst.get(`/reservation/cafe/${cafeId}/time/${time}`)
            .then((res) => {
                commit(REQUEST_CAFE_SEAT_TO_SPRING, res.data)
                // console.log(" res.data.seatResponse: " + res.data.seatResponse)
                // console.log(" res.data.tableResponse: " + res.data.tableResponse)
            })
            .catch((error) => {
                alert(error)
            })
    },
    requestDeleteCafeSeatToSpring({ }) {
        console.log("requestDeleteCafeSeatToSpring 작동")
        return axiosInst.delete(`/reservation/seats/delete`)
            .then(() => {
                alert("좌석 초기화 성공")
            })
            .catch(() => {
                alert("삭제실패");
            })
    },
    setSelectedSeats({ commit }, payload) {
        commit("setSelectedSeats", payload);
      },


    

    calculateAvailableTimes({ commit }, {startTime1, endTime1}) {
        console.log(" calculateAvailableTimes 작동")
        const now = new Date();
        const startTime = parseInt(startTime1);
        const endTime = parseInt(endTime1);
        // console.log("startTime", startTime);
        // console.log("endTime", endTime);

        if (startTime === endTime) return []; // 시작 시간과 종료 시간이 같으면 빈 배열을 반환

        const times = [];

        if (startTime >= endTime) {
            let day = 0;
            let cnt = 0;

            while (day < 2) {
                const currentDate = new Date(now);
                let hour = startTime;
                let addedDay = 0;

                while (cnt < 20) {
                    if (endTime < startTime && hour >= 24) {
                        //새벽에종료하는경우
                        hour = hour % 24;
                        addedDay = 1;
                    }

                    if (hour === endTime || (hour > endTime && hour < startTime)) {
                        break; //새벽마감시간 지나면 종료
                    }

                    const nextDate = new Date(currentDate);
                    nextDate.setDate(nextDate.getDate() + addedDay);

                    const dateStr = `${nextDate.getFullYear()}-${String(
                        nextDate.getMonth() + 1
                    ).padStart(2, "0")}-${String(nextDate.getDate()).padStart(2, "0")}`;
                    const time = `${dateStr} ${hour.toString().padStart(2, "0")}:00`;

                    const timeDate = new Date(time);
                    const timeYear = timeDate.getFullYear();
                    const timeMonth = timeDate.getMonth();
                    const timeDay = timeDate.getDate();
                    const timeHour = timeDate.getHours();

                    const nowYear = now.getFullYear();
                    const nowMonth = now.getMonth();
                    const nowDay = now.getDate();
                    const nowHour = now.getHours();

                    if (
                        day === 0 &&
                        (timeYear < nowYear ||
                            timeMonth < nowMonth ||
                            timeDay < nowDay ||
                            (timeYear === nowYear &&
                                timeMonth === nowMonth &&
                                timeDay === nowDay &&
                                timeHour < nowHour))
                    ) {
                        // 오늘 현재 시간 이전의 시각 제외
                        hour += 2;
                        continue;
                    }

                    times.push(time);
                    hour += 2;
                }

                now.setDate(now.getDate() + 1); // 다음 날짜로 변경
                day++;
                cnt++;
            }
        } else {
            let day = 0;
            let cnt = 0;

            while (day < 2) {
                const currentDate = new Date(now);
                let hour = startTime;
                let addedDay = 0;
                let sw = false;
                while (cnt < 20) {
                    if (hour >= 24) {
                        hour = hour % 24;
                        addedDay = 1;
                        sw = true;
                    }

                    if (hour === endTime || sw == true || hour > endTime) {
                        sw = false;
                        break;
                    }

                    const nextDate = new Date(currentDate);
                    nextDate.setDate(nextDate.getDate() + addedDay);

                    const dateStr = `${nextDate.getFullYear()}-${String(
                        nextDate.getMonth() + 1
                    ).padStart(2, "0")}-${String(nextDate.getDate()).padStart(2, "0")}`;
                    const time = `${dateStr} ${hour.toString().padStart(2, "0")}:00`;

                    const timeDate = new Date(time);
                    const timeYear = timeDate.getFullYear();
                    const timeMonth = timeDate.getMonth();
                    const timeDay = timeDate.getDate();
                    const timeHour = timeDate.getHours();

                    const nowYear = now.getFullYear();
                    const nowMonth = now.getMonth();
                    const nowDay = now.getDate();
                    const nowHour = now.getHours();

                    if (
                        day === 0 &&
                        (timeYear < nowYear ||
                            timeMonth < nowMonth ||
                            timeDay < nowDay ||
                            (timeYear === nowYear &&
                                timeMonth === nowMonth &&
                                timeDay === nowDay &&
                                timeHour < nowHour))
                    ) {
                        // 오늘 현재 시간 이전의 시각 제외
                        hour += 2;
                        continue;
                    }

                    times.push(time);
                    hour += 2;
                }

                now.setDate(now.getDate() + 1); // 다음 날짜로 변경
                day++;
                cnt++;
            }
        }

        let calculatedTimes=times;

        // 결과를 커밋하여 state.availableTimes를 업데이트합니다.
        commit("setAvailableTimes", calculatedTimes);
        return calculatedTimes;


    }
}