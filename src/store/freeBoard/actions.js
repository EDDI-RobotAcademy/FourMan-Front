import {
    REQUEST_FREE_BOARD_LIST_TO_SPRING,
    REQUEST_FREE_BOARD_TO_SPRING,

} from './mutation-types'

import axios from 'axios'

export default {
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


}