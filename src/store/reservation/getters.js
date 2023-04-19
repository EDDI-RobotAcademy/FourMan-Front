export default{

    formattedAvailableTimes: (state) => {
        console.log("formattedAvailableTimes 작동")
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
    
        const formatDate = (date) => {
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        };
    
        const todayStr = formatDate(now);
        const tomorrowStr = formatDate(tomorrow);
        return state.availableTimes.map((time) => {
            console.log("time",time)
          const [date, hour] = time.split(" ");
          if (date === todayStr) {
            return `Today ${hour}`;
          } else if (date === tomorrowStr) {
            return `Tomorrow ${hour}`;
          }
          return time;
        });
      },
}