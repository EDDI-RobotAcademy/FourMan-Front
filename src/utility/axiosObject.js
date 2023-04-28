import axios from "axios";

const axiosInst = axios.create({
    baseURL: 'http://localhost:8888',
    // timeout:2500
    timeout: 10000, //
})
/* 
생성된 axiosInst를 사용하여 API 요청을 보낼 때마다 요청이 2.5초 이내에 완료되지 않으면
 자동으로 중단되고, 타임아웃 에러가 발생합니다. 
 이렇게 설정하는 이유는 요청이 너무 오래 걸리거나 응답이 없을 때, 
요청이 무한정 기다리는 것을 방지하기 위함입니다.
*/
export default axiosInst