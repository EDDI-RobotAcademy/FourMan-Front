import {

   // 상품 관련
   REQUEST_PRODUCT_LIST_TO_SPRING,
   REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING,
   REQUEST_ALL_PRODUCT_TO_SPRING,

   //질문 게시판 관련
   REQUEST_QUESTION_BOARD_LIST_TO_SPRING,
   REQUEST_QUESTION_BOARD_TO_SPRING,


   //댓글 관련
   REQUEST_QUESTION_BOARD_COMMENT_LIST_TO_SPRING,

   //주문 관련
   REQUEST_ORDER_INFORMATIONS_TO_SPRING,

   //게시물 검색 관련
   REQUEST_SEARCH_BOARD_TO_SPRING,

   //공지사항 게시판 관련
   REQUEST_NOTICE_BOARD_LIST_TO_SPRING,
   REQUEST_NOTICE_BOARD_TO_SPRING,

   //나의 게시판 관련
   REQUEST_MY_FREE_BOARD_LIST_TO_SPRING,

   

   //나의 질문게시판 관련
   REQUEST_MY_QUESTION_BOARD_LIST_TO_SPRING,

   //나의 리뷰게시판 관련
   REQUEST_MY_REVIEW_BOARD_LIST_TO_SPRING,
} from './mutation-types'

import axios from 'axios'

