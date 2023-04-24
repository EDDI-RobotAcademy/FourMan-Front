export default {

    formattedCafeList: (state) => {
        const cafeNameList = [];

        for (let idx = 0; idx < state.cafeLists.length; idx++) {
            cafeNameList.push(state.cafeLists[idx].cafeName);
        }
        return cafeNameList;
    }

}