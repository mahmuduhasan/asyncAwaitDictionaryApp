const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en";
const form = document.getElementById("word-form");
const phonetic = document.getElementById("phonetic");
const playBtn = document.getElementById("play-button");
let audio = "";
const getWord = async (e) => {
  e.preventDefault();
  const inputWord = e.target.firstElementChild.value;
  if (inputWord === "") {
    alert("Please Enter Proper Word!");
    return;
  }
  const res = await fetch(`${apiUrl}/${inputWord}`);
  const data = await res.json();
  showData(res.status, data);
};

const showData = (status, data) => {
  if (status === 200) {
    playBtn.classList.remove("hide");
    audio = data[0].phonetics[0].audio;
    if (data[0].phonetic === undefined) {
      phonetic.textContent = "Not Found";
    } else {
      phonetic.textContent = data[0].phonetic;
    }
  } else {
    // phonetic.classList.add("hide");
    playBtn.classList.add("hide");
    phonetic.innerText = `${status} : Not Found!`;
  }
};

const playAudio = () => {
  if (audio === "") {
    alert("No audio found!");
    return;
  }
  const playback = new Audio();
  playback.src = audio;
  playback.play();
};
form.addEventListener("submit", getWord);
playBtn.addEventListener("click", playAudio);
