var
    char,//выбор персонажа
    nameP,//никнейм пользователя
    time = {
        enter: 600,
        show: 400,
        fade: 400,
        modal: 1000,
    },
    $elem = [
        'logo-anime',
        'choice-anime',
        'choice-text-anime',
        'info-anime'
    ],
    video = {
        show: false
    },
    leftPressed = false,
    rightPressed = false,
    jumpPressed = true,
    downPressed = false,

    jumpCount = 0,
    jumpLength = 50,
    jumpHeight = 0,
    playerHeight = 70,
    playerWidth = 70,

    moveInFrame = 400,
    speedMoveChar = 4,

    paddleX = (moveInFrame - playerWidth) / 2,
    rightSlider = false,
    leftSlider = false,
    distanceCharY = 550,

    change = false,
    changeID = null,
    countHp = 100,
    countCaterp = 0,
    countTimes = 0,
    distationToFinish = 0,
    timer_game = [],
    pause = false,
    cordHyena = 1,
    moveHyena = true,
    PlayerAnimate = false,
    checkCaterpiTransform = false,
    returnGame = false;

//сброс настроек
function varNull() {
    $('.new-land').css({display: 'none'})
    moveInFrame = 400;

    paddleX = (moveInFrame - playerWidth) / 2;
    distanceCharY = 550;

    change = false;
    changeID = null;
    countHp = 100;
    countCaterp = 0;
    countTimes = 0;
    distationToFinish = 0;
    timer_game = [];
    pause = false;

    cordHyena = 1;
    moveHyena = true;
    PlayerAnimate = false;

    $('.hyena').empty()
    $('.caterpi').empty()
    $('.land').empty()


}

//начало игры
function startGame() {
    $('.video-player').trigger('pause');//остановка видео
    $('.start-media').css('display', 'none');//сскрываем ролик
    $(".game").css("display", "flex");//подымаем экран игры - эффект
    $('.name-info').text(name);//отображаем
    //////////ункции игры
    pad();//управление
    generate_land();//появление платформ
    drawAnime()
    //данные будут стираться при паузе
    setTimers();//запуск таймеров

}
//сброс настроек
function varNull() {
    if (!returnGame) return;
    returnGame = !returnGame;
    for (let i = 0; i < timer_game.length; i++) {
        clearInterval(timer_game[i]);
    }
    $('.new-land').css({display: 'none'});
    $('.game-slider').css('left', '');
    $('.hyena').empty();
    $('.caterpi').empty();
    $('.land').empty();
    moveInFrame = 400;
    paddleX = (moveInFrame - playerWidth) / 2;
    distanceCharY = 550;
    change = false;
    changeID = null;
    countHp = 100;
    countCaterp = 0;
    countTimes = 0;
    distationToFinish = 0;
    timer_game = [];
    cordHyena = 1;
    moveHyena = true;
    PlayerAnimate = false;
    pause = false;
    generate_land();
    drawAnime()
}

//таймеры игровых действий
function setTimers() {
    timer_game[0] = setInterval(function () {
        countHp -= 0.01;
        countTimes += 0.01;
        draw();
    }, 10);
    timer_game[1] = setInterval(function () {
        if (!checkCaterpiTransform) {
            $(".caterpi-frame").css({
                transform: "scale(1.2, 1.2)",
                bottom: '+=4px'
            });
            checkCaterpiTransform = true;
        } else {
            $(".caterpi-frame").css({
                transform: "scale(1,1)",
                bottom: '-=4px'
            });
            checkCaterpiTransform = false;
        }
    }, 1000);
}

//управление
function pad() {
    document.addEventListener("keydown", (e) => {
        if (e.keyCode == 39) {
            rightPressed = true;
            $(".plr").css("transform", "scaleX(1)");//отзеркаливание картинок
        }
        if (e.keyCode == 37) {
            leftPressed = true;
            $(".plr").css("transform", "scaleX(-1)");//отзеркаливание картинок
        }

        if (e.keyCode == 38) {
            if (downPressed) {
                downPressed = false;
                $('.new-land').css('display', 'none')
                return;
            }
            jumpPressed = true;
        }
        if (e.keyCode == 40 && Math.floor($('.player').position().top) == 480) {
            downPressed = true;
            digIn();
        }
        if (e.keyCode == 27) {
            pause = !pause;
            if (pause) {
                for (let i = 0; i < timer_game.length; i++) {
                    clearInterval(timer_game[i]);
                }
                $('.game-field').animate({
                    width: '0',
                    height: '0'
                }, {
                    duration: 1000
                });
                $('.pause').animate({
                    width: '100px',
                    height: '100px',
                }, {
                    duration: 1000,
                    start: function () {
                        $('.pause').css({
                            display: 'flex'
                        })
                    }
                })
            } else {
                $('.pause').animate({
                    width: '0',
                    height: '0',
                }, {
                    duration: 1000,
                    complete: function () {
                        $('.pause').css({
                            display: 'none'
                        })
                    }
                });
                $('.game-field').animate({
                    width: '800px',
                    height: '600px'
                }, {
                    duration: 1000
                });
                setTimers()
            }
        }
        drawAnime()
    }, false);
    document.addEventListener("keyup", (e) => {
        if (e.keyCode == 39) {
            rightPressed = false;
        }
        if (e.keyCode == 37) {
            leftPressed = false;
        }
        drawAnime()
    }, false);
}


