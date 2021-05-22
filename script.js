var handicaps = {
  "Eoin Cotter": 8,
  "Conall Hunt": 30
};

var courseData = {
  'Glen Mill' : {'par' : [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3], 'index' : [7, 5, 15, 11, 13, 17, 9, 1, 3, 2, 4, 18, 10, 12, 16, 14, 8, 6]},
  // update lep indices
  'Leopardstown' : {'par' : [3,4,3,4,4,4,4,5,4,4,4,4,3,4,3,4,3,4], 'index' : [7, 5, 15, 11, 13, 17, 9, 1, 3, 2, 4, 18, 10, 12, 16, 14, 8, 6]}
  };

function calculateTotals() {
  var scores = []
  for (i = 1; i < 19; i++) {
    scores[scores.length] = Number(document.forms[`score-input-${i}`]["score"].value);
  }

  var front9Score = scores.slice(0,9).reduce((a, b) => a + b, 0);
  var back9Score = scores.slice(9).reduce((a, b) => a + b, 0);
  var totalScore = front9Score + back9Score;

  document.getElementById("front-9-total").innerHTML = `${front9Score}`;
  document.getElementById("back-9-total").innerHTML = `${back9Score}`;
  document.getElementById("18-total").innerHTML = `${totalScore}`;
  document.getElementById("score-submission-button").style.display = "none";
  document.getElementById("score-submission-message").style.display = "block";
}

function processName() {
  // process input
  var playerName = document.getElementById("names").value;
  var playerHandicap = handicaps[playerName];
  var courseName = document.getElementById("courses").value;

  // update detais
  document.getElementById("player-name").innerHTML = `Name: ${playerName}`;
  document.getElementById("player-handicap").innerHTML = `Handicap: ${playerHandicap}`;
  document.getElementById("course-name").innerHTML = `Course: ${courseName}`;

  // change display
  document.getElementById("player-details").style.display = "block";
  document.getElementById("player-name-confirmation").style.display = "none";
  document.getElementById("scorecard-entry").style.display = "block";

  // course details for scorecard display
  for (i = 0; i < 18; i++) {
    document.getElementById(`par-${i + 1}`).innerHTML = `${courseData[`${courseName}`]['par'][i]}`;
    document.getElementById(`index-${i + 1}`).innerHTML = `${courseData[`${courseName}`]['index'][i]}`;
  }

  // add totals
  document.getElementById('front-9-par').innerHTML = `${courseData[`${courseName}`]['par'].slice(0,9).reduce((a, b) => a + b, 0)}`;
  document.getElementById('back-9-par').innerHTML = `${courseData[`${courseName}`]['par'].slice(9).reduce((a, b) => a + b, 0)}`;
  document.getElementById('total-par').innerHTML = `${courseData[`${courseName}`]['par'].slice(0).reduce((a, b) => a + b, 0)}`;
}

