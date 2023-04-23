export default {

    filteredEventLists: (state) => {
        const currentDate = new Date();
        return state.eventLists.filter(event => new Date(event.eventEndDate) >= currentDate);
    },
}

