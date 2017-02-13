$(() => {

  const $timer = $('#timer');
  const $button = $('button');
  const $cells = $('.cell');
  let score = 0;






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
      }
    }, 1000);

    //hiding the start button so it can't be pressed during the game. I feel like this can be done in a neater way hmmm.
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
    },1000);
  }

//create end game function which fills ul with bat logo and score?


});
//make speed a variable and put it into a function for selected difficulties chosen from intro screen.

// var speed =
