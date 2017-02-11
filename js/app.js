$(() => {

  const $timer = $('#timer');
  const $button = $('button');
  const $li = $('li');


  // $('li').on('click', function(event){
  //   console.log('clicked');
  // });



  //timer



  // var userScore = 0;
  var timer = 30;
  let timerId = setInterval;

  $button.on('click', startTimer);


  function startTimer() {
    RandomMoleGenerator();
    const timerId = setInterval(() => {
      timer--;
      $timer.text(timer);
      console.log(timer);

      if(timer === 0) {
        clearInterval(timerId);
        timer = 30;
      }
    }, 1000);
  }



  function RandomMoleGenerator () {

    const mole = Math.floor(Math.random()*$('div').length);
    $('.cell').eq(mole).addClass('mole');
  }



//if cell is clicked when it is a specific colour, reset it back to blank and add 1 point to players score.

});
