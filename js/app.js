$(() => {

  const $timer = $('#timer');
  const $button = $('.startButton');
  const $difficultyButton = $('.difficultyButton');
  const $cells = $('.cell');
  let speed = 2000;
  let score = 0;
  const $easy = $('#easy');
  const $medium = $('#medium');
  const $hard = $('#hard');
  const $riddled = $('#riddled');
  var $riddlerSound = $('#riddlerSound');
  // var $riddleMe = $('#riddleMe');
  let bombOrMole = null;
  let bombOrMoleTimer = null;





//Making intro text appear gradually
  var text = $('.typewriter').text();

  var length = text.length;
  var timeOut;
  var character = 0;


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



//End of intro text

//setting the speed for each difficulty level

  $easy.on('click', () => {
    speed = 2000;
    $riddlerSound[0].play();
    $button.text('Start Game');

  });
  $medium.on('click', () => {
    speed = 900;
    $riddlerSound[0].play();
    $button.text('Start Game');
  });
  $hard.on('click', () => {
    speed = 400;
    $riddlerSound[0].play();
    $button.text('Start Game');
  });
  $riddled.on('click', () => {
    speed = Math.floor(Math.random() * (2000 - 400)) + 400;
    $riddlerSound[0].play();
    $button.text('Start Game');
  });

//slowing down href


  // $(document).ready(function(){
  $('a[href^="#"]').on('click',function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 1500, 'swing', function () {
      window.location.hash = target;
    });
  });
  // });


//timer

  var timer = 30;



  $button.on('click', startTimer);

  //button only to be pressed once until the time runs out

  function startTimer() {
    //resetting the score to zero
    score = 0;
    $('#scoredisplay').text('score: ' + score);
    //resetting the timer to 30
    timer = 30;
    const timerId = setInterval(() => {
      RandomGenerator();
      //removing the mole class when clicked
      $('.cell').click(function(e) {
        const hit = $(e.target);
        console.log(e.target);
        if (hit.hasClass('mole')){
          // return;

          //Adding 1 to the players score everytime the mole class is clicked
          score++;
          console.log(score);
          $('#scoredisplay').text('score: ' + score);
        } else if (hit.hasClass('bomb')){
          // return;
          score--;
          console.log(score);
          $('#scoredisplay').text(score);
        }

        if(hit.hasClass('mole') || hit.hasClass('bomb')) {
          clearTimeout(bombOrMoleTimer);
          hit.removeClass(bombOrMole);
          hit.addClass('bat');
          setTimeout(function(){
            hit.removeClass('bat');
          }, 300);
        }

      });
      timer--;
      $timer.text(timer);
      console.log(timer);

      if(timer === 0) {
        clearInterval(timerId);
        // timer = 5;
        // update the button text:
        $button.text('Replay');
        $button.show();
        $difficultyButton.show();

      }
    }, speed);

    //hiding the start button so it can't be pressed during the game.
    $difficultyButton.hide();
    $button.hide();
    setTimeout(()=>{
      $button.show();
    },timer*30000);
  }


//picks random cells to change

  function RandomGenerator () {
    //this chooses random cell to generate mole or bomb

    const cell = Math.floor(Math.random()*$('.cell').length);

    //this chooses to show a bomb 20% of the time and mole(riddler) 80% of the time
    bombOrMole = Math.random() < 0.2 ? 'bomb' : 'mole';
    console.log(bombOrMole);

    $cells.eq(cell).addClass(bombOrMole);
    bombOrMoleTimer = setTimeout(() => {
      $cells.eq(cell).removeClass(bombOrMole);
    },speed);

  }



});



//create end game function which fills ul with bat logo and score?
