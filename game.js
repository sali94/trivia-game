class TriviaGame {
  constructor(questions) {
    if (!questions || questions.length === 0) {
      throw new Error("Invalid questions array.");
    }

    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timerCount = 15;
    this.currentGameState = "NOT_STARTED";

    this.cacheDOMElements();
    this.bindEventListeners();
  }

  cacheDOMElements() {
    this.scoreboardElement = document.getElementById("scoreboard");
    this.questionsElement = document.getElementById("questions");
    this.timerElement = document.getElementById("timer");
    this.startButton = document.querySelector(".start-button");
    this.nextButton = document.querySelector(".next-button");
    this.resetButton = document.querySelector(".reset-button");
    this.questionTitle = document.getElementById("question__title");
    this.scoreElement = document.getElementById("score");
    this.gameOverMessage = document.getElementById("game-over-message");
  }

  bindEventListeners() {
    this.startButton.addEventListener("click", () => this.startGame());
    this.nextButton.addEventListener("click", () => this.nextQuestion());
    this.resetButton.addEventListener("click", () => this.resetGame());
  }

  startGame() {
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.currentGameState = "IN_PROGRESS";
    this.renderCurrentQuestion();
    this.startButton.style.display = "none";
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.renderCurrentQuestion();
    } else {
      this.endGame("Congratulations! You've completed the game!");
    }
  }

  renderCurrentQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.questionTitle.textContent = currentQuestion.question;
    this.questionsElement.innerHTML = ""; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
      const questionEl = document.createElement("div");
      const anchorEl = document.createElement("a");
      anchorEl.textContent = option;
      questionEl.appendChild(anchorEl);
      questionEl.addEventListener("click", () => this.handleOptionClick(index));
      this.questionsElement.appendChild(questionEl);
    });
  }

  handleOptionClick(index) {
    const correct = index === this.questions[this.currentQuestionIndex].answer;
    if (correct) {
      this.score++;
    }
    this.updateScoreboard();
    this.highlightOption(index, correct);

    setTimeout(() => {
      correct ? this.nextQuestion() : this.endGame("Game Over! Try again.");
    }, 1500);
  }

  updateScoreboard() {
    this.scoreElement.textContent = this.score;
    this.scoreboardElement.innerHTML = `${this.score} / ${this.questions.length}`;
  }

  highlightOption(index, status) {
    const options = this.questionsElement.querySelectorAll("div");
    const selectedOption = options[index];
    const anchorTag = selectedOption.querySelector("a");
    anchorTag.classList.add(status ? "qcorrect" : "qincorrect");
  }

  endGame(message) {
    this.currentGameState = "LOST"; // Update based on actual game condition
    this.gameOverMessage.textContent = message;
    this.gameOverMessage.style.display = "block";
    this.startButton.style.display = "block";
  }

  resetGame() {
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.currentGameState = "NOT_STARTED";
    this.questionsElement.innerHTML = "";
    this.questionTitle.textContent = "";
    this.scoreElement.textContent = "0";
    this.gameOverMessage.style.display = "none";
    this.startButton.style.display = "block";
  }
}
