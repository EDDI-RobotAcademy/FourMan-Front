import {

   //공지사항 게시판 관련
   REQUEST_NOTICE_BOARD_LIST_TO_SPRING,
   REQUEST_NOTICE_BOARD_TO_SPRING,

} from './mutation-types'

// import axiosInst from '@/utility/axiosObject'
import mainRequest from "@/api/mainRequest";
export default {
    //공지사항 관련
    requestNoticeBoardRegisterToSpring({}, payload) {
        const { title, notice, writer, content, memberId} = payload
        return mainRequest.post('/notice-board/register',
        { title, notice, writer, content, memberId})
            .then((res) => {
                alert('게시물 등록 성공')
                return res;
            })
            .catch (() =>{
                alert('게시물 등록에 실패했습니다')
            })
    },
    requestNoticeBoardListToSpring({ commit }) {
        console.log('requestNoticeBoardListToSpring 작동')
        return mainRequest.get('/notice-board/list')
        .then((res) => {
            commit(REQUEST_NOTICE_BOARD_LIST_TO_SPRING, res.data)
        })
    },
    requestNoticeBoardToSpring({ commit }, boardId) {
        console.log('requestNoticeBoardToSpring 작동')
        return mainRequest.get(`/notice-board/${boardId}`)
        .then((res) =>{
            commit(REQUEST_NOTICE_BOARD_TO_SPRING, res.data)
        })
    },
    requestNoticeBoardModifyToSpring ({}, payload) {
        const { boardId, title, content} = payload
        return mainRequest.put(`/notice-board/${boardId}`,
        { title, content})
        .then(() => {
            alert('게시물 수정 성공')
        })
        .catch(() => {
            alert('수정 실패')
        })
    },
    requestNoticeBoardDeleteToSpring({}, boardId) {
        console.log('requestNoticeBoardDeleteToSpring 작동')
        return mainRequest.delete(`/notice-board/${boardId}`)
            .then(() => {
                alert("삭제 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },



}