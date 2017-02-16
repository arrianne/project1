$(() => {

  riddlersRevenge.setup();

});

var riddlersRevenge = riddlersRevenge || {};

//Making intro text appear gradually
riddlersRevenge.typewriter = function typeWriter() {
  const timeOut = setTimeout(function() {
    this.character++;
    const type = this.text.substring(0, this.character);
    $('.typewriter').text(type);
    typeWriter();

    if (this.character === this.length) {
      clearTimeout(timeOut);
    }

  }, 113);

};

riddlersRevenge.scrollToGame = function scrollToGame(e) {

  $('.finalScoreDisplay').text('score: ' + this.score).hide();
  $('.batlogo').hide();

  e.preventDefault();

  riddlersRevenge.level = $(e.target).attr('id');

  //setting the speed for each difficulty level
  switch(riddlersRevenge.level) {
    case 'easy':
      riddlersRevenge.speed = 2000;
      break;
    case 'medium':
      riddlersRevenge.speed = 900;
      break;
    case 'hard':
      riddlersRevenge.speed = 400;
      break;
    default:
      riddlersRevenge.speed = Math.floor(Math.random() * (2000 - 400)) + 400;
  }

  riddlersRevenge.$riddlerSound[0].play();
  this.$button.text('Start Game');

  const target = $(e.target).attr('href');
  const $target = $(target);

  $('html, body').stop().animate({
    'scrollTop': $target.offset().top
  }, 1500, 'swing', function () {
    window.location.hash = target;
  });
};


riddlersRevenge.hitCell = function hitCell(e) {
  const hit = $(e.target);
  console.log(e.target);
  if (hit.hasClass('mole')){
    this.score++;
  } else if (hit.hasClass('bomb')){
    this.score--;
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

riddlersRevenge.startTimer = function startTimer() {
  //resetting the score to zero
  this.score = 0;
  $('#scoredisplay').text('score: ' + this.score);
  //resetting the timer to 30
  this.timer = 30;
  //hiding the end message
  $('#scoredisplay').show();
  $('.cell').show();
  this.$difficultyButton.hide();
  this.$button.hide();
  $('.batlogo').hide();

  riddlersRevenge.timerId = setInterval(() => {
    this.randomGenerator();
    this.timer--;
    this.$timer.text(this.timer);
    if(this.timer === 0) this.endGame();
  }, this.speed);

};

riddlersRevenge.endGame = function endGame() {
  clearInterval(this.timerId);
  this.$button.text('Replay');
  this.$button.show();
  this.$difficultyButton.show();
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
  this.timer = 30;
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
  this.$riddlerSound = $('#riddlerSound');

  $('.cell').click(riddlersRevenge.hitCell.bind(this));
  //button only to be pressed once until the time runs out
  $('a[href^="#"]').on('click', riddlersRevenge.scrollToGame.bind(this));

  this.$button.on('click', riddlersRevenge.startTimer.bind(this));


};





//create end game function which fills ul with bat logo and score?
