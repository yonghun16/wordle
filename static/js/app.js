//datamuse api에서 랜덤 단어 추출
const fetchRandomFiveLetterWord = async () => {
  const url = "https://api.datamuse.com/words?sp=?????&max=1000";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch words from Datamuse API");
    }
    const words = await response.json();

    if (words.length > 0) {
      // 단어 목록에서 랜덤으로 하나 선택
      const randomWord = words[Math.floor(Math.random() * words.length)].word;
      return randomWord;
    } else {
      return null; // 5글자 단어가 없을 경우 null 반환
    }
  } catch (error) {
    console.error("Error fetching random word:", error);
    return null; // 에러 발생 시 null 반환
  }
};


// 답변 등록(5글자)
let answer_word = "";
fetchRandomFiveLetterWord().then((word) => {
  answer_word = word.toUpperCase();
  console.log(answer_word)
});

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "font-family: 'Noto Sans KR', Roboto, serif; display:flex; justify-content:center; align-items:center; position:absolute; top:45vh; background-color:white; width:200px; height:100px; box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 5) gameover();
    attempts += 1;
    index = 0;
  };

  // 엔터
  const handleEnterKey = () => {
    let correct_count = 0;      // 맞은 갯수

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const input_char = block.innerText;
      const answer_char = answer_word[i];
      if (input_char === answer_char) {
        correct_count += 1;
        block.style.background = "#6AAA64";
        document.querySelector(`.keyboard-column[data-key='${input_char}']`).style.background = "#6AAA64";
      } else if (answer_word.includes(input_char)) {
        block.style.background = "#C9B458";
        document.querySelector(`.keyboard-column[data-key='${input_char}']`).style.background = "#C9B458";
      }
      else {
        block.style.background = "#787C7E";
        document.querySelector(`.keyboard-column[data-key='${input_char}']`).style.background = "#787C7E";
      }
      block.style.color = "white";
    }

    if (correct_count === 5) gameover();
    else nextLine();
  };

  // 백스페이스
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  // 키 눌렀을 때 이벤트
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(`.board-column[data-index='${attempts}${index}']`);

    if (event.key === "Backspace") {
      handleBackspace();
    }
    else if (event.key === "Enter") {
      if (index === 5) {
        handleEnterKey();
      }
      else return;
    }
    else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  // 마우스 눌렀을 때 이벤트
  const handleMouseClick = (event) => {
    const key = event.target.dataset.key;
    const thisBlock = document.querySelector(`.board-column[data-index='${attempts}${index}']`);
    console.log(key)

    if (key === "BACK") {
      handleBackspace();
    }
    else if (key === "ENTER") {
      if (index === 5) {
        handleEnterKey();
      }
      else return;
    }
    else if ('A' <= key && key <= 'Z') {
      thisBlock.innerText = key;
      index += 1;
    }
  }

  // 타이머
  const startTimer = () => {
    const start_time = new Date();

    function setTime() {
      const cur_time = new Date();
      const flow_time = new Date(cur_time - start_time);
      const min = flow_time.getMinutes().toString().padStart(2, "0");
      const sec = flow_time.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${min}:${sec}`;
    }

    timer = setInterval(setTime, 1000);
  };

  // 이벤트 리스너
  startTimer();
  window.addEventListener("keydown", handleKeydown);
  document.querySelector("footer").addEventListener("click", handleMouseClick);
}

appStart();
