import {
    REQUEST_FREE_BOARD_LIST_TO_SPRING,
} from './mutation-types'

import axios from 'axios'

export default {
    requestFreeBoardListToSpring ({ commit }) {
        return axios.get('http://localhost:8888/free-board/list')
            .then((res) => {
                commit(REQUEST_FREE_BOARD_LIST_TO_SPRING, res.data)
            })
    },
  
}