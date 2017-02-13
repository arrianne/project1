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

    }, 200);
  }());
//End of intro text


  $easy.on('click', () => {
    speed = 2000;
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
        if (!$(e.target).hasClass('mole')){
          return;
        }
//Adding 1 to the players score everytime the mole class is clicked
        score++;
        console.log(score);
        $('#scoredisplay').text(score);
        $(e.target).removeClass('mole');

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

    //hiding the start button so it can't be pressed during the game. I feel like this can be done in a neater way hmmm.
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









// if the button with the class of easy is clicked then change the mole speed to 1000
// if the medium button with the class of medium is clicked then change the mole speed to 800
// if the hard button with the class of hard is clicked then change the mole speed to 600





});
//make speed a variable and put it into a function for selected difficulties chosen from intro screen.

//create end game function which fills ul with bat logo and score?