export default {


   

   // 상품 관련
   requestCreateProductToSpring ({}, payload) {
      console.log('payload: ' + payload)
      return axios.post('http://localhost:8888/product/register', payload )
          .then((res) => {
              alert('게시물 등록 성공!')
              return res;
          })
          .catch(() => {
              alert('문제 발생!')
          })
   },
   requestProductListToSpring({ commit }) {
      return axios.get('http://localhost:8888/product/list')
      .then((res) => {
         commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data)
         console.log('productList: ' + JSON.stringify(res.data))
      })
   },
   requestProductImageListToSpring({ commit }) {
      return axios.get('http://localhost:8888/product/imageList')
      .then((res) => {
         commit(REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING, res.data)
         console.log('imageList: ' + JSON.stringify(res.data))
         })
   },
   requestAllOfProductToSpring ({ commit }) {
    return axios.get('http://localhost:8888/product/all')
        .then((res) => {
            commit(REQUEST_ALL_PRODUCT_TO_SPRING, res.data)
            console.log("allProduct: " + JSON.stringify(res.data))
        })
   },
   requestEditProductWithoutImageToSpring({}, payload) {
        console.log('payload: ' + payload)
        return axios.post('http://localhost:8888/product/editProductWithoutImage', payload )
            .then(() => {
                alert('게시물 수정 성공!')
            })
            .catch(() => {
                alert('문제 발생!')
            })
   },
   requestEditProductWithImageToSpring({}, payload) {
        console.log('payload: ' + payload)
        return axios.post('http://localhost:8888/product/editProductWithImage', payload )
            .then(() => {
                alert('게시물 수정 성공!')
            })
            .catch(() => {
                alert('문제 발생!')
            })
   },
   requestDeleteProductToSpring({}, productId) {
    return axios.delete(`http://localhost:8888/product/${productId}`)
       .then(() => {
          alert("삭제 성공")
       })
       .catch(() => {
          alert("문제 발생!")
       })
},


   // 질문게시판 관련

    requestQuestionBoardListToSpring ({ commit }) {
        return axios.get('http://localhost:8888/question-board/list')
            .then((res) => {
                commit(REQUEST_QUESTION_BOARD_LIST_TO_SPRING, res.data)
            })
     },

    requestCreateQuestionBoardToSpring({}, payload) {
        const { title, questionType, writer, content, memberId} = payload
        return axios.post('http://localhost:8888/question-board/register',
        { title, questionType, writer, content, memberId})
            .then((res) => {
                alert('게시물 등록 성공')
                return res;
            })
            .catch (() =>{
                alert('게시물 등록에 실패했습니다')
            })
    },
    requestQuestionBoardToSpring({commit}, boardId) {
        return axios.get(`http://localhost:8888/question-board/${boardId}`)
        .then((res) =>{
            commit(REQUEST_QUESTION_BOARD_TO_SPRING, res.data)
        })
    },
    requestQuestionBoardModifyToSpring({}, payload) {
        const { boardId, title, content} = payload
        return axios.put(`http://localhost:8888/question-board/${boardId}`,
        { title, content})
        .then(() => {
            alert('게시물 수정 성공')
        })
        .catch(() => {
            alert('수정 실패')
        })
    },
    requestQuestionBoardDeleteToSpring ({}, boardId) {
        return axios.delete(`http://localhost:8888/question-board/${boardId}`)
            .then(() => {
                alert("삭제 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
    //댓글 관련
    requestQuestionBoardCommentRegisterToSpring( {}, payload) {
        const {comment, boardId, commentWriter,memberId} = payload
        console.log('데이터보내져랏')
        return axios.post('http://localhost:8888/question-board/comment/register',
            {comment, boardId, commentWriter, memberId})
        .then(() =>{
            alert('댓글 등록 완료')
        })
    },

    requestQuestionBoardCommentListToSpring( { commit }, boardId ) {
        console.log('commentList :')
        return axios.get(`http://localhost:8888/question-board/comment/${boardId}`)
            .then((res) => {
                commit(REQUEST_QUESTION_BOARD_COMMENT_LIST_TO_SPRING, res.data)
            })
    },
    requestQuestionBoardCommentDeleteToSpring ({}, commentId) {
        console.log('delete 전송 되냐?')
        return axios.delete(`http://localhost:8888/question-board/comment/${commentId}`)
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
        return axios.put(`http://localhost:8888/question-board/comment/${commentId}`,
        { commentId, comment: commentModify })
            .then(() => {
                alert('수정 성공')
            })
            .catch(() => {
                alert('오류 발생')
            })
        },

    //게시물 검색 관련
    requestSearchBoardToSpring({commit}, searchText) {
        console.log('requestSearchBoardToSpring 작동')
        return axios.get(`http://localhost:8888/question-board/search/${searchText}`)
            .then((res) => {
                commit(REQUEST_SEARCH_BOARD_TO_SPRING, res.data)
                console.log('searchBoard res.data' + res.data)
            })
            .catch(() => {
                alert('검색 실패')
            })
    },

    //주문 관련
    requestOrderInformationsToSpring({}, payload) {
        console.log('payload: ' + payload)
        return axios.post('http://localhost:8888/order/register', payload)
            .then(() => {
                alert("저장 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },

    //공지사항 관련
    requestNoticeBoardRegisterToSpring({}, payload) {
        const { title, notice, writer, content, memberId} = payload
        return axios.post('http://localhost:8888/notice-board/register',
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
        return axios.get('http://localhost:8888/notice-board/list')
        .then((res) => {
            commit(REQUEST_NOTICE_BOARD_LIST_TO_SPRING, res.data)
        })
    },
    requestNoticeBoardToSpring({ commit }, boardId) {
        console.log('requestNoticeBoardToSpring 작동')
        return axios.get(`http://localhost:8888/notice-board/${boardId}`)
        .then((res) =>{
            commit(REQUEST_NOTICE_BOARD_TO_SPRING, res.data)
        })
    },
    requestNoticeBoardModifyToSpring ({}, payload) {
        const { boardId, title, content} = payload
        axios.put(`http://localhost:8888/notice-board/${boardId}`,
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
        return axios.delete(`http://localhost:8888/notice-board/${boardId}`)
            .then(() => {
                alert("삭제 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
    //나의 게시판 관련
    requestMyFreeBoardListToSpring({ commit }, memberId) {
        console.log('requestMyFreeBoardListToSpring 작동')
        return axios.get(`http://localhost:8888/free-board/myPage/${memberId}`)
        .then((res) => {
            commit(REQUEST_MY_FREE_BOARD_LIST_TO_SPRING, res.data)
            console.log('내가 쓴 게시물 res.data' + res.data)
        })
    },

    //나의 질문게시판 관련

    requestMyQuestionBoardListToSpring({ commit }, memberId) {
        console.log('requestMyQuestionBoardListToSpring 작동')
        return axios.get(`http://localhost:8888/question-board/myPage/${memberId}`)
        .then((res) => {
            commit(REQUEST_MY_QUESTION_BOARD_LIST_TO_SPRING, res.data)
            console.log('내가 쓴 게시물 res.data' + res.data)
        })
    },

    //나의 리뷰게시판 관련
    requestMyReviewBoardListToSpring({ commit }, memberId) {
        console.log('requestMyReviewBoardListToSpring 작동')
        return axios.get(`http://localhost:8888/review-board/myPage/${memberId}`)
        .then((res) => {
            commit(REQUEST_MY_REVIEW_BOARD_LIST_TO_SPRING, res.data)
            console.log('내가 쓴 게시물 res.data' + res.data)
        })
    },

    

}