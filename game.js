var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var hintString = "";
var hintHide = "";
$(".starter").click(function() {
  if (started === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $(".starter").text("End");
    timer();
  } else {
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Start to Restart");
    startOver();
    started = false;
    $(".starter").text("Start");
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour, "pressed");
  answerCheck(userClickedPattern.length - 1);
});

$(".hint").click(function() {
  $("p").text(hintHide);
  setTimeout(function() {
    $("p").text(hintString);
  }, 2000);
});

function timer(){
  var count = 45;
  var timerInterval = setInterval(function(){
    if (count === 0 || started === false){
      clearInterval(timerInterval);
      var audio = new Audio('sounds/wrong.mp3');
      audio.play();
      $("body").addClass("game-over");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Start to Restart");
      startOver();
      started = false;
      $(".starter").text("Start");
    }else{
      count --;
      $(".rest-time").text(count);
    }
  }, 1000)

}

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
    $("#level-title").text("Game Over, Press Start Button to Restart");
    $(".starter").text("Start");
    startOver()
    started = false;
  }
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var count = 0;
  var gamePatternList = setInterval(playAudioList, 500);

  function playAudioList() {
    if (count === level || started === false) {
      clearInterval(gamePatternList);
    } else {
      animatePress(gamePattern[count], "next");
      playSound(gamePattern[count]);
      count++;
    }
  }
  hintString += "⬜";
  $("p").text(hintString);
  hint(randomChosenColour);
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  hintString = "";
  hintHide = "";
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour, className) {
  $("#" + currentColour).addClass(className);

  setTimeout(function() {
    $("#" + currentColour).removeClass(className);
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
