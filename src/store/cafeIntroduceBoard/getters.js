export default {

    formattedCafeList: (state) => {
        const cafeList = [];

        for (let idx = 0; idx < state.cafeLists.length; idx++) {
            cafeList.push(state.cafeLists[idx].cafeName);
        }
        return cafeList;
    }

}