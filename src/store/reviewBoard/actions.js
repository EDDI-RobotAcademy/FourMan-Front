import {
   REQUEST_REVIEW_BOARD_LIST_TO_SPRING,
   REQUEST_REVIEW_BOARD_TO_SPRING,
   REQUEST_REVIEW_BOARD_IMAGE_LIST_TO_SPRING,

} from './mutation-types'

import axiosInst from '@/utility/axiosObject'
import router from '@/router'

export default {
   requestCreateReviewBoardToSpring ({}, formData) {
        return axiosInst.post('/review-board/register',
            formData)
            .then(() => {
                alert('상품 등록 성공!')
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestReviewBoardListToSpring ({ commit }) {
        return axiosInst.get('/review-board/list')
            .then((res) => {
                commit(REQUEST_REVIEW_BOARD_LIST_TO_SPRING, res.data)
            })
    },
    requestReviewBoardToSpring ({ commit }, reviewBoardId) {
        return axiosInst.get(`/review-board/${reviewBoardId}`)
            .then((res) => {
                commit(REQUEST_REVIEW_BOARD_TO_SPRING, res.data)
            })
    },
    requestReviewBoardImageToSpring ({ commit }, reviewBoardId) {
        return axiosInst.get(`/review-board/imageList/${reviewBoardId}`)
            .then((res) => {
                commit(REQUEST_REVIEW_BOARD_IMAGE_LIST_TO_SPRING, res.data)
            })
    },
    requestDeleteReviewBoardToSpring ({}, reviewBoardId) {
        return axiosInst.delete(`/review-board/${reviewBoardId}`)
            .then(() => {
                alert("삭제 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
    requestReviewBoardModifyToSpring ({}, payload) {
        const { reviewBoardId, title, content, rating } = payload

        return axiosInst.put(`/review-board/${reviewBoardId}`,
            { title, content, rating })
            .then(() => {
                alert("수정 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
    async requestCafeListToSpring() {
        const cafeList = []
        return axiosInst.get(`/cafe/list`)
            .then((res) => {
                console.log("res.data : " + res.data[0].cafeName)
                for (let idx = 0; idx < res.data.length; idx++) {
                  cafeList.push(res.data[idx].cafeName)
                }
                return cafeList
            })
            .catch((error) => {
                alert('리뷰를 작성할 카페가 없습니다.')
                router.push({ name: 'ReviewBoardListPage'})
            })
    }
}