$(() => {

  const $timer = $('#timer');
  const $button = $('.startButton');
  const $difficultyButton = $('.difficultyButton');
  const $cells = $('.cell');
  let speed = 1000;
  let score = 0;
  const $easy = $('#easy');
  const $medium = $('#medium');
  const $hard = $('#hard');
  const $riddled = $('#riddled');
  // const $riddler = $('riddler');




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

    }, 100);
  }());
//End of intro text

//setting the speed for each difficulty level

  $easy.on('click', () => {
    speed = 2000;
    // $riddler[0].play();
    $button.text('Start Game');

  });
  $medium.on('click', () => {
    speed = 900;
    $button.text('Start Game');
  });
  $hard.on('click', () => {
    speed = 400;
    $button.text('Start Game');
  });
  $riddled.on('click', () => {
    speed = Math.floor(Math.random() * (2000 - 400)) + 400;
    $button.text('Start Game');
  });

//slowing down href


  $(document).ready(function(){
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
  });


//timer

  var timer = 5;



  $button.on('click', startTimer);

  //button only to be pressed once until the time runs out



  function startTimer() {
    //resetting the score to zero
    score = 0;
    $('#scoredisplay').text(score);
    //resetting the timer to 30
    timer = 5;
    $('#scoredisplay').text(score);





    const timerId = setInterval(() => {
      RandomMoleGenerator();
      //removing the mole class when clicked
      $('.cell').click(function(e) {
        const hit = $(e.target);
        if (!hit.hasClass('mole')){
          return;
        }
//Adding 1 to the players score everytime the mole class is clicked
        score++;
        console.log(score);
        $('#scoredisplay').text(score);

//possibly adding another thing for player to click that will take away points

  //       RandomBombGenerator();
  //       //removing the mole class when clicked
  //       $('.cell').click(function(e) {
  //         const hit = $(e.target);
  //         if (!hit.hasClass('bomb')){
  //           return;
  //         }
  // //Adding 1 to the players score everytime the mole class is clicked
  //         score--;
  //         console.log(score);
  //         $('#scoredisplay').text(score);



//bringing up the bat image when you hit mole
        function showBat() {
          setTimeout(function(){
            hit.removeClass('bat');
          }, 300);
        }

        hit.removeClass('mole').addClass('bat');
        showBat();



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
    },timer*5000);
  }


//picks random cells to change

  function RandomMoleGenerator () {
    const mole = Math.floor(Math.random()*$('.cell').length);
    $cells.eq(mole).addClass('mole');
    setTimeout(function() {
      $cells.eq(mole).removeClass('mole');
    },speed);
  }


  // function RandomBombGenerator () {
  //   const mole = Math.floor(Math.random()*$('.cell').length);
  //   $cells.eq(bomb).addClass('bomb');
  //   setTimeout(function() {
  //     $cells.eq(bomb).removeClass('bomb');
  //   },speed);
  // }
  //

});


//create end game function which fills ul with bat logo and score?
