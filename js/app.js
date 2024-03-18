const inputTime = document.getElementById("input-time");
const countdownEl = document.getElementById("countdown");

document.getElementById("start-timer").addEventListener("click", () => {
  startTimer(inputTime.value);
});

document.getElementById("reset-timer").addEventListener("click", () => {
  resetTimer();
});

let intervalId;
function startTimer(duration) {
  clearInterval(intervalId);

  if (!duration) {
    countdownEl.textContent = "00:00";
    return;
  }

  let timeParts = duration.split(":").map(Number);
  let time_in = new Date();
  time_in.setHours(timeParts[0]);
  time_in.setMinutes(timeParts[1]);
  time_in.setSeconds(timeParts[2] || 0);

  let currentTime = new Date();
  let timeLeft = time_in.getTime() - currentTime.getTime();

  // countdown
  intervalId = setInterval(() => {
    timeLeft -= 1000;

    let hours = Math.floor(timeLeft / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let countdownStr = "";
    if (hours > 0) {
      countdownStr += `${hours}:`;
    }
    countdownStr += `${minutes}:${seconds}`;
    countdownEl.textContent = countdownStr;

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      countdownEl.textContent = "Done";
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(intervalId);
  inputTime.value = "";
  countdownEl.textContent = "00:00";
}
