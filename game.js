var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var hintString = "";
var hintHide = "";
$(document).keypress(function() {
  if (started === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  answerCheck(userClickedPattern.length - 1);
});

$(".hint").click(function() {
  $("p").text(hintHide);
  setTimeout(function() {
    $("p").text(hintString);
  }, 2000);
});


function answerCheck(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver()
  }
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  hintString += "⬜";
  $("p").text(hintString);
  hint(randomChosenColour);
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
  hintString = "";
  hintHide = "";
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function hint(hidenColour) {
  switch (hidenColour) {
    case "green":
      hintHide += "🟢";
      break;

    case "yellow":
      hintHide += "🟡";
      break;

    case "red":
      hintHide += "🔴";
      break;

    case "blue":
      hintHide += "🔵";
      break;

    default:
      console.log("⬜");

  }
}
