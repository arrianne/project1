$(() => {

  const $timer = $('#timer');
  const $button = $('button');
  const $cells = $('.cell');
  let score =0;




  //timer



  // var userScore = 0;
  var timer = 30;
  // let timerId = setInterval;

  $button.on('click', startTimer);


  function startTimer() {

    const timerId = setInterval(() => {
      RandomMoleGenerator();
      //removing the mole class when clicked
      $('.cell').click(function(e) {
        if (!$(e.target).hasClass('mole')){
          return;
        }

        score++;
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









//if cell is clicked when it is a specific colour, reset it back to blank and add 1 point to players score.

});
