// student.js
let quizzes = [];

fetch("http://localhost:3333/student/quizzes")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch quizzes");
    }
  })
  .then((data) => {
    quizzes = data;
    const quizList = document.getElementById("quiz-list");
    quizzes.forEach((quiz, quizIndex) => {
      const quizDiv = document.createElement("div");
      quizDiv.className = "quiz";
      const titleDiv = document.createElement("div");
      titleDiv.className = "title";
      titleDiv.textContent = `Quiz ${quizIndex + 1}: ${quiz.title}`;
      quizDiv.appendChild(titleDiv);
      quiz.questions.forEach((question, questionIndex) => {
        // Don't render the question if it doesn't have any options
        if (question.options.length > 0) {
          const questionDiv = document.createElement("div");
          questionDiv.className = "question";
          questionDiv.textContent = `Q${questionIndex + 1}: ${question.question}`;
          quizDiv.appendChild(questionDiv);
          question.options.forEach((option, optionIndex) => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = `quiz-${quizIndex}-question-${questionIndex}`;
            optionInput.value = option;
            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;
            quizDiv.appendChild(optionInput);
            quizDiv.appendChild(optionLabel);
            quizDiv.appendChild(document.createElement("br"));
          });
        }
      });
      quizList.appendChild(quizDiv);
    });
    document.getElementById("submit-button").style.display = "block";
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Failed to fetch quizzes. Please try again later.");
  });

document.getElementById("submit-button").addEventListener("click", () => {
  quizzes.forEach((quiz, quizIndex) => {
    quiz.questions.forEach((question, questionIndex) => {
      const selectedOption = document.querySelector(`input[name="quiz-${quizIndex}-question-${questionIndex}"]:checked`);
      const quizDiv = document.getElementsByClassName("quiz")[quizIndex];
      if (selectedOption && selectedOption.value === question.correctAnswer) {
        quizDiv.classList.add("correct");
      } else {
        quizDiv.classList.add("incorrect");
      }
    });
  });
  document.getElementById("submit-button").style.display = "none";
  document.getElementById("retry-button").style.display = "block";
});

document.getElementById("retry-button").addEventListener("click", () => {
  document.querySelectorAll(".quiz").forEach((quizDiv) => {
    quizDiv.classList.remove("correct");
    quizDiv.classList.remove("incorrect");
  });
  document.getElementById("submit-button").style.display = "block";
  document.getElementById("retry-button").style.display = "none";
});
