import {

   //질문 게시판 관련
   REQUEST_QUESTION_BOARD_LIST_TO_SPRING,
   REQUEST_QUESTION_BOARD_TO_SPRING,

   //게시물 검색 관련
   REQUEST_SEARCH_BOARD_TO_SPRING,

   //댓글 관련
   REQUEST_QUESTION_BOARD_COMMENT_LIST_TO_SPRING,

   //조회수 관련
//REQUEST_QUESTION_BOARD_VIEW_CNT_INCREASE_TO_SPRING,
} from './mutation-types'

// import axiosInst from '@/utility/axiosObject'
import mainRequest from "@/api/mainRequest";
export default {

    requestQuestionBoardListToSpring ({ commit }) {
        return mainRequest.get('/question-board/all-list')
            .then((res) => {
                commit(REQUEST_QUESTION_BOARD_LIST_TO_SPRING, res.data)
            })
     },

    requestCreateQuestionBoardToSpring({}, payload) {
        const { title, questionType, writer, content, memberId, secret} = payload
        const token = JSON.parse(localStorage.getItem('userInfo')).token
        return mainRequest.post('/question-board/register',
        { title, questionType, writer, content, memberId, secret} ,{
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then((res) => {
                alert('게시물 등록 성공')
                return res;
            })
            .catch (() =>{
                alert('게시물 등록에 실패했습니다')
            })
    },

    requestQuestionBoardToSpring({commit}, boardId) {
        return mainRequest.get(`/question-board/${boardId}`)
        .then((res) =>{
            commit(REQUEST_QUESTION_BOARD_TO_SPRING, res.data)
        })
    },

    requestQuestionBoardModifyToSpring({}, payload) {
        const { boardId, title, content} = payload
        const token = JSON.parse(localStorage.getItem('userInfo')).token
        return mainRequest.put(`/question-board/${boardId}`,
        { title, content}, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
        .then(() => {
            alert('게시물 수정 성공')
        })
        .catch(() => {
            alert('수정 실패')
        })
    },

    requestQuestionBoardDeleteToSpring ({}, boardId) {
        return mainRequest.delete(`/question-board/${boardId}`)
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
        return mainRequest.get(`/question-board/search/${searchText}`)
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
        const token = JSON.parse(localStorage.getItem('userInfo')).token
        console.log('데이터보내져랏')
        return mainRequest.post('/question-board/comment/register',
            {comment, boardId, commentWriter, memberId}, {
                headers: {
                    'Authorization': `Basic ${token}`
                }
            })
        .then(() =>{
            alert('댓글 등록 완료')
        })
    },
    requestQuestionBoardCommentListToSpring( { commit }, boardId ) {
        console.log('commentList :')
        return mainRequest.get(`/question-board/comment/${boardId}`)
            .then((res) => {
                commit(REQUEST_QUESTION_BOARD_COMMENT_LIST_TO_SPRING, res.data)
            })
    },
    requestQuestionBoardCommentDeleteToSpring ({}, commentId) {
        console.log('delete 전송 되냐?')
        const token = JSON.parse(localStorage.getItem('userInfo')).token
        return mainRequest.delete(`/question-board/comment/${commentId}`, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then(() => {
                alert("삭제 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },

    requestQuestionBoardCommentModifyToSpring(_, payload) {
        console.log('comment Modify 전송')
        const token = JSON.parse(localStorage.getItem('userInfo')).token
        const { commentId, commentModify } = payload
        return mainRequest.put(`/question-board/comment/${commentId}`,
        { commentId, comment: commentModify }, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then(() => {
                alert('수정 성공')
            })
            .catch(() => {
                alert('오류 발생')
            })
        },

    // Read쪽과 병합
    // 조회수
    // requestQuestionBoardViewCntIncreaseToSpring({ commit }, boardId) {
    //     console.log('조회수 액션 실행')
    //     return mainRequest.get(`/question-board/view/${boardId}`)
    //     .then((res) =>{
    //         commit(REQUEST_QUESTION_BOARD_VIEW_CNT_INCREASE_TO_SPRING, res.data)
    //     })

    // }

    //답글 등록 Register
    requestCreateReplyToSpring({}, payload) {
        const { title, questionType, writer, content, memberId, secret, parentBoardId } = payload
        const token = JSON.parse(localStorage.getItem('userInfo')).token
        return mainRequest.post("/question-board/register-reply", {
          title, questionType, writer, content, memberId, secret, parentBoardId
        },
         {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
        .then((res) => {
          alert("답글 등록 성공");
          return res;
        })
        .catch(() => {
          alert("답글 등록에 실패했습니다");
        });
      },

}