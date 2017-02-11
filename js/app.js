$(() => {

  const $timer = $('.timer');
  const $button = $('button');
  const listElements = $('li');


  const chosenIndex = Math.random(listElements.length);
  listElements.eq(chosenIndex).css(backgroundColor: 'red')


//create an array of elements I'll change using their id's.

// then choose a random number up to the length of that array
//Math.rand(listElements.length)
//then change the colour of that element.






//Timer
//start at 30 seconds and count down

});
