$(() => {

  const $timer = $('#timer');
  const $button = $('button');
  const $cells = $('.cell');
  let score = 0;

//timer

  var timer = 30;

  $button.on('click', startTimer);




  function startTimer() {
    //resetting the score to zero
    score = 0;
    $('#scoredisplay').text(score);
    //resetting the timer to 30
    timer = 30;
    $('#scoredisplay').text(score);
    // update the HTML to reflect these changes
    $('button', this).text('Restart');

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
        timer = 30;
      }
    }, 1000);
  }


//picks random cells to change

  function RandomMoleGenerator () {
    const mole = Math.floor(Math.random()*$('.cell').length);
    $cells.eq(mole).addClass('mole');
    setTimeout(function() {
      $cells.eq(mole).removeClass('mole');
    },1000);
  }




});