function viewChar(action) {
    switch (action) {
        case "stay":
            if(char=="timon") $(".plr").attr('src', 'image/TimonStay.gif');
            if(char=="pumba") {
                $(".player").css("width","80px");
                $(".plr").attr('src', 'image/PumbaStay.gif');
            }
            break;
        case "run":
            if(char=="timon") $(".plr").attr('src', 'image/TimonRun.gif');
            if(char=="pumba") {
                $(".player").css("width","80px");
                $(".plr").attr('src', 'image/PumbaRun.gif');
            }
            break;
        case "jump":
            if(char=="timon") $(".plr").attr('src', 'image/TimonJump.gif');
            if(char=="pumba") {
                $(".player").css("width","80px");
                $(".plr").attr('src', 'image/PumbaJump.gif');
            }
            break;
    }
}


//замена гифок
function drawAnime() {
    if ((rightPressed || leftPressed) && !jumpPressed && !downPressed) {
        viewChar("run");
    }
    if (jumpPressed) {
        viewChar("jump");
    }
    if (!rightPressed && !leftPressed && !jumpPressed && !downPressed) {
        viewChar("stay");
    }
}

//случайное число
function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

//движение фона влево
function leftmoveBaseFrame(bool) {
    if (bool) return;
    $(".game-slider").animate({
        left: "+=" + speedMoveChar * 1.5 + "px"
    }, {
        duration: 10,
        start: function () {
            leftSlider = true;
        },
        complete: function () {
            leftSlider = false;
        }
    })
}

//движение офона вправо
function rightmoveBaseFrame(bool) {
    if (bool) return
    $(".game-slider").animate({
        left: "-=" + speedMoveChar * 1.5 + "px"
    }, {
        duration: 10,
        start: function () {
            rightSlider = true;
        },
        complete: function () {
            rightSlider = false;
        }
    })
}

//движение гиены в клетке
function moveHyenaInRoom() {
    let hyena = $('.nps-hyena');
    if (hyena.position().left <= 0) {
        moveHyena = true;
        hyena.css('transform', 'scale(1,1)');
    } else if (hyena.position().left >= 500) {
        moveHyena = false;
        hyena.css('transform', 'scale(-1,1)');
    }
    moveHyena ? cordHyena += speedMoveChar / 2 : cordHyena -= speedMoveChar / 2;
    hyena.css('left', cordHyena + 'px');
}

//уход под землю
function digIn() {
    $('.new-land').css({
        display: 'block',
        left: $('.player').position().left + $('.player').width() / 2 - $('.new-land').width() / 2 + 'px',
        top: $('.player').position().top + 'px'
    })
}

