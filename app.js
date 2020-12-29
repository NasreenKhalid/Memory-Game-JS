const container = document.querySelector('.container');
const deck = document.querySelector('.deck');
const modal = document.querySelector('.modal');
const reset = document.querySelector('.reset-btn');
const playAgain = document.querySelector('.play-again-btn');
const movesCount = document.querySelector('.moves-counter');
const stars = document.querySelectorAll('.star');
const timeCounter = document.querySelector('.timer');



// Array for deck of Cards
const deckCards = ["Agility.png", "Agility.png", "Boat.png", "Boat.png", "Citizenship.png", "Citizenship.png", "Hack.png", "Hack.png", "Nerd-Rage.png", "Nerd-Rage.png", "Nuka-Cola.png", "Nuka-Cola.png", "Robotics.png", "Robotics.png", "Shock.png", "Shock.png"];

// For opened cards
let opened = [];
// For matched cards
let matched = [];
// Moves Counter 
let moves = 0;
// Stars Counter
let starCount = 3;
let time;
let minutes = 0,seconds = 0;
let timeStart = false;

console.log(stars)

// shuffle function for array

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
  }

  console.log(shuffle(deckCards))

function startGame(){
    const shuffleDeck = shuffle(deckCards);
    for(let i=0;i<shuffleDeck.length;i++){
        const liTag = document.createElement('li');
        liTag.classList.add('card');
        const addImage = document.createElement('img');
        liTag.appendChild(addImage);
        addImage.setAttribute("src", `./img/${shuffleDeck[i]}`);
        addImage.setAttribute("alt", "image of vault boy");
        deck.appendChild(liTag)
    }
}

startGame();

function removeCard(){
    while(deck.hasChildNodes){
        deck.removeChild(deck.firstChild)
    }
}

function timer() {
    // Update the count every 1 second
    time = setInterval(function() {
      seconds++;
        if (seconds === 60) {
          minutes++;
          seconds = 0;
        }
      // Update the timer in HTML with the time it takes the user to play the game
      timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: " + minutes + " Mins " + seconds + " Secs" ;
    }, 1000);
  }

function stopTime(){
    clearInterval(time)
}

function resetEverything(){
    stopTime();
    timeStart= false;
    minutes,seconds = 0;
    timeCounter.innerHTML = `<i class="fa fa-hourglass-start"></i> Timer: 00:00</span>`
    starCount=3;
    stars[1].firstElementChild.classList.add("fa-star");
    stars[2].firstElementChild.classList.add("fa-star");

    moves=0;
    movesCount.innerHTML = 0;
    matched = [], opened = [];
    removeCard();
    startGame();
}

function movesCounter(){
    movesCount.innerHTML ++;
    moves++;
}

function starRating(){
    if(moves === 14){
        stars[2].firstElementChild.classList.remove('fa-star');
        starCount--;
    }
    if(moves === 18){
        stars[1].firstElementChild.classList.remove('fa-star');
        starCount--;
    }
}

function compareTwo(){
if(opened.length === 2) {
    // Disable any further mouse clicks on other cards
    document.body.style.pointerEvents = "none";
}

if(opened.length === 2 && opened[0].src === opened[1].src){
    match();
    console.log("its a match")
} else if (opened.length === 2 && opened[0].src !== opened[1].src){
    noMatch();
    console.log("NO match")
} 
}

function match(){
    setTimeout(function() {
        opened[0].parentElement.classList.add("match");
        opened[1].parentElement.classList.add("match");
        // Push the matched cards to the matched array
        matched.push(...opened);
        // Allow for further mouse clicks on cards
        document.body.style.pointerEvents = "auto";
        // Check to see if the game has been won with all 8 pairs
        winGame();
        // Clear the opened array
        opened = [];
      }, 600);
      // Call movesCounter to increment by one
      movesCounter();
      starRating();
}

function noMatch(){
    setTimeout(function(){
        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        // Allow further mouse clicks on cards
        document.body.style.pointerEvents = "auto";
        // Remove the cards from opened array
        opened = [];
    },4000);
    movesCounter();
    starRating();
}

function addStats(){
    const stats = document.querySelector('.modal-content');
    for(let i=0;i<=3 ;i++){
          // Create a new Paragraph
    const statsElement = document.createElement("p");
    // Add a class to the new Paragraph
    statsElement.classList.add("stats");
    // Add the new created <p> tag to the modal content
    stats.appendChild(statsElement);
  }
  // Select all p tags with the class of stats and update the content
  let p = stats.querySelectorAll("p.stats");
      // Set the new <p> to have the content of stats (time, moves and star rating)
    p[0].innerHTML = "Time to complete: " + minutes + " Minutes and " + seconds + " Seconds";
    p[1].innerHTML = "Moves Taken: " + moves;
    p[2].innerHTML = "Your Star Rating is: " + starCount + " out of 3";
  
}

function displayModal(){
    const modalClose = document.getElementsByClassName("close")[0];
  // When the game is won set modal to display block to show it
  modal.style.display= "block";

  // When the user clicks on <span> (x), close the modal
  modalClose.onclick = function() {
    modal.style.display = "none";
  };
// When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}


function winGame() {
    if (matched.length === 16) {
      stopTime();
      addStats();
      displayModal();
    }
  }

  deck.addEventListener("click", function(e) {
    if (e.target.nodeName === "LI") {
      // To console if I was clicking the correct element 
      console.log(e.target.nodeName + " Was clicked");
      if(timeStart === false){
          timeStart = true;
          timer();
      }
      flipCard();
    }

    function flipCard(){
       e.target.classList.add('flip')
       addToOpened(); 
    }

    function addToOpened(){
if(opened.length === 0 || opened.length === 1){
    opened.push(e.target.firstElementChild);
}
compareTwo()

    }

    });

    /*----------------------------------  
Restart Buttons
------------------------------------*/
/*
Event Listener to listen for a click on the reset
button, once clicked call resetEverything()
*/
reset.addEventListener('click', resetEverything);

/*
Event Listener to listen for a click on the play
again button, once clicked call resetEverything()
*/
playAgain.addEventListener('click',function() {
  modal.style.display = "none";
  resetEverything();
});



 







