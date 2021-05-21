var handicaps = {
  "Eoin Cotter": 8,
  "Conall Hunt": 30
};

function calculateTotals() {
  var hole1 = Number(document.forms["score-input-1"]["score"].value);
  var hole2 = Number(document.forms["score-input-2"]["score"].value);
  var hole3 = Number(document.forms["score-input-3"]["score"].value);
  var hole4 = Number(document.forms["score-input-4"]["score"].value);
  var hole5 = Number(document.forms["score-input-5"]["score"].value);
  var hole6 = Number(document.forms["score-input-6"]["score"].value);
  var hole7 = Number(document.forms["score-input-7"]["score"].value);
  var hole8 = Number(document.forms["score-input-8"]["score"].value);
  var hole9 = Number(document.forms["score-input-9"]["score"].value);
  var hole10 = Number(document.forms["score-input-10"]["score"].value);
  var hole11 = Number(document.forms["score-input-11"]["score"].value);
  var hole12 = Number(document.forms["score-input-12"]["score"].value);
  var hole13 = Number(document.forms["score-input-13"]["score"].value);
  var hole14 = Number(document.forms["score-input-14"]["score"].value);
  var hole15 = Number(document.forms["score-input-15"]["score"].value);
  var hole16 = Number(document.forms["score-input-16"]["score"].value);
  var hole17 = Number(document.forms["score-input-17"]["score"].value);
  var hole18 = Number(document.forms["score-input-18"]["score"].value);
  var front9Score = hole1 + hole2 + hole3 + hole4 + hole5 + hole6 + hole7 + hole8 + hole9;
  var back9Score = hole10 + hole11 + hole12 + hole13 + hole14 + hole15 + hole16 + hole17 + hole18;
  var totalScore = front9Score + back9Score;
  document.getElementById("front-9-total").innerHTML = `${front9Score}`;
  document.getElementById("back-9-total").innerHTML = `${back9Score}`;
  document.getElementById("18-total").innerHTML = `${totalScore}`;
  document.getElementById("score-submission-button").style.display = "none";
  document.getElementById("score-submission-message").style.display = "block";
}

function processName() {
  var playerName = document.getElementById("names").value;
  var playerHandicap = handicaps[playerName];
  document.getElementById("player-name").innerHTML = `Name: ${playerName}`;
  document.getElementById("player-handicap").innerHTML = `Handicap: ${playerHandicap}`;
  document.getElementById("player-details").style.display = "block";
  document.getElementById("player-name-confirmation").style.display = "none";
  document.getElementById("glenmill-scorecard-entry").style.display = "block";
}