//отрисовка сцены
function draw() {
    if (pause) {
        return
    }
    let
        land = $('.land-frame'),
        player = $(".player");
    if (countHp <= 0) {
        for (let i = 0; i < timer_game.length; i++) {
            clearInterval(timer_game[i]);
        }
        $('.plr').attr('src', 'image/die.gif')
        player.animate({
            top: '-=540px'
        }, {
            duration: 2000,
            complete: function () {
                endGame();//конец игры при смерти
            }
        })

    }
    downPressed ? player.hide() : player.show();
    if (rightPressed && paddleX < 450 && !downPressed) {
        paddleX += speedMoveChar;
    } else if (leftPressed && paddleX > 100 && !downPressed) {
        paddleX -= speedMoveChar;
    }
    if (rightPressed) {
        leftSlider = false;
    }
    if (leftPressed) {
        rightSlider = false;
    }
    if (player.position().left >= 450 && rightPressed && $('.game-slider').position().left > -5260 && !downPressed) {
        rightmoveBaseFrame(rightSlider)
    }
    if (player.position().left <= 100 && leftPressed && $('.game-slider').position().left < 0 && !downPressed) {
        leftmoveBaseFrame(leftSlider)
    }
    let up = false;
    let move = false;


    //////////////////////
    for (let i = 0; i < land.length; i++) {
        if (i != changeID && change) {
            continue;
        }
        let l = $("#land" + i);
        if (player.offset().left + player.width() >= l.offset().left && player.offset().left <= l.offset().left + l.width()) {
            move = true;

        }
        if (player.position().top + player.height() < l.position().top && player.position().top + player.height() < l.position().top) {
            up = true;
        }
        if (up && move && !change) {
            if ($('.caterpi-frame').is('#caterpi' + i)) {


                let c = $('.player');
                let top = c.offset().top;
                let left = c.offset().left - 200;
                let backLeft = (left < 600) ? -25 : 250;


                $('#caterpi' + i).remove();

                console.log(top, left)

                $(".caterpi").append($("<img src='image/caterpillar.png'>").css({
                    width: "60px",
                    position: "relative",
                    top: top - 100 + "px",//200 px в разнице между расположением
                    left: left + "px"
                }).animate({
                    top: "-=" + top + "px",
                    left: "-=" + backLeft + "px",
                    width: "-=100px"
                }, {
                    duration: 1000,
                    complete: () => {
                        countCaterp += 1;
                    }
                }));


                countHp += 5;
            }
            changeID = i;
            jumpCount = 0;
            jumpHeight = 0;
            jumpPressed = false;
            change = true;
            distanceCharY = l.position().top + player.height() / 2;
            drawAnime()
        } else if (change && !move && !jumpPressed) {
            changeID = null;
            change = false;
            player.animate({
                top: '' + 550 - player.height() + 'px'
            }, {
                duration: 550 - l.position().top,
                complete: function () {
                    distanceCharY = 550;
                }
            })
        }
    }

    for (let i = 0; i < $('.nps-hyena').length; i++) {
        if (change || PlayerAnimate) {
            continue
        }

        if (!$('.nps-hyena').is("#nps-hyena" + i)) {
            continue
        }

        let hyena = $(".nps-hyena#nps-hyena" + i);

        let
            posHyena = hyena.offset().left,
            posPlayer = player.offset().left;

        if (posPlayer + player.width() >= posHyena && posPlayer <= posHyena + hyena.width() && Math.floor(player.position().top) == 480) {
            let top, left, animation = function () {
                $('.game-field').animate({
                    top: '-=10px',
                }, {
                    duration: 20,
                    start: function () {
                        $('.img-background').css({display: 'none'});
                        $('.game-field').animate({
                            top: '+=5px',
                        }, {
                            duration: 10
                        })
                    },
                    complete: function () {
                        $('.img-background').css({display: 'block'});
                        $('.game-field').animate({
                            top: '+=5px'
                        }, {
                            duration: 10
                        })
                    }
                })
            };

            if (moveHyena) {
                player.animate({
                    top: '-=50px',
                    left: '+=100px'
                }, {
                    duration: 100,
                    start: function () {
                        PlayerAnimate = true;
                        animation();
                    },
                    complete: function () {
                        player.animate({
                            top: '+=50px',
                            left: '+=100px'
                        }, {
                            duration: 100,
                            complete: function () {
                                paddleX += 200;
                                countHp -= 30;
                                PlayerAnimate = false;
                            }
                        })
                    }
                })
            } else {
                player.animate({
                    top: '-=50px',
                    left: '-=100px'
                }, {
                    duration: 100,
                    start: function () {
                        PlayerAnimate = true;
                        animation();
                    },
                    complete: function () {
                        player.animate({
                            top: '+=50px',
                            left: '-=100px'
                        }, {
                            duration: 100,
                            complete: function () {
                                paddleX -= 200;
                                countHp -= 30;
                                PlayerAnimate = false;
                            }
                        })
                    }
                })
            }
        }
    }

    if (jumpPressed) {
        jumpCount++;
        jumpHeight = 4 * jumpLength * Math.sin(Math.PI * jumpCount / jumpLength);
    }

    if (jumpCount > jumpLength) {
        jumpCount = 0;
        jumpPressed = false;
        jumpHeight = 0;
        drawAnime()
    }


    $(".player").css({
        left: paddleX + "px",
        top: distanceCharY - playerHeight - jumpHeight + "px"
    });

    if (!downPressed) distationToFinish = 5505 + Math.floor($('.game-slider').position().left - $('.player').position().left);
    $('.hp-info').text(countHp);
    $('.caterp-info').text(countCaterp);
    $('.time-info').text(
        function () {
            function num(val) {
                val = Math.floor(val);
                return val < 10 ? '0' + val : val;
            };
            var
                sec = Math.floor(countTimes),
                minutes = sec / 60 % 60,
                seconds = sec % 60;

            return num(minutes) + ":" + num(seconds);
        }
    );

    if ($('.game-slider').position().left <= -5260) {
        finishGame()
    }


    $('.distation-info').text(distationToFinish + 'м.');
    moveHyenaInRoom();
}

//















