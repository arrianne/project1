$(() => {

  const $timer = $('#timer');
  const $button = $('.startButton');
  const $difficultyButton = $('.difficultyButton');
  const $cells = $('.cell');
  let speed = 2000;
  let score = 0;
  var $riddlerSound = $('#riddlerSound');
  var timer = 30;
  let timerId = null;

  //typewriter text
  var text = $('.typewriter').text();
  var length = text.length;
  var timeOut;
  var character = 0;

  let bombOrMole = null;
  let bombOrMoleTimer = null;

  //Making intro text appear gradually
  (function typeWriter() {
    timeOut = setTimeout(function() {
      character++;
      var type = text.substring(0, character);
      $('.typewriter').text(type);
      typeWriter();

      if (character === length) {
        clearTimeout(timeOut);
      }

    }, 113);

  }());

  function scrollToGame(e) {

    $('.finalScoreDisplay').text('score: ' + score).hide();
    $('.batlogo').hide();

    e.preventDefault();

    const level = $(e.target).attr('id');

    //setting the speed for each difficulty level
    switch(level) {
      case 'easy':
        speed = 2000;
        break;
      case 'medium':
        speed = 900;
        break;
      case 'hard':
        speed = 400;
        break;
      default:
        speed = Math.floor(Math.random() * (2000 - 400)) + 400;
    }

    $riddlerSound[0].play();
    $button.text('Start Game');

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 1500, 'swing', function () {
      window.location.hash = target;
    });
  }

  $('a[href^="#"]').on('click', scrollToGame);

  $button.on('click', startTimer);

  function hitCell(e) {
    const hit = $(e.target);
    console.log(e.target);
    if (hit.hasClass('mole')){
      score++;
    } else if (hit.hasClass('bomb')){
      score--;
    }

    $('#scoredisplay').text('score: ' + score);

    if(hit.hasClass('mole') || hit.hasClass('bomb')) {
      clearTimeout(bombOrMoleTimer);
      hit.removeClass('mole bomb');
      hit.addClass('bat');
      setTimeout(function(){
        hit.removeClass('bat');
      }, 300);
    }

  }

  $('.cell').click(hitCell);
  //button only to be pressed once until the time runs out

  function startTimer() {
    //resetting the score to zero
    score = 0;
    $('#scoredisplay').text('score: ' + score);
    //resetting the timer to 30
    timer = 30;
    //hiding the end message
    $('#scoredisplay').show();
    $('.cell').show();

    timerId = setInterval(() => {
      randomGenerator();
      timer--;
      $timer.text(timer);
      if(timer === 0) endGame();
    }, speed);

  }

  function endGame() {
    clearInterval(timerId);
    $button.text('Replay');
    $button.show();
    $difficultyButton.show();
    $( '.cell').hide();
    $( '#scoredisplay').hide();
    $('.finalScoreDisplay').text('score: ' + score).show();
    $('.batlogo').show();
  }



  //picks random cells to change

  function randomGenerator () {
    //this chooses random cell to generate mole or bomb

    const cell = Math.floor(Math.random()*$('.cell').length);

    //this chooses to show a bomb 20% of the time and mole(riddler) 80% of the time
    bombOrMole = Math.random() < 0.2 ? 'bomb' : 'mole';
    console.log(bombOrMole);

    $cells.eq(cell).addClass(bombOrMole);
    bombOrMoleTimer = setTimeout(() => {
      $cells.eq(cell).removeClass('bomb mole');
    },speed);

  }



});



//create end game function which fills ul with bat logo and score?
