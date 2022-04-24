let selectedSubjectList = [];

const inputUserName = document.querySelector("#username");
const subjects = document.querySelectorAll("ul li");
const pickButton = document.querySelector("#pick");
const resetButton = document.querySelector("#reset");
const result = document.querySelector("#result");
const loggingArea = document.querySelector("#log");

const log = [];
const logTemplate = function (name, subject) {
  this.name = name;
  this.subject = subject;
};
const subjectList = {
  computerArchitecture: "컴퓨터구조",
  network: "네트워크",
  database: "데이터베이스",
  operatingSystem: "운영체제",
  swEngineering: "SW엔지니어링",
  dataStructure: "자료구조",
};

function subjectEventHandler(e) {
  e.preventDefault();

  const input = this.children[0];
  input.checked = input.checked === true ? false : true;

  if (input.checked) {
    selectedSubjectList.push(input.id);
  } else {
    selectedSubjectList = selectedSubjectList.filter(sub => sub !== input.id);
  }
}

function printLog() {
  const content = log.map(l => `<li>${l.name}: ${l.subject}</li>`).join("");

  loggingArea.innerHTML = content;
}

function pickSubject() {
  result.innerHTML = "";
  if (selectedSubjectList.length > 0) {
    const num = Math.floor(Math.random() * 20);
    let i = 0;
    const interval = setInterval(function () {
      let idx = i++ % selectedSubjectList.length;
      result.innerHTML = `${subjectList[selectedSubjectList[idx]]}`;
      if (i === num) {
        const obj = new logTemplate(inputUserName.value, subjectList[selectedSubjectList[idx]]);
        log.push(obj);
        printLog();
        clearInterval(interval);
      }
    }, 100);
  }
}

function resetHandler() {
  selectedSubjectList = [];

  subjects.forEach(item => (item.children[0].checked = false));
  result.innerHTML = "";
  loggingArea.innerHTML = "";
}

for (let i = 0; i < subjects.length; i++) {
  subjects[i].addEventListener("click", subjectEventHandler);
}

pickButton.addEventListener("click", pickSubject);
resetButton.addEventListener("click", resetHandler);
