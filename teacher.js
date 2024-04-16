// document.getElementById("add-question-btn").addEventListener("click", function () {
//   const questionContainer = document.getElementById("questions-container");
//   const questionCount = questionContainer.childElementCount + 1;

//   const questionDiv = document.createElement("div");
//   questionDiv.className = "question";

//   const questionLabel = document.createElement("label");
//   questionLabel.textContent = `Question ${questionCount}:`;
//   questionDiv.appendChild(questionLabel);

//   const questionInput = document.createElement("input");
//   questionInput.type = "text";
//   questionInput.id = `question${questionCount}`;
//   questionInput.required = true;
//   questionDiv.appendChild(questionInput);

//   for (let i = 1; i <= 4; i++) {
//     const optionLabel = document.createElement("label");
//     optionLabel.textContent = `Option ${i}:`;
//     questionDiv.appendChild(optionLabel);

//     const optionInput = document.createElement("input");
//     optionInput.type = "text";
//     optionInput.id = `option${questionCount}_${i}`;
//     optionInput.required = true;
//     questionDiv.appendChild(optionInput);
//   }

// });

// document
//   .getElementById("quiz-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     const quizTitle = document.getElementById("quiz-title").value;
//     const teacherId = "teacher123"; // Default teacher ID
//     const quizData = {
//       title: quizTitle,
//       teacherId: teacherId,
//       questions: [],
//     };
//     const questions = document.querySelectorAll(".question");
//     questions.forEach((question, index) => {
//       const questionText = question.querySelector(
//         `#question${index + 1}`
//       )?.value;
//       const options = [];
//       for (let i = 1; i <= 4; i++) {
//         const option = question.querySelector(`#option${index + 1}_${i}`).value;
//         options.push(option);
//       }
//       const correctAnswer = question.querySelector(
//         `#correct-answer${index + 1}`
//       ).value;
//       quizData.questions.push({
//         question: questionText,
//         options: options,
//         correctAnswer: correctAnswer,
//       });
//     });
//     console.log(quizData, 'quu')
//     fetch("http://localhost:3333/teacher/quizzes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(quizData),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error("Failed to create quiz");
//         }
//       })
//       .then((data) => {
//         alert("Quiz created successfully.");
//         document.getElementById("quiz-form").reset();
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         alert("An error occurred. Please try again later.");
//       });
//   });
