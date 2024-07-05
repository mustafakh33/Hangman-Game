// Letters
const letters ="abcdefghijklmnopqrstuvwxyz"

// Get Array from letters 
let lettersArray = Array.from(letters)

// Select letters container
let lettersContainer = document.querySelector('.letters');

// Generate  Letters
lettersArray.forEach(letter => {

    // create span 
    let span = document.createElement("span");

    // create letter text node
    let theLetter = document.createTextNode(letter);

    // append the letter to span 
    span.appendChild(theLetter);


    // add class on span
    span.className = 'letter-box';

    // append span to the letters container 
    lettersContainer.appendChild(span);
})


// object of words + categories
const words = {
    programming: ["php", "javascript", "go", "scala", "java","mysql","python","fortran","Erlang","Haskell"],
    movies: ["The Godfather", "The Dark Knight"," Angry Men"," Schindler's List"," Forrest Gump","Inception"," The Matrix"],
    people: ["Johnny Depp","Leonardo DiCaprio","Charles Chaplin","Morgan Freeman","Will Smith","Emma Watson","Jim Carrey"],
    countries: ["Angola","Palestine","Syria","Saudi Arabia","Egypt","Qatar","Tunisia"],
}

// get random property 

let allKeys = Object.keys(words)

// random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// category
let randomPropName = allKeys[randomPropNumber];

// category words
let randomPropValue = words[randomPropName];

// random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// the chosen word
let randomValueName = randomPropValue[randomValueNumber];


// set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName ;

// select letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");

// convert chosen word to array 
let lettersAndSpace = Array.from(randomValueName);

// create spans depened on word 
lettersAndSpace.forEach(letter => {

    // create empty span 
    let emptySpan = document.createElement("span");

    // if letter is space 
    if(letter === ' '){

        // add class to the span
        emptySpan.className = 'with-space'

    }

    // append span to the letters guess container
    lettersGuessContainer.appendChild(emptySpan)

});
// select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong attempts
let worngAttempts = 0;
// set success attempts
let successAttempts = 0;

// select the draw element
let theDraw = document.querySelector(".hangman-draw");

//  handle clicking on letters
document.addEventListener("click",(e) => {
    // set the chose status
    let theStatus = false;


    if(e.target.className === 'letter-box'){

        e.target.classList.add('clicked');

        // the chosen word 
        let theChosenWord = Array.from(randomValueName.toLowerCase());

        // get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        // the chosen word
        theChosenWord.forEach((wordLetter , wordIndex)=> {
            // if the clicked letter equal to one the chosen word letter
            if(wordLetter === theClickedLetter){

                // set status to correct
                theStatus = true;
                successAttempts++;
               
                    // loop on all guess spans
                    guessSpans.forEach((span, spanIndex)=>{

                        if (wordIndex === spanIndex) {
                            span.innerHTML = theClickedLetter;
                        }

                    })
            }
         })
         
        

         // outside loop

         // if letter is success 
         if (successAttempts === theChosenWord.length) {
                success()
                lettersContainer.classList.add("success");
            document.getElementById("success").play();

        }
         
         // if letter is wrong
         if(theStatus !== true){

            // increase the wrong attempts
            worngAttempts++;

            // add class wrong on the draw element
            theDraw.classList.add(`wrong-${worngAttempts}`)

            // play fail sound
            document.getElementById("fail").play();

            if(worngAttempts === 8){
                endGame();
                lettersContainer.classList.add("finished");
            }

         } else{
            // play success sound
            document.getElementById("success").play();
           
         }

    }
})

// end game function
function endGame (){

    // create Popup div
    let div = document.createElement("div");

    // create text 
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueName}`);

    // append text to div
    div.appendChild(divText);

    // add class on div 
    div.className = 'popup popup-wrong';

    // append to the body 
    document.body.appendChild(div);
    // click on body removeChild and remove class name, refresh window 
    document.body.addEventListener("click",()=>{
        document.body.removeChild(div);
        lettersContainer.classList.remove("finished");
        window.location.reload();
        });
}
function success(){

    // create Popup div
    let div = document.createElement("div");

    // create text 
    let divText = document.createTextNode('Congratulations on your incredible success');

    // append text to div
    div.appendChild(divText);

    // add class on div 
    div.className = 'popup popup-success';

    // append to the body 
    document.body.appendChild(div);

     // click on body removeChild and remove class name, refresh window 
    document.body.addEventListener("click",()=>{
        document.body.removeChild(div);
        lettersContainer.classList.remove("success");
        window.location.reload();
        });
    
}