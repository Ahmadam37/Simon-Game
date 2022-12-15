
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
function nextSequence() {

    userClickedPattern = [];

    level = level + 1;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    // loopTheGame();

}

// function loopTheGame() {
//     for (i = 0; i < gamePattern.length; i++) {

//         var randomArray = gamePattern[i];
//         setTimeout(function () {
//             console.log(randomArray);
//             // $("#" + randomArray).fadeIn(100).fadeOut(100).fadeIn(100);
//             // playSound(randomArray);
//         },300)
//     }
// }



// function nextSequence() {

//     //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
//     userClickedPattern = [];

//     level++;
//     $("#level-title").text("Level " + level);

//     var randomNumber = Math.floor(Math.random() * 4);
//     var randomChosenColour = buttonColours[randomNumber];
//     gamePattern.push(randomChosenColour);

//     $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//     playSound(randomChosenColour);
//   }

$(this).keypress(function (event) {

    if (event.key == "A") {
        $("#level-title").text("Level " + level);
    }

});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
});

// function checkAnswer(currentLevel) {

//     var wrong = "wrong";

//  if(userClickedPattern[userClickedPattern.lastIndexOf(currentLevel)] == gamePattern[gamePattern.length -1]){
//      console.log("succsess");
//  }else{
//      console.log("wrong");
//      playsound(wrong);
//      $("body").addClass("game-over");
//      setTimeout(function () {
//          $("body").removeClass("game-over");
//      },200)
//      $("h1").text("Game Over, Press Any Key to Restart");

//      $("*").keypress(function() {
//           level = 0;
//           $("h1").text("Press A Key to Start")
//      });
//  }

// }

function restartGame() {

    gamePattern = [];
    level = 0;
    started = false;
}

function checkAnswer(currentLevel) {


    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        restartGame();
    }

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}