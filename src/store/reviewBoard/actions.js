import {
   REQUEST_REVIEW_BOARD_LIST_TO_SPRING,
   REQUEST_REVIEW_BOARD_TO_SPRING,
   REQUEST_REVIEW_BOARD_IMAGE_LIST_TO_SPRING,

} from './mutation-types'

import axios from 'axios'

export default {
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
    requestReviewBoardListToSpring ({ commit }) {
        return axios.get('http://localhost:8888/review-board/list')
            .then((res) => {
                commit(REQUEST_REVIEW_BOARD_LIST_TO_SPRING, res.data)
            })
    },
    requestReviewBoardToSpring ({ commit }, reviewBoardId) {
        return axios.get(`http://localhost:8888/review-board/${reviewBoardId}`)
            .then((res) => {
                commit(REQUEST_REVIEW_BOARD_TO_SPRING, res.data)
            })
    },
    requestReviewBoardImageToSpring ({ commit }, reviewBoardId) {
        return axios.get(`http://localhost:8888/review-board/imageList/${reviewBoardId}`)
            .then((res) => {
                commit(REQUEST_REVIEW_BOARD_IMAGE_LIST_TO_SPRING, res.data)
            })
    },
    requestDeleteReviewBoardToSpring ({}, reviewBoardId) {
        return axios.delete(`http://localhost:8888/review-board/${reviewBoardId}`)
            .then(() => {
                alert("삭제 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
    requestReviewBoardModifyToSpring ({}, payload) {
        const { reviewBoardId, title, content, rating } = payload

        return axios.put(`http://localhost:8888/review-board/${reviewBoardId}`,
            { title, content, rating })
            .then(() => {
                alert("수정 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
}