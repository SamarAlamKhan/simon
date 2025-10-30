const deviceMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let gamePattern = [];
let userPattern = [];
let level = 0;
let gameStart = false;

$(document).ready(() => {

    if (!deviceMobile) {
        $("h1").html("Press Any Key To Start");
    } else {
        $("h1").html("Press 'START' To Play")
    }
})

function condition() {
    if (!deviceMobile) {
        $("h1").html("Press Any Key To Start");
    } else {
        $("h1").html("Press 'START' To Play")
    }
}

$(document).keydown(() => {
    start();
});

$("button").click(() => {
    start();
});

let start = () => {
    if (!gameStart) {
        nextSequence();
        gameStart = true;
    };
}

let nextSequence = () => {
    userPattern = [];
    level++;
    $("h1").html(`Level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = $(".btn").eq(randomNumber).attr("id");
    gamePattern.push(randomColor);
    effect(randomColor);
};

let effect = (color) => {
    $(`#${color}`).css("opacity", 0.1);
    let sound = new Audio(`./sounds/${color}.mp3`);
    sound.play();
    
    setTimeout(() => {
        $(`#${color}`).css("opacity", 1);
    }, 300);
};

$(".btn").click(function() {
    let userColor = $(this).attr("id");
    let col = $(this).index();
    
    userPattern.push(userColor);

    effect(userColor);

    checkAnswer(userPattern.length-1)
});

let checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] == userPattern[currentLevel]) {
        if (gamePattern.length == userPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000)
        }
    } else {
        new Audio("./sounds/wrong.mp3").play();
        $("body").css("backgroundColor", "red");
        setTimeout(() => {

                if (!deviceMobile) {
                    $("h1").html("GAME OVER<br><br>Press Any Key To Play Again");
                } else {
                    $("h1").html("GAME OVER<br><br>Press 'START' To Play Again");
                }

            $("body").css("backgroundColor", "#011F3F");
        }, 300);
    
        reset();
    }
}

let reset = () => {
    level = 0;
    gamePattern = [];
    gameStart = false;
}
