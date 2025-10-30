let gamePattern = [];
let userPattern = [];
let level = 0;
let gameStart = false;

$(document).keydown(() => {
    if (!gameStart) {
        nextSequence();
        gameStart = true;
    };
});

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
    $(`#${color}`).css("opacity", 0.5);
    let sound = new Audio(`./sounds/${color}.mp3`);
    sound.play();
    
    setTimeout(() => {
        $(`#${color}`).css("opacity", 1);
    }, 100);
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
            $("h1").html(`GAME OVER<br><br>Press Any Key To Start Again`);
            $("body").css("backgroundColor", "#011F3F");
        }, 300);
    
        reset();
    }
}

let reset = () => {
    level = 1;
    gamePattern = [];
    gameStart = false;
}