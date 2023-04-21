export default{

    formattedAvailableTimes: (state) => {
        console.log("formattedAvailableTimes 작동");
        const now = new Date();
      
        const formatDate = (date) => {
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        };
      
        const todayStr = formatDate(now);
      
        return state.availableTimes
          .map((time) => {
            // console.log("time", time);
            const [date, hour] = time.split(" ");
            if (date === todayStr) {
              return `Today ${hour}`;
            }
            return null;
          })
          .filter((formattedTime) => formattedTime !== null);
      },
}