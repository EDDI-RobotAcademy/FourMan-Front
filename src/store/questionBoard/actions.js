import {

   //질문 게시판 관련
   REQUEST_QUESTION_BOARD_LIST_TO_SPRING,
   REQUEST_QUESTION_BOARD_TO_SPRING,

   //게시물 검색 관련
   REQUEST_SEARCH_BOARD_TO_SPRING,

   //댓글 관련
   REQUEST_QUESTION_BOARD_COMMENT_LIST_TO_SPRING,
} from './mutation-types'

// import axios from 'axios'
import axiosInst from '@/utility/axiosObject'
export default {

    requestQuestionBoardListToSpring ({ commit }) {
        return axiosInst.get('/question-board/list')
            .then((res) => {
                commit(REQUEST_QUESTION_BOARD_LIST_TO_SPRING, res.data)
            })
     },

    requestCreateQuestionBoardToSpring({}, payload) {
        const { title, questionType, writer, content, memberId, secret} = payload
        return axiosInst.post('/question-board/register',
        { title, questionType, writer, content, memberId, secret})
            .then((res) => {
                alert('게시물 등록 성공')
                return res;
            })
            .catch (() =>{
                alert('게시물 등록에 실패했습니다')
            })
    },

    requestQuestionBoardToSpring({commit}, boardId) {
        return axiosInst.get(`/question-board/${boardId}`)
        .then((res) =>{
            commit(REQUEST_QUESTION_BOARD_TO_SPRING, res.data)
        })
    },

    requestQuestionBoardModifyToSpring({}, payload) {
        const { boardId, title, content} = payload
        return axiosInst.put(`/question-board/${boardId}`,
        { title, content})
        .then(() => {
            alert('게시물 수정 성공')
        })
        .catch(() => {
            alert('수정 실패')
        })
    },

    requestQuestionBoardDeleteToSpring ({}, boardId) {
        return axiosInst.delete(`/question-board/${boardId}`)
            .then(() => {
                alert("삭제 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },

    //게시물 검색 관련
    requestSearchBoardToSpring({commit}, searchText) {
        console.log('requestSearchBoardToSpring 작동')
        return axiosInst.get(`/question-board/search/${searchText}`)
            .then((res) => {
                commit(REQUEST_SEARCH_BOARD_TO_SPRING, res.data)
                console.log('searchBoard res.data' + res.data)
            })
            .catch(() => {
                alert('검색 실패')
            })
    },


    //댓글 관련
    requestQuestionBoardCommentRegisterToSpring( {}, payload) {
        const {comment, boardId, commentWriter,memberId} = payload
        console.log('데이터보내져랏')
        return axiosInst.post('/question-board/comment/register',
            {comment, boardId, commentWriter, memberId})
        .then(() =>{
            alert('댓글 등록 완료')
        })
    },
    requestQuestionBoardCommentListToSpring( { commit }, boardId ) {
        console.log('commentList :')
        return axiosInst.get(`/question-board/comment/${boardId}`)
            .then((res) => {
                commit(REQUEST_QUESTION_BOARD_COMMENT_LIST_TO_SPRING, res.data)
            })
    },
    requestQuestionBoardCommentDeleteToSpring ({}, commentId) {
        console.log('delete 전송 되냐?')
        return axiosInst.delete(`/question-board/comment/${commentId}`)
            .then(() => {
                alert("삭제 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },

    requestQuestionBoardCommentModifyToSpring(_, payload) {
        console.log('comment Modify 전송')
        const { commentId, commentModify } = payload
        return axiosInst.put(`/question-board/comment/${commentId}`,
        { commentId, comment: commentModify })
            .then(() => {
                alert('수정 성공')
            })
            .catch(() => {
                alert('오류 발생')
            })
        },
}