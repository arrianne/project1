#Riddler's Revenge

Everyones favourite quirky villain is back in this 'whack-a-mole' style game. There are 4 levels for the player to choose from; easy, medium, hard and delddir (riddled spelt backwards, just for added weirdness).

###Rules

1. Choose which level you'd like to start with.

2. Press the 'start game' button and wait for the Riddlers face to appear.

3. Try and click on his face as many times as you can to gain a point.

4. Avoid clicking on any bombs or you will minus a point.

5. Try to build up as many points as you can before the time runs out!

###Approach / How it works

As the player selects 'start game' this will trigger the start of a 20 second timer that will begin to count down to 0. As this starts, a number is randomly generated to choose which cell either the riddler or bomb will appear in. The speed in which this will happen is dependant on the level the player selects.

Once a click on the riddler has been detected, 1 point will be added to the score and 1 point will be taken away for every time the player clicks a bomb. The score will be updated throughout the game and presented to you once the timer runs out.

###The build

1. HTML 5, CSS and jQuery were used to create this game.

2. Animation was created using the Animate.css stylesheet.

3. The font 'joystix', by typodermic fonts has been used to style the game.

###Problems & Challenges


Once I had one initial image popping up that I wanted the player to hit, I struggled to decide upon the neatest way of adding one which the player must avoid.
This involved two random number generators combined; one to generate which one would appear and one to decide *where* they should appear.

