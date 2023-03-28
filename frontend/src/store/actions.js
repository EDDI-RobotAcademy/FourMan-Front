import {
    //카페소개 보드 관련
    REQUEST_CAFE_LIST_TO_SPRING,


   // 상품 관련
   REQUEST_PRODUCT_LIST_TO_SPRING,
   REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING,
   REQUEST_PRODUCT_CART_TO_SPRING,
   // 보드 관련
   REQUEST_FREE_BOARD_LIST_TO_SPRING,
   REQUEST_FREE_BOARD_TO_SPRING,

   //질문 게시판 관련
   REQUEST_QUESTION_BOARD_LIST_TO_SPRING,
   REQUEST_QUESTION_BOARD_TO_SPRING,
} from './mutation-types'

import axios from 'axios'

export default {

    //카페소개보드 관련
    requestCafeListToSpring({commit}) {
        console.log("requestCafeListToSpring() 작동")
        return axios.get(`http://localhost:8888/cafe/list`)
            .then((res) => {
                commit(REQUEST_CAFE_LIST_TO_SPRING, res.data)
                console.log("res.data : " + res.data)
            })
            .catch((error) => {
                alert(error)
            })
    },


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
   // 보드 관련
   requestCreateFreeBoardToSpring ({ }, payload) {
      const { title, content, writer, memberId } = payload
      return axios.post('http://localhost:8888/free-board/register',
          { title, content, writer, memberId })
          .then((res) => {
              alert('게시물 등록 성공!')
              return res
          })
          .catch(() => {
              alert('문제 발생!')
          })
   },
   requestFreeBoardListToSpring ({ commit }) {
        return axios.get('http://localhost:8888/free-board/list')
            .then((res) => {
                commit(REQUEST_FREE_BOARD_LIST_TO_SPRING, res.data)
            })
   },
   requestFreeBoardToSpring ({ commit }, boardId) {
    return axios.get(`http://localhost:8888/free-board/${boardId}`)
        .then((res) => {
            commit(REQUEST_FREE_BOARD_TO_SPRING, res.data)
        })
    },
    requestDeleteFreeBoardToSpring ({}, boardId) {
        return axios.delete(`http://localhost:8888/free-board/${boardId}`)
            .then(() => {
                alert("삭제 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
    requestFreeBoardModifyToSpring ({}, payload) {
        const { title, content, boardId, writer } = payload

        return axios.put(`http://localhost:8888/free-board/${boardId}`,
            { title, content, writer })
            .then(() => {
                alert("수정 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },

    // 리뷰게시판 관련
    requestCreateReviewBoardToSpring ({}, formData) {

        return axios.post('http://localhost:8888/review-board/register',
            formData)
            .then(() => {
                alert('상품 등록 성공!')
            })
            .catch(() => {
                alert('문제 발생!')
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
        axios.put(`http://localhost:8888/question-board/${boardId}`,
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
        const {comment, boardId} = payload
        return axios.post('http://localhost:8888/comment/register',
            {comment, boardId})
        .then(() =>{
            alert('댓글 등록 완료')
        })

    }
}