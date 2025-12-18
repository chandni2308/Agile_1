
// -----------------------------
// Quiz App - script.js
// -----------------------------

const quizData = [
    {
      question: "Which command initializes a new Git repository?",
      a: "git start",
      b: "git init",
      c: "git create",
      d: "git new",
      correct: "b",
    },
    {
      question: "Which command stages all changed files?",
      a: "git stage *",
      b: "git add .",
      c: "git commit -a",
      d: "git push",
      correct: "b",
    },
    {
      question: "Which command shows the working tree status?",
      a: "git state",
      b: "git status",
      c: "git show",
      d: "git diff",
      correct: "b",
    },
    {
      question: "Which command creates a new branch named 'feature'?",
      a: "git branch feature",
      b: "git checkout feature",
      c: "git switch -c feature",
      d: "git clone feature",
      correct: "a",
    },
    {
      question: "Which command sets the remote URL named 'origin'?",
      a: "git link origin <url>",
      b: "git remote add origin <url>",
      c: "git remote set-url origin <url>",
      d: "git connect origin <url>",
      correct: "b",
    },
    {
      question: "Which command pulls latest changes and merges into current branch?",
      a: "git fetch",
      b: "git pull",
      c: "git merge origin",
      d: "git rebase",
      correct: "b",
    },
    {
      question: "Which command shows commit history?",
      a: "git history",
      b: "git commits",
      c: "git log",
      d: "git list",
      correct: "c",
    },
  ];
  
  const questionEl = document.getElementById("question");
  const a_text = document.getElementById("a_text");
  const b_text = document.getElementById("b_text");
  const c_text = document.getElementById("c_text");
  const d_text = document.getElementById("d_text");
  
  const submitBtn = document.getElementById("submit");
  const answers = document.querySelectorAll('input[name="answer"]');
  const container = document.querySelector(".quiz-container");
  
  let currentQuiz = 0;
  let score = 0;
  
  // Keyboard navigation
  function enableKeyboard() {
    let index = 0;
    const radios = Array.from(answers);
  
    function focusRadio(i) {
      radios[i].focus();
    }
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        index = (index + 1) % radios.length;
        focusRadio(index);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        index = (index - 1 + radios.length) % radios.length;
        focusRadio(index);
      } else if (e.key === "Enter") {
        const selected = getSelected();
        if (selected) submitBtn.click();
      }
    });
  }
  
  function loadQuiz() {
    deselectAnswers();
    resetOptionStates();
  
    const q = quizData[currentQuiz];
    questionEl.textContent = q.question;
    a_text.textContent = q.a;
    b_text.textContent = q.b;
    c_text.textContent = q.c;
    d_text.textContent = q.d;
  
    submitBtn.disabled = true;
    submitBtn.textContent = currentQuiz < quizData.length - 1 ? "Next" : "Finish";
  }
  
  function getSelected() {
    let answer = null;
    answers.forEach((ans) => {
      if (ans.checked) answer = ans.id;
    });
    return answer;
  }
  
  function deselectAnswers() {
    answers.forEach((ans) => (ans.checked = false));
  }
  
  function resetOptionStates() {
    ["a_text", "b_text", "c_text", "d_text"].forEach((id) => {
      const el = document.getElementById(id);
      el.classList.remove("correct");
      el.classList.remove("incorrect");
    });
  }
  
  answers.forEach((ans) => {
    ans.addEventListener("change", () => {
      submitBtn.disabled = false;
    });
  });
  
  submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (!answer) return;
  
    const isCorrect = answer === quizData[currentQuiz].correct;
    if (isCorrect) score++;
  
    const correctId = quizData[currentQuiz].correct + "_text";
    const chosenId = answer + "_text";
  
    document.getElementById(correctId).classList.add("correct");
    if (chosenId !== correctId) {
      document.getElementById(chosenId).classList.add("incorrect");
    }
  
    setTimeout(() => {
      currentQuiz++;
      if (currentQuiz < quizData.length) {
        loadQuiz();
      } else {
        showResults();
      }
    }, 500);
  });
  
  function showResults() {
    const total = quizData.length;
    const percent = Math.round((score / total) * 100);
  
    container.innerHTML = `
      <div class="result">
        <h2>Your Score</h2>
        <p><strong>${score}</strong> / ${total} (${percent}%)</p>
        <progress value="${score}" max="${total}" aria-label="Score"></progress>
        <div class="actions">
          <button id="restart">Restart</button>
        </div>
      </div>
    `;
  
    const restartBtn = document.getElementById("restart");
    restartBtn.addEventListener("click", () => {
      currentQuiz = 0;
      score = 0;
  
      container.innerHTML = `
          <h2 id="question">Question</h2>
  
          <ul>
            <li>
              <input type="radio" name="answer" id="a">
              <label for="a" id="a_text">Option A</label>
            </li>
          </ul>
  
          <ul>
            <li>
              <input type="radio" name="answer" id="b">
              <label for="b" id="b_text">Option B</label>
            </li>
          </ul>
  
          <ul>
            <li>
              <input type="radio" name="answer" id="c">
              <label for="c" id="c_text">Option C</label>
            </li>
          </ul>
  
          <ul>
            <li>
              <input type="radio" name="answer" id="d">
              <label for="d" id="d_text">Option D</label>
            </li>
          </ul>
  
          <button id="submit">Next</button>
      `;
  
      rebindElements();
      loadQuiz();
    });
  }
  
  function rebindElements() {
    window.questionEl = document.getElementById("question");
    window.a_text = document.getElementById("a_text");
    window.b_text = document.getElementById("b_text");
    window.c_text = document.getElementById("c_text");
    window.d_text = document.getElementById("d_text");
    window.submitBtn = document.getElementById("submit");
    window.answers = document.querySelectorAll('input[name="answer"]');
  
    answers.forEach((ans) => {
      ans.addEventListener("change", () => {
        submitBtn.disabled = false;
      });
    });
  
    submitBtn.addEventListener("click", () => {
      const answer = getSelected();
      if (!answer) return;
  
      const isCorrect = answer === quizData[currentQuiz].correct;
      if (isCorrect) score++;
  
      const correctId = quizData[currentQuiz].correct + "_text";
      const chosenId = answer + "_text";
  
      document.getElementById(correctId).classList.add("correct");
      if (chosenId !== correctId) {
        document.getElementById(chosenId).classList.add("incorrect");
      }
  
      setTimeout(() => {
        currentQuiz++;
        if (currentQuiz < quizData.length) {
          loadQuiz();
        } else {
          showResults();
        }
      }, 500);
    });
  }
  
  
  enableKeyboard();
  