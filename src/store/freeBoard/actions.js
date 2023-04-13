import {
    REQUEST_FREE_BOARD_LIST_TO_SPRING,
    REQUEST_FREE_BOARD_TO_SPRING,

    //댓글 관련
    REQUEST_FREE_BOARD_COMMENT_LIST_TO_SPRING

} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {
   requestCreateFreeBoardToSpring ({ }, payload) {
        const { title, content, writer, memberId } = payload
        return axiosInst.post('/free-board/register',
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
        return axiosInst.get('/free-board/list')
            .then((res) => {
                commit(REQUEST_FREE_BOARD_LIST_TO_SPRING, res.data)
            })
    },
    requestFreeBoardToSpring ({ commit }, boardId) {
    return axiosInst.get(`/free-board/${boardId}`)
        .then((res) => {
            commit(REQUEST_FREE_BOARD_TO_SPRING, res.data)
        })
    },
    requestDeleteFreeBoardToSpring ({}, boardId) {
        return axiosInst.delete(`/free-board/${boardId}`)
            .then(() => {
                alert("삭제 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
    requestFreeBoardModifyToSpring ({}, payload) {
        const { title, content, boardId, writer } = payload

        return axiosInst.put(`/free-board/${boardId}`,
            { title, content, writer })
            .then(() => {
                alert("수정 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },

       //댓글 관련
       requestFreeBoardCommentRegisterToSpring( {}, payload) {
        const {comment, boardId, commentWriter,memberId} = payload
        console.log('데이터보내져랏')
        return axiosInst.post('/free-board/comment/register',
            {comment, boardId, commentWriter, memberId})
        .then(() =>{
            alert('댓글 등록 완료')
        })
    },
        requestFreeBoardCommentListToSpring( { commit }, boardId ) {
            console.log('commentList :')
            return axiosInst.get(`/free-board/comment/list/${boardId}`)
                .then((res) => {
                    commit(REQUEST_FREE_BOARD_COMMENT_LIST_TO_SPRING, res.data)
                })
    },
        requestFreeBoardCommentModifyToSpring(_, payload) {
            console.log('comment Modify 전송')
            const { commentId, commentModify } = payload
            return axiosInst.put(`/free-board/comment/modify/${commentId}`,
            { commentId, comment: commentModify })
                .then(() => {
                    alert('수정 성공')
                })
                .catch(() => {
                    alert('오류 발생')
                })
        },
        requestFreeBoardCommentDeleteToSpring ({}, commentId) {
            console.log('delete 전송 되냐?')
            return axiosInst.delete(`/free-board/comment/delete/${commentId}`)
                .then(() => {
                    alert("삭제 성공")
                })
                .catch(() => {
                    alert("문제 발생!")
                })
        },

}