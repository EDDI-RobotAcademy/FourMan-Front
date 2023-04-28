import {
    REQUEST_FREE_BOARD_LIST_TO_SPRING,
    REQUEST_FREE_BOARD_TO_SPRING,

    //댓글 관련
    REQUEST_FREE_BOARD_COMMENT_LIST_TO_SPRING,

    //게시물 검색 관련
    REQUEST_SEARCH_FREE_BOARD_LIST_TO_SPRING,

    REQUEST_FREE_BOARD_IMAGE_LIST_TO_SPRING,

    //베스트 게시물 관련
    REQUEST_BEST_FREE_BOARD_LIST_TO_SPRING,
} from './mutation-types'

import axiosInst from '@/utility/axiosObject'
import axios from 'axios'

export default {
   requestCreateFreeBoardToSpring ({ }, formData) {
        const token =JSON.parse(localStorage.getItem('userInfo')).token
        return axiosInst.post('/free-board/register',
        formData
        , {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
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
        let memberId = 0
        if(JSON.parse(localStorage.getItem('userInfo'))) {
            memberId = JSON.parse(localStorage.getItem('userInfo')).id
        }
    return axiosInst.get(`/free-board/${boardId}?memberId=${memberId}`)
        .then((res) => {
            commit(REQUEST_FREE_BOARD_TO_SPRING, res.data)
        })
    },
    requestDeleteFreeBoardToSpring ({}, boardId) {
        const token =JSON.parse(localStorage.getItem('userInfo')).token
        return axiosInst.delete(`/free-board/${boardId}`
            , {
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
    requestFreeBoardModifyToSpring ({}, payload) {
        const { title, content, boardId, writer } = payload
        const token =JSON.parse(localStorage.getItem('userInfo')).token

        return axiosInst.put(`/free-board/${boardId}`,
            { title, content, writer }
            , {
                headers: {
                    'Authorization': `Basic ${token}`
                }
            })
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

        //게시물 검색 관련
        requestSearchFreeBoardListToSpring ({ commit }, searchText) {
            console.log('requestSearchFreeBoardListToSpring 작동')
            return axiosInst.get(`/free-board/search/${searchText}`)
                .then((res) => {
                    commit(REQUEST_SEARCH_FREE_BOARD_LIST_TO_SPRING, res.data)
                    console.log('searchBoard res.data' + res.data)
                })
        },

        //게시판 추천, 비추천
        requestFreeBoardDecRecommendationToSpring({} , {boardId, memberId}) {
            console.log('게시물 비추천 action 작동')
            return axiosInst.post(`/free-board/down-recommendation/${boardId}`,{ boardId, memberId })
            .then(() => {
            })
            .catch(() => {
                alert('error occured')
            })
        },

        requestFreeBoardIncRecommendationToSpring( {} ,{boardId, memberId}) {
            console.log('게시물 추천 action 작동')
            return axiosInst.post(`/free-board/up-recommendation/${boardId}`, {boardId, memberId})
            .then (() => {
            })
            .catch(() => {
                alert('error occured')
            })
        },
        requestFreeBoardImageToSpring ({ commit }, freeBoardId) {
            return axiosInst.get(`/free-board/imageList/${freeBoardId}`)
                .then((res) => {
                    commit(REQUEST_FREE_BOARD_IMAGE_LIST_TO_SPRING, res.data)
                })
        },

        //베스트 게시물 관련
        requestBestFreeBoardListToSpring({commit}) {
            return axiosInst.get('/free-board/best-free-board')
            .then((res) => {
                commit(REQUEST_BEST_FREE_BOARD_LIST_TO_SPRING, res.data)
                console.log('bestFreeBoards 확인:' + JSON.stringify(res.data))
            })
            .catch(() => {
                console.log('Best FreeBoard 출력 실패')
            })
        }

}