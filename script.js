import {verbs, timeOfDay, irSentences, saberSentences, decirSentences, tenerSentences, clothesSentences, freeTimeSentences, foodAndDrinkSentences, foodDishes, interestsAndHobbiesSentences, aboutMeSentences, varnamoSentences, questionSentences, weatherNatureSentences, schoolSentences} from './glosses.js'
import {getRandomGlossIndex} from './glossFunctions.js'

// Get function buttons
let glossSubmitButton = document.getElementById('submit-btn')
let newGlossButton = document.getElementById('new-gloss')
let activeListText = document.getElementById('active-list')
let startButton = document.getElementById('start')

// Get glosslist selection buttons
let schoolButton = document.getElementById('school-sentences')
let climaButton = document.getElementById('clima-sentences')
let questionButton = document.getElementById('questions-sentences')
let varnamoButton = document.getElementById('varnamo-sentences')
let meButton = document.getElementById('me-sentences')
let tiempoLibreButton = document.getElementById('tiempo-libre')
let comidaButton = document.getElementById('comida')
let frasesDeComidaButton = document.getElementById('frases-de-comida')
let verbsButton = document.getElementById('verbs')
let presentTenseButton = document.getElementById('present')
let timeButton = document.getElementById('time')
let irButton = document.getElementById('ir-sentences')
let saberButton = document.getElementById('saber-sentences')
let decirButton = document.getElementById('decir-sentences')
let tenerButton = document.getElementById('tener-sentences')
let clothesSentencesButton = document.getElementById('ropa-sentences')
let freeTimeSentencesButton = document.getElementById('tiempo-libre-sentences')

// Get text and feedback
let glossInputSpanish = document.getElementById('user-input')
let answerFeedback = document.getElementById('feedback')
let glossTextSwedish = document.getElementById('gloss-swedish')
let scoreFeedback = document.getElementById('score')

// Global variables
let currentGlossList = ''
let currentGloss = ''
let glossIndex = ''
let currentListLength = ''

addEventToButton(schoolButton, schoolSentences);
addEventToButton(climaButton, weatherNatureSentences);
addEventToButton(questionButton, questionSentences);
addEventToButton(varnamoButton, varnamoSentences);
addEventToButton(meButton, aboutMeSentences);
addEventToButton(tiempoLibreButton, interestsAndHobbiesSentences);
addEventToButton(comidaButton, foodDishes);
addEventToButton(frasesDeComidaButton, foodAndDrinkSentences);
addEventToButton(verbsButton, verbs);
addEventToButton(timeButton, timeOfDay);
addEventToButton(irButton, irSentences);
addEventToButton(saberButton, saberSentences);
addEventToButton(decirButton, decirSentences);
addEventToButton(tenerButton, tenerSentences);
addEventToButton(clothesSentencesButton, clothesSentences);
addEventToButton(freeTimeSentencesButton, freeTimeSentences);

startButton.addEventListener('click', function() {
    getRandomGloss(currentGlossList)
})

glossSubmitButton.addEventListener('click', function() {
    handleSubmission(currentGlossList);
})

glossInputSpanish.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleSubmission(currentGlossList);
    }
})

newGlossButton.addEventListener('click', function() {
    answerFeedback.innerText = ''
    glossInputSpanish.value = ''
    getRandomGloss(currentGlossList)
    
})

glossInputSpanish.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        answerFeedback.innerText = ''
        glossInputSpanish.value = ''
        getRandomGloss(currentGlossList)
    }
})

function addEventToButton(listButton, currentList) {
    listButton.addEventListener('click', function() {
        clearAll()
        currentListLength = currentList.length
        scoreFeedback.innerText = '0/' +currentListLength
        activeListText.innerText = listButton.innerText
        console.log(activeListText.innerText)
        setGlossList(currentList)
    })
}

function clearAll() {
    answerFeedback.innerText = ''
    glossInputSpanish.value = ''
    glossTextSwedish.innerText = ''
}

function setGlossList(selectedGlossList){
    currentGlossList = selectedGlossList
}

function getRandomGloss(currentGlossList){
    glossIndex = getRandomGlossIndex(currentGlossList.length)
    glossIndex = Number(glossIndex)
    currentGloss = currentGlossList[glossIndex]
    glossTextSwedish.innerText = currentGloss.swedish
}     
    

function handleSubmission(currentGlossList) { 
    let userInput = glossInputSpanish.value.toLowerCase().trim()
    .replace(/^¿/, '')    // Tar bort ¿ i början
    .replace(/[?.]+$/, ''); // Tar bort punkter i slutet;
    console.log(userInput)

    // Om `currentGloss.spanish` är en sträng, gör om den till en array med ett element
    let spanishAnswers = Array.isArray(currentGloss.spanish)
        ? currentGloss.spanish 
        : [currentGloss.spanish];

    let cleanedSpanishAnswers = spanishAnswers.map(translation => 
        translation.toLowerCase().trim()
        .replace(/^¿/, '')    // Tar bort ¿ i början
        .replace(/[?.]+$/, '')  // Tar bort punkter i slutet
    );
    console.log(cleanedSpanishAnswers)
    
    // Kontrollera om userInput matchar någon av översättningarna
    if (cleanedSpanishAnswers.some(translation => translation === userInput)) {
        answerFeedback.innerText = userInput + ' är rätt!';
        
        // Ta bort den aktuella glosan från listan
        currentGlossList.splice(glossIndex, 1);

        // Uppdatera poängen
        scoreFeedback.innerText = (currentListLength - currentGlossList.length) + '/' + currentListLength;
    } else {
        // Om fel svar, visa alla korrekta svar
        answerFeedback.innerText = 'Fel, rätt svar är:\n' + spanishAnswers.join('\neller\n');
    }
}


// function handleSubmission(currentGlossList) { 
//     let userInput = glossInputSpanish.value
//     if (userInput.toLowerCase() === currentGloss.spanish.toLowerCase()) {
//     answerFeedback.innerText = currentGloss.spanish.toLowerCase() +' är rätt!'
//     // console.log('Before splice:', currentGlossList, glossIndex);
//     currentGlossList.splice(glossIndex, 1)
//     // console.log('After splice:', currentGlossList);
//     scoreFeedback.innerText = (currentListLength-currentGlossList.length) +'/' +currentListLength
//     } else {
//     answerFeedback.innerText = 'Fel, rätt svar är: ' +currentGloss.spanish.toLowerCase()
// }
// }


