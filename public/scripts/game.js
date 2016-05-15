$(document).ready(function() {
  var aiChoice;
  var playerChoice
  var resultCode
  var resetTime = 800 // Time until throws reset and you can choose again
  var rock ="<i id=\"ai-rock\" class=\"fa fa-hand-rock-o fa-5x rotate-270-flip ai-hand\" aria-hidden=\"true\"></i>"
  var paper ="<i id=\"ai-paper\" class=\"fa fa-hand-paper-o fa-5x rotate-270-flip ai-hand\" aria-hidden=\"true\"></i>"
  var scissors ="<i id=\"ai-scissors\" class=\"fa fa-hand-scissors-o fa-5x ai-hand \" aria-hidden=\"true\"></i>"
  var playerRock ="<i id=\"input-rock\" class=\"fa fa-hand-rock-o fa-5x fa-rotate-90 player-hand\" aria-hidden=\"true\"></i>"
  var playerPaper ="<i id=\"input-paper\" class=\"fa fa-hand-paper-o fa-5x fa-rotate-90 player-hand\" aria-hidden=\"true\"></i>"
  var playerScissors ="<i id=\"input-scissors\" class=\"fa fa-hand-scissors-o fa-5x rotate-180-flip player-hand\" aria-hidden=\"true\"></i>"
  var winSymbol = "<i class=\"fa fa-check win\" fa-3x aria-hidden=\"true\"></i>"
  var loseSymbol = "<i class=\"fa fa-times lose\" aria-hidden=\"true\"></i>"
  var tieSymbol = "<i class=\"fa fa-repeat tie\" aria-hidden=\"true\"></i>"
  var canThrow = true;
  // var tieSymbol = "<i class=\"fa fa-flash tie\" aria-hidden=\"true\"></i>"
  
  var playerScore = 0
  var aiScore = 0
  var check = "<i class=\"fa fa-check\" fa-3x aria-hidden=\"true\"></i>"
  var star = "<i class=\"fa fa-star\" aria-hidden=\"true\"></i>"
  var diamond = "<i class=\"fa fa-diamond\" aria-hidden=\"true\"></i>"
  var firstOrder = "<i class=\"fa fa-first-order\" aria-hidden=\"true\"></i>"

  function makeAiChoice(){
    aiChoice = Math.floor(Math.random() * 3);
    if (aiChoice==0) {
      $("#ai-choice").html(rock);
    } else if (aiChoice==1) {
      $("#ai-choice").html(paper);
    } else if (aiChoice==2) {
      $("#ai-choice").html(scissors);
    }
  }

  function displayPlayerChoice(){
    if (playerChoice==0) {
      $("#player-choice").html(playerRock);
    } else if (playerChoice==1) {
      $("#player-choice").html(playerPaper);
    } else if (playerChoice==2) {
      $("#player-choice").html(playerScissors);
    }
  }
  
  function doThrows(){
    canThrow = false;
    $("#player-choice").addClass("player-throw");
    $("#player-choice").removeClass("player-return")
    $("#player-choice .fa").removeClass("player-wiggle")
    $("#ai-choice .fa").removeClass("ai-wiggle")
    $("#ai-choice").addClass("ai-throw");
    $("#ai-choice").removeClass("ai-return")
    var throwReset = setTimeout(function(){
      $("#player-choice").removeClass("player-throw")
      $("#player-choice").addClass("player-return")
      $("#ai-choice").removeClass("ai-throw");
      $("#ai-choice").addClass("ai-return")
    }, resetTime);
    var canThrowReset = setTimeout(function(){
      canThrow = true;
      $("#player-choice").html(playerRock);
      $("#ai-choice").html(rock);
      $("#player-choice .fa").addClass("player-wiggle")
      $("#ai-choice .fa").addClass("ai-wiggle")
    }, 1300);
  }

  function determineResult(){
    resultCode=(3+playerChoice - aiChoice) % 3
    if (resultCode==0) {
      $("#player-result").html(tieSymbol)
      $("#ai-result").html(tieSymbol)
    } else if (resultCode==1) {
      $("#player-result").html(winSymbol)
      $("#ai-result").html(loseSymbol)
      playerScore++
    } else if (resultCode==2) {
      $("#player-result").html(loseSymbol)
      $("#ai-result").html(winSymbol)
      aiScore++
    }
    $("#player-score").html(booty(playerScore, true))
    $("#ai-score").html(booty(aiScore, false))
  }
  
  function booty(score, forward) {
    var n100 = groups(score, 100)
    score -= n100*100
    var n25 = groups(score, 25)
    score -= n25*25
    var n5 = groups(score, 5)
    var n1 = score - n5*5
    var syms = [
      firstOrder.repeat(n100),
      diamond.repeat(n25),
      star.repeat(n5),
      check.repeat(n1)
    ]
    if (!forward) {
      syms = syms.reverse()
    }
    return syms
  }
  
  function groups(x, n) {
    return Math.floor((x - (x % n))/n)
  }

  $("#input-rock").click(function(e){
    if(canThrow) {
      playerChoice=0
      displayPlayerChoice()
      makeAiChoice();
      doThrows();
      determineResult();
    }
  });
  $("#input-paper").click(function(){
    if(canThrow) {
      playerChoice=1
      displayPlayerChoice()
      makeAiChoice();
      doThrows();
      determineResult();
    }
  });
  $("#input-scissors").click(function(){
    if(canThrow) {
      playerChoice=2
      displayPlayerChoice()
      makeAiChoice();
      doThrows();
      determineResult();
    }
  });
});
