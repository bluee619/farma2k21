const option_list = document.querySelector(".option_list");
let currentQuestion;

function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent; //getting user selected option
    let correctAnswer = currentQuestion.goodAnswer; //getting correct answer from array
    
    if(userAnswer == correctAnswer){ //if user selected option is equal to array's correct answer
        answer.classList.add("correct"); //adding green color to correct selected option
        console.log("Correct Answer");
    } else {
        answer.classList.add("incorrect"); //adding red color to correct selected option
        console.log("Wrong Answer");
    }
}

function getQuestion() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "http://bluee619.usermd.net:8081/question", true);
    // httpRequest.open("GET", "http://localhost:8080/question", true);
    httpRequest.onload = function (e) {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          console.log('OK');
        } else {
          console.error(httpRequest.statusText);
          alert("Cos poszlo nie tak");
        }
      }
      const response = JSON.parse(httpRequest.responseText);
      const options = response.allAnswers;
      currentQuestion = response;
      const que_text = document.querySelector(".que_text");
      //creating a new span and div tag for question and option and passing the value using array index
      let que_tag = '<span>'+ response.question +'</span>';
      let option_tag = '<div class="option"><span>'+ options[0] +'</span></div>'
      + '<div class="option"><span>'+ options[1] +'</span></div>'
      + '<div class="option"><span>'+ options[2] +'</span></div>'
      + '<div class="option"><span>'+ options[3] +'</span></div>';
      que_text.innerHTML = que_tag; //adding new span tag inside que_tag
      option_list.innerHTML = option_tag; //adding new div tag inside option_tag
      
      const option = option_list.querySelectorAll(".option");
  
      // set onclick attribute to all available options
      for(i=0; i < option.length; i++){
          option[i].setAttribute("onclick", "optionSelected(this)");
      }

    };
    httpRequest.onerror = function (e) {
      console.error(httpRequest.statusText);
    };
    httpRequest.send(null); 
}