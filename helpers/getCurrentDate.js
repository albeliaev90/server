const getCurrentDate = (minutes) => {

    // const deadline  = new Date();
    // deadline.setSeconds(deadline.getSeconds() + ((minutes || 1) * 60));
    // console.log('date+1 min', deadline);

    const deadline = new Date(2021, 06, 01);
    let timerId = null;



    const date = new Date();
    console.log('current date', date);
    // console.log("date", date);
    // console.log("mon", date.getMonth());
    const month = date.getMonth() + 1
    const currentDate = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        }.${date.getMonth() < 10 ? "0" + month : month
        }.${date.getFullYear()} ${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
        }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
    // return currentDate


// function countdownTimer(deadline) {
//     const diff = deadline - new Date(); 
//     console.log(diff);
//     if (diff <= 0) {
//         console.log("end");
//         clearInterval(timerId);
//     }

// }
// countdownTimer();
//   // вызываем функцию countdownTimer каждую секунду
//   timerId = setInterval(countdownTimer, 1000);



}
module.exports = getCurrentDate