fetch("http://localhost:3333/student/quizzes")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch quizzes");
    }
  })
  .then((quizzes) => {
    displayQuizzes(quizzes);

  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Failed to fetch quizzes. Please try again later.");
  });

// function displayQuizzes(quizzes) {
//   const quizList = document.getElementById("quiz-list");
//   quizList.innerHTML = ""; // Clear previous list

//   quizzes.forEach((quiz, index) => {
//     const listItem = document.createElement("li");
//     listItem.textContent = `Quiz ${index + 1}: ${quiz.title}`;
//     quizList.appendChild(listItem);
//   });
// }

// Function to handle adding new question fields
let questionCounter = 0;
document
  .getElementById("add-question-btn")
  .addEventListener("click", function () {
    questionCounter++;
    const questionsContainer = document.getElementById("questions-container");
    const newQuestion = document.createElement("div");
    newQuestion.classList.add("question");
    newQuestion.innerHTML = `
    <label for="question${questionCounter}">Question ${questionCounter}:</label>
    <input type="text" id="question${questionCounter}" name="question${questionCounter}" required>
    <input type="text" id="option${questionCounter}_1" name="option${questionCounter}_1" placeholder="Option 1" required>
    <input type="text" id="option${questionCounter}_2" name="option${questionCounter}_2" placeholder="Option 2" required>
    <input type="text" id="option${questionCounter}_3" name="option${questionCounter}_3" placeholder="Option 3" required>
    <input type="text" id="option${questionCounter}_4" name="option${questionCounter}_4" placeholder="Option 4" required>
    <select id="correct-answer${questionCounter}" name="correct-answer${questionCounter}" required>
      <option value="" disabled selected>Select correct answer</option>
    </select>
  `;
    questionsContainer.appendChild(newQuestion);

    // Create option elements
    const select = document.getElementById(`correct-answer${questionCounter}`);
    for (let i = 1; i <= 4; i++) {
      const option = document.createElement("option");
      select.appendChild(option);
    }

    // Update select options when an option input changes
    for (let i = 1; i <= 4; i++) {
      document.getElementById(`option${questionCounter}_${i}`).addEventListener("change", function () {
        select.options[i].text = this.value;
        select.options[i].value = this.value;
      });
    }
  });


// Function to handle form submission for creating quiz
document
  .getElementById("quiz-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Fetch values from the form
    const quizTitle = document.getElementById("quiz-title").value;
    const teacherId = "teacher123"; // Fetch teacher ID

    if (quizTitle.trim() !== "" && teacherId.trim() !== "") {
      // Check both quiz title and teacher ID
      const quizData = {};
      const questions = document.querySelectorAll(".question");

      questions.forEach((question, index) => {
        const questionText = question.querySelector(
          `#question${index + 1}`
        ).value;
        const options = [];
        for (let i = 1; i <= 4; i++) {
          const option = question.querySelector(
            `#option${index + 1}_${i}`
          ).value;
          options.push(option);
        }

        const correctAnswer = question.querySelector(
          `#correct-answer${index + 1}`
        ).value;
        quizData[`question${index + 1}`] = {
          question: questionText,
          options: options,
          correctAnswer: correctAnswer,
        };
      });
      console.log(quizData, 'quizdata')
      // Send quiz data to the backend server
      fetch("http://localhost:3333/teacher/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: quizTitle,
          teacherId: teacherId,
          questions: Object.values(quizData),
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to create quiz");
          }
        })
        .then((data) => {
          alert("Quiz created successfully.");
          // Clear form fields
          document.getElementById("quiz-form").reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        });
    } else {
      alert("Please enter both a quiz title and a teacher ID.");
    }
  });


function displayQuizzes(quizzes) {
  const quizList = document.getElementById("quiz-list");
  quizList.innerHTML = ""; // Clear previous list

  quizzes.forEach((quiz, index) => {
    console.log(quizzes, 'quizzes')
    const listItem = document.createElement("li");
    listItem.textContent = `Quiz ${index + 1}: ${quiz.title}`;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton")
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      fetch(`http://localhost:3333/teacher/quizzes/${quiz._id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to delete quiz");
          }
        })
        .then((data) => {
          alert("Quiz deleted successfully.");
          // Fetch quizzes again to update the list
          location.reload()
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        });
    });

    listItem.appendChild(deleteButton);
    quizList.appendChild(listItem);
  });
}
