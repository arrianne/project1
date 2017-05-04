$(() => {

  riddlersRevenge.setup();

});

var riddlersRevenge = riddlersRevenge || {};




riddlersRevenge.scrollToGame = function scrollToGame(e) {

  e.preventDefault();

  //setting the speed for each difficulty level
  riddlersRevenge.level = $(e.target).attr('id');

  switch(riddlersRevenge.level) {
    case 'easy':
      riddlersRevenge.speed = 2000;
      break;
    case 'medium':
      riddlersRevenge.speed = 1400;
      break;
    case 'hard':
      riddlersRevenge.speed = 1000;
      break;
    default:
      riddlersRevenge.speed = Math.floor(Math.random() * (2000 - 400)) + 400;
  }

  riddlersRevenge.$laugh[0].play();
  this.$button.text('Start Game');

  const target = $(e.target).attr('href');
  const $target = $(target);

  $('html, body').stop().animate({
    'scrollTop': $target.offset().top
  }, 1500, 'swing', function () {
    window.location.hash = target;
  });
};

//clicking the riddler and bomb and adding or taking away points


riddlersRevenge.hitCell = function hitCell(e) {
  const hit = $(e.target);
  console.log(e.target);
  if (hit.hasClass('mole')){
    this.score++;
    riddlersRevenge.$punch[0].play();
  } else if (hit.hasClass('bomb')){
    this.score--;
    riddlersRevenge.$explosion[0].play();
  }

  $('#scoredisplay').text('score: ' + riddlersRevenge.score);

  if (hit.hasClass('mole') || hit.hasClass('bomb')) {
    clearTimeout(riddlersRevenge.bombOrMoleTimer);
    hit.removeClass('mole bomb');
    hit.addClass('bat');
    setTimeout(function(){
      hit.removeClass('bat');
    }, 300);
  }

};

//starting the timer and displaying the score

riddlersRevenge.startTimer = function startTimer() {
  riddlersRevenge.$tick[0].play();
  //resetting the score to zero
  this.score = 0;
  $('#scoredisplay').text('score: ' + this.score);
  //resetting the timer to 30
  this.timer = 20;
  //hiding the end message
  $('#scoredisplay').show();
  $('.cell').show();
  this.$difficultyButton.hide();
  this.$button.hide();
  $('.batlogo').hide();
  $('.finalScoreDisplay').text('score: ' + this.score).hide();

  riddlersRevenge.timerId = setInterval(() => {
    this.randomGenerator();
    this.timer--;
    this.$timer.text(this.timer);
    if(this.timer === 0) this.endGame();
  }, this.speed);

};

//ending the game, clearing the timer and displaying the final score

riddlersRevenge.endGame = function endGame() {

  clearInterval(this.timerId);

  riddlersRevenge.$overTheTop[0].play();
  this.$button.text('Replay');
  this.$button.show();
  this.$difficultyButton.show();
  this.timer = 20;
  $( '.cell').hide();
  $( '#scoredisplay').hide();
  $('.finalScoreDisplay').text('score: ' + this.score).show();
  $('.batlogo').show();
};



//picks random cells to change

riddlersRevenge.randomGenerator = function randomGenerator () {
  //this chooses random cell to generate mole or bomb

  const cell = Math.floor(Math.random()*$('.cell').length);

  //this chooses to show a bomb 20% of the time and mole(riddler) 80% of the time
  const bombOrMole = Math.random() < 0.2 ? 'bomb' : 'mole';
  console.log(bombOrMole);

  this.$cells.eq(cell).addClass(bombOrMole);
  riddlersRevenge.bombOrMoleTimer = setTimeout(() => {
    this.$cells.eq(cell).removeClass('bomb mole');
  },this.speed);

};

riddlersRevenge.setup = function setup(){
  this.speed = 2000;
  this.score = 0;
  this.timer = 20;
  this.timerId = null;
  this.text = $('.typewriter').text();
  this.length = this.text.length;
  this.timeOut;
  this.character = 0;
  this.bombOrMole = null;
  this.bombOrMoleTimer = null;

  this.$timer = $('#timer');
  this.$button = $('.startButton');
  this.$difficultyButton = $('.difficultyButton');
  this.$cells = $('.cell');
  riddlersRevenge.text = $('.typewriter').text();
  this.$laugh = $('#laugh');
  this.$punch = $('#punch');
  this.$explosion = $('#explosion');
  this.$tick = $('#tick');
  this.$overTheTop = $('#overTheTop');

  $('.finalScoreDisplay').text('score: ' + this.score).hide();
  $('.batlogo').hide();

  $('.cell').click(riddlersRevenge.hitCell.bind(this));
  //button only to be pressed once until the time runs out
  $('a[href^="#"]').on('click', riddlersRevenge.scrollToGame.bind(this));

  this.$button.on('click', riddlersRevenge.startTimer.bind(this));


  //slows down the anchor tag

  (function typeWriter() {
    this.timeOut = setTimeout(() => {
      riddlersRevenge.character++;
      const type = riddlersRevenge.text.substring(0, riddlersRevenge.character);
      $('.typewriter').text(type);
      typeWriter();

      if (riddlersRevenge.character === length) {
        clearTimeout(riddlersRevenge.timeOut);
      }

    }, 80);

  }());

};





//create end game function which fills ul with bat logo and score?
