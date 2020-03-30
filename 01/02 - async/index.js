/* CHALLENGE 1 */

function sayHowdy() {
  console.log("Howdy");
}

function testMe() {
  setTimeout(sayHowdy, 0);
  console.log("Partnah");
}

// Output:
// First: "Partnah", then "Howdy".

// After thinking it through, uncomment the following line to check your guess!
// testMe(); // what order should these log out? Howdy or Partnah first?

/* CHALLENGE 2 */

function delayedGreet() {
  setTimeout( ()=> console.log('Welcome'), 3000);
}


// Uncomment the following line to check your work!
// delayedGreet(); // should log (after 3 seconds): welcome

/* CHALLENGE 3 */

function helloGoodbye() {
  // ADD CODE HERE
  console.log('hello');
  setTimeout(()=>console.log('good bye'), 2000);
}

helloGoodbye();

// Uncomment the following line to check your work!
// helloGoodbye(); // should log: hello // should also log (after 3 seconds): good bye

/* CHALLENGE 4 */

function brokenRecord() {
  console.log('hi again');
}

setInterval(brokenRecord, 1000);


// Uncomment the following line to check your work!
// brokenRecord(); // should log (every second): hi again

/* CHALLENGE 5 */

let startTime = 0;

function limitedRepeat() {

  if(!startTime) {
    startTime = Date.now();
  } 
 
  if(Math.floor((Date.now() - startTime )/1000) < 5) {
      console.log('hi for now');
  } else {
      clearInterval(callAgain);
  }
}  

var callAgain = setInterval(limitedRepeat, 1000);




// Uncomment the following line to check your work!
// limitedRepeat(); // should log (every second, for 5 seconds): hi for now

/* CHALLENGE 6 */

function everyXsecsForYsecs(func, interval, duration) {
  let startTime = Date.now();
  
  interval *= 1000;
  duration = (duration * 1000) + startTime;
  
  let callAgain = setInterval( () => {
    if(Date.now() > duration) {
        clearInterval(callAgain);
    } else {
        func();
    }
 }, interval);
}

// Uncomment the following lines to check your work!
function theEnd() {
  console.log('This is the end!');
}
everyXsecsForYsecs(theEnd, 2, 10); // should invoke theEnd function every 2 seconds, for 20 seconds): This is the end!




