// handicap data
var handicaps = {
  "Eoin Cotter": 8,
  "Conall Hunt": 30
};

// course data
var courseData = {
  'Glen Mill' : {'par' : [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3], 'index' : [7, 5, 15, 11, 13, 17, 9, 1, 3, 2, 4, 18, 10, 12, 16, 14, 8, 6]},
  // update lep indices
  'Leopardstown' : {'par' : [3,4,3,4,4,4,4,5,4,4,4,4,3,4,3,4,3,4], 'index' : [7, 5, 15, 11, 13, 17, 9, 1, 3, 2, 4, 18, 10, 12, 16, 14, 8, 6]}
  };

var playerHandicap = 0;  // probably bad practice
var courseName = "placeholder"; // probably bad practice

// when user confirms name and course before score entry
function processName() {
  // process input
  var playerName = document.getElementById("names").value;
  playerHandicap = handicaps[playerName];    // global 
  courseName = document.getElementById("courses").value; // global

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

// when user submits score, calculate front 9, back 9, full 18 totals, display totals on scorecard, 
// hide submission button and display submission message and new submission button
function calculateTotals() {
  var scores = []
  for (i = 1; i < 19; i++) {
    scores[scores.length] = Number(document.forms[`score-input-${i}`]["score"].value);
  }

  var front9Score = scores.slice(0,9).reduce((a, b) => a + b, 0);
  var back9Score = scores.slice(9).reduce((a, b) => a + b, 0);
  var totalScore = front9Score + back9Score;
  
  document.getElementById("score-submission-button").style.display = "none";
  document.getElementById("score-submission-message").style.display = "block";
  document.getElementById("another-score-submission-button").style.display = "block";
  document.getElementById("front-9-total").innerHTML = `${front9Score}`;
  document.getElementById("back-9-total").innerHTML = `${back9Score}`;
  document.getElementById("18-total").innerHTML = `${totalScore}`;

  // display score-displays
  var scoreDisplayRows = document.getElementsByClassName('score-display');
  for (var i = 0; i < scoreDisplayRows.length; i++) {
    scoreDisplayRows[i].style.display = 'inherit';
  }

  // hide score-input
  var scoreInputRows = document.getElementsByClassName('score-input');
  for (var i = 0; i < scoreInputRows.length; i++) {
    scoreInputRows[i].style.display = 'none';
  }
  
  // set inner html of score-displays
  for (i = 0; i < scores.length; i++) {
    document.getElementById(`score-display-${i + 1}`).innerHTML = `${scores[i]}`;
  }

  // calculate points and add to scorecard display
  var pointsList = calculatePoints(scores);
  for (i = 0; i < 18; i++) {
    document.getElementById(`points-${i + 1}`).innerHTML = `${pointsList[i]}`;

  // add totals
  document.getElementById('front-9-points-total').innerHTML = `${pointsList.slice(0,9).reduce((a, b) => a + b, 0)}`;
  document.getElementById('back-9-points-total').innerHTML = `${pointsList.slice(9).reduce((a, b) => a + b, 0)}`;
  document.getElementById('18-points-total').innerHTML = `${pointsList.slice(0).reduce((a, b) => a + b, 0)}`;
  }
}

function calculatePoints(scores) {
  var nettScores = [];
  for (var i = 0; i < 18; i++) {
    if (playerHandicap >= courseData[`${courseName}`]['index'][i] + 36) {
      nettScores[nettScores.length] = scores[i] - 3;
    } else if (playerHandicap >= courseData[`${courseName}`]['index'][i] + 18) {
      nettScores[nettScores.length] = scores[i] - 2;
    } else if (playerHandicap >= courseData[`${courseName}`]['index'][i]) {
      nettScores[nettScores.length] = scores[i] - 1;
    } else {
      nettScores[nettScores.length] = scores[i];  
    }
  }
  
  var points = [];
  for (var i = 0; i < 18; i++) {
    // should use switch statement for this
    if ((nettScores[i] - courseData[`${courseName}`]['par'][i]) == -4) {
      points[points.length] = 6;
    } else if ((nettScores[i] - courseData[`${courseName}`]['par'][i]) == -3) {
        points[points.length] = 5;
    } else if ((nettScores[i] - courseData[`${courseName}`]['par'][i]) == -2) {
        points[points.length] = 4;
    } else if ((nettScores[i] - courseData[`${courseName}`]['par'][i]) == -1) {
        points[points.length] = 3;
    } else if ((nettScores[i] - courseData[`${courseName}`]['par'][i]) == 0) {
        points[points.length] = 2;
    } else if ((nettScores[i] - courseData[`${courseName}`]['par'][i]) == 1) {
        points[points.length] = 1;
    } else {
        points[points.length] = 0;
    }
  }
  return points
}